import type { GraphConfiguration } from "react-d3-graph"
import { Graph } from "react-d3-graph"

const data = {
  nodes: [{ id: "Harry" }, { id: "Alice" }, { id: "Sally" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
}

const myConfig: Partial<GraphConfiguration<any, any>> = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
  height: 400,
  width: 400,
}

function CustomGraph() {
  const onClickNode = function (nodeId: string) {
    window.alert(`Clicked node ${nodeId}`)
  }

  const onClickLink = function (source: string, target: string) {
    window.alert(`Clicked link between ${source} and ${target}`)
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex w-full h-full justify-center items-center">
        <Graph
          id="custom-graph"
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      </div>
    </div>
  )
}

export default CustomGraph
