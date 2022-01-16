export class GraphNode {
  label: number;
  connections: GraphNode[] = [];

  constructor(label: number) {
    this.label = label;
  }

  addConnection(node: GraphNode) {
    this.connections.push(node);
  }
}
