import { Line, Sphere } from "@react-three/drei"
import { Canvas, Color, ThreeEvent } from "@react-three/fiber"
import { useLayoutEffect, useRef } from "react"
import * as THREE from "three"

import { useOverviewContext } from "../context"

import { TClusterMember } from "~/types/overview"

type Coords = [x: number, y: number, z: number]
interface NodeProps {
  position?: Coords
  color?: string | number | THREE.Color
  onClick: (event: ThreeEvent<MouseEvent>) => void
}
function Node({ position = [0, 0, 0], color = 0x0000ff, onClick }: NodeProps) {
  const node = useRef<any>()

  const handlePointerEnter = () => {
    node.current.material.color = new THREE.Color(0x2e2e2e)
  }

  const handlePointerLeave = () => {
    node.current.material.color = new THREE.Color(color)
  }

  return (
    <Sphere
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      ref={node}
    >
      <meshBasicMaterial color={color} />
    </Sphere>
  )
}

interface EdgeProps {
  start: Coords
  end: Coords
  color?: string | number | THREE.Color
}
function Edge({ start, end, color = "red" }: EdgeProps) {
  return (
    <Line points={[start, end]} color={color} lineWidth={3} dashed={false} />
  )
}

interface ClusterNodesProps {
  nodes: Array<TClusterMember>
  position?: Coords
  handleNodeClick: (node: TClusterMember) => void
}
function ClusterNodes({
  nodes,
  position = [0, 0, 0],
  handleNodeClick,
}: ClusterNodesProps) {
  const graph = useRef<any>()

  const numberOfNodes = nodes.length
  const theta = (2 * Math.PI) / numberOfNodes
  const radius = 10

  const coords = Array(numberOfNodes)
    .fill(0)
    .map((_, i) => {
      const x = radius * Math.cos(i * theta)
      const y = radius * Math.sin(i * theta)
      return [x, y, 0] as Coords
    })

  const lines: Array<{ start: Coords; end: Coords }> = []
  for (let i = 1; i < coords.length; i++) {
    lines.push({ start: coords[0], end: coords[i] })
  }

  useLayoutEffect(() => {
    graph.current.rotation.z += 90
  }, [])

  const handleClick = (nodeIndex: number) => () => {
    handleNodeClick(nodes[nodeIndex])
  }

  return (
    <group position={position} ref={graph}>
      {coords.map((coord, i) => (
        <Node
          position={coord}
          key={i}
          onClick={handleClick(i)}
          color={i === 0 ? 0x00ff00 : 0x0000ff}
        />
      ))}
      {lines.map((line, i) => (
        <Edge start={line.start} end={line.end} key={i} />
      ))}
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
    </>
  )
}

function arrangeNodes(
  members: Array<TClusterMember> = [],
  leaderId: number | undefined
) {
  const arrangedArray: Array<TClusterMember> = []

  const membersWithoutLeader = members.filter((member) => {
    if (member.id === leaderId) {
      arrangedArray.push(member)
      return false
    }
    return true
  })
  arrangedArray.push(...membersWithoutLeader)

  return arrangedArray
}

function Graph() {
  const { state, setSelectedNode } = useOverviewContext()

  const arrangedNodes = arrangeNodes(
    state.dashboardData?.members,
    state.dashboardData?.leader
  )

  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <Lights />
      <ClusterNodes nodes={arrangedNodes} handleNodeClick={setSelectedNode} />
    </Canvas>
  )
}

export default Graph
