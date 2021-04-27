import { Graph } from "react-d3-graph"

const data = {
  nodes: [{ id: "Harry" }, { id: "Alice" }, { id: "Sally" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
}

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
}

function CustomGraph() {
  const onClickNode = function (nodeId: string) {
    window.alert(`Clicked node ${nodeId}`)
  }

  const onClickLink = function (source: string, target: string) {
    window.alert(`Clicked link between ${source} and ${target}`)
  }

  return (
    <Graph
      id="custom-graph"
      data={data}
      config={myConfig}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
    />
  )
}

export default CustomGraph
