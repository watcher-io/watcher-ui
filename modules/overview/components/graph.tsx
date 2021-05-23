import { Line, OrbitControls, Sphere } from "@react-three/drei"
import { Canvas, Color } from "@react-three/fiber"
import { useLayoutEffect, useRef } from "react"
import type { Color as ThreeColor } from "three"

import { useOverviewContext } from "../context"

type Coords = [x: number, y: number, z: number]
interface NodeProps {
  position?: Coords
  color?: Color
}
function Node({ position = [0, 0, 0], color = 0x0000ff }: NodeProps) {
  const node = useRef<any>()

  const handlePointerEnter = () => {
    node.current.material.color = { r: 0, g: 1, b: 0 }
  }

  const handlePointerLeave = () => {
    node.current.material.color = { r: 0, g: 0, b: 1 }
  }

  return (
    <Sphere
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      ref={node}
    >
      <meshBasicMaterial color={color} />
    </Sphere>
  )
}

interface EdgeProps {
  start: Coords
  end: Coords
  color?: string | number | ThreeColor
}
function Edge({ start, end, color = "red" }: EdgeProps) {
  return (
    <Line points={[start, end]} color={color} lineWidth={3} dashed={false} />
  )
}

interface ClusterNodesProps {
  numberOfNodes: number
  position?: Coords
}
function ClusterNodes({
  numberOfNodes,
  position = [0, 0, 0],
}: ClusterNodesProps) {
  const graph = useRef<any>()

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

  return (
    <group position={position} ref={graph}>
      {coords.map((coord, i) => (
        <Node position={coord} key={i} />
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

function Graph() {
  const { state } = useOverviewContext()
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <Lights />
      <ClusterNodes numberOfNodes={state.dashboardData?.members.length || 0} />
    </Canvas>
  )
}

export default Graph
