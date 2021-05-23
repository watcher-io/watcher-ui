import { Line, OrbitControls, Sphere } from "@react-three/drei"
import { Canvas, Color } from "@react-three/fiber"
import type { Color as ThreeColor } from "three"

import { useOverviewContext } from "../context"

type Coords = [x: number, y: number, z: number]
interface NodeProps {
  position?: Coords
  color?: Color
}
function Node({ position = [0, 0, 0], color = "hotpink" }: NodeProps) {
  return (
    <Sphere position={position}>
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

  return (
    <group position={position}>
      {coords.map((coord) => (
        <Node position={coord} />
      ))}
      {lines.map((line) => (
        <Edge start={line.start} end={line.end} />
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
