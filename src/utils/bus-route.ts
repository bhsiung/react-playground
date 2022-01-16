export function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) return 0;
  const graph = toGraph(routes);
  const prevs = dfs(graph, source, target);

  return countRoutes(prevs, source, target);
}

export function countRoutes(prevs: Map<number, SimpleConnection>, source:number, target:number): number {
  let current = target;
  let routes = new Set<number>();

  while (current !== source && prevs.size > 0) {
    const prev = prevs.get(current);
    prevs.delete(current)
    if (!prev) return -1;
    current = prev.stop
    routes.add(prev.route)
  }
  return routes.size || -1;
}
export function dfs(graph: Map<number,BusStop>, start: number, end: number): Map<number, SimpleConnection> {
  const prevs = new Map<number, SimpleConnection>();
  const startNode = graph.get(start) as BusStop;
  const visited = new Map<number, boolean>();
  const queue:BusStop[] = [startNode];
  while (queue.length > 0) {
    const busStop = queue.shift() as BusStop
    if (!visited.get(busStop.label)) {
      visited.set(busStop.label, true)
      for (let connection of busStop.connections) {
        if(!prevs.has(connection.stop.label)){
          prevs.set(connection.stop.label, {
            stop: busStop.label,
            route: connection.route
          })
        }
        if (connection.stop.label === end) {
          // TODO renable this
          return prevs;
        }
        queue.push(connection.stop)
      }
    }
  }
  return prevs;
}
export function toGraph(routes: number[][]): Map<number, BusStop> {
  const stopMap = new Map<number, BusStop>();

  for (let routeId = 0; routeId < routes.length; routeId++) {
    const routeStops = routes[routeId];
    // if (route.length === 0) continue
    if (routeStops.length >= 1) {
      const routeStopNodes = routeStops.map(stopId=>peakOrCreate(stopId));
      routeStopNodes.forEach(stopNode=>{
        routeStopNodes.forEach(adjacentStopNode=>{
          if (stopNode.label !== adjacentStopNode.label){
            stopNode.addConnection(new BusConnection(routeId, adjacentStopNode))
          }
        })
      })
    }
  }

  function peakOrCreate(label: number) {
    let node = stopMap.get(label);
    if (!node) {
      node = new BusStop(label);
      stopMap.set(label, node)
    }
    return node;

  }

  return stopMap;
}

interface SimpleConnection {
  route: number;
  stop: number;
}

export class BusConnection {
  route: number;
  stop: BusStop;
  constructor(route:number, stop:BusStop) {
    this.route = route;
    this.stop = stop;
  }
}

export class BusStop {
  label: number;
  connections: BusConnection[] = [];

  constructor(label: number) {
    this.label = label;
  }

  addConnection(connection: BusConnection) {
    this.connections.push(connection);
  }
}
