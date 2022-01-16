export function numBusesToDestination(
  routes: number[][],
  source: number,
  target: number
): number {
  if (source === target) return 0;
  const stopsToRoutes = toGraph(routes);
  if (!stopsToRoutes[source] || !stopsToRoutes[target]) return 0;
  const routeConnections: number[][] = stopsToRoutes.filter(
    (routes) => routes.length > 1
  );
  const availableStartingRoutes = stopsToRoutes[source];
  const availableEndingRoutes = stopsToRoutes[target];

  return findShortestPath(
    routeConnections,
    availableStartingRoutes,
    availableEndingRoutes
  );
}

function toGraph(routes: number[][]): number[][] {
  const stopsToRoutes: number[][] = [];
  for (let routeId = 0; routeId < routes.length; routeId++) {
    for (let stopId of routes[routeId]) {
      stopsToRoutes[stopId] = stopsToRoutes[stopId] ?? [];
      stopsToRoutes[stopId].push(routeId);
    }
  }
  return stopsToRoutes;
}

function findShortestPath(
  routeConnections: number[][],
  availableStartingRoutes: number[],
  availableEndingRoutes: number[]
): number {
  let count = 1000;
  const connections: Set<number>[] = [];
  routeConnections.forEach((route) => connect(route, connections));
  console.log({ connections, availableStartingRoutes, availableEndingRoutes });
  for (let start of availableStartingRoutes) {
    for (let end of availableEndingRoutes) {
      if (start === end) return 1;
      const theCount = dfs(connections, start, end);
      if (theCount < 0) continue;
      count = Math.min(count, theCount);
    }
  }

  return count === 1000 ? -1 : count;
}

function connect(routes: number[], connections: Set<number>[]): void {
  routes.forEach((route) => {
    routes.forEach((adjacentRoute) => {
      if (!connections[route]) connections[route] = new Set<number>();
      if (route !== adjacentRoute) {
        connections[route].add(adjacentRoute);
      }
    });
  });
}

function dfs(connections: Set<number>[], start: number, end: number): number {
  const previous = traverse();
  if (previous.length === 0) return -1;
  return trace(previous, start, end);

  function trace(previous: number[], start: number, end: number): number {
    let count = 1;
    let current: number = end;
    while (current !== start && count < previous.length + 1) {
      count++;
      current = previous[current];
    }

    return current === start ? count : -1;
  }
  function traverse(): number[] {
    const previous: number[] = [];
    const visited = new Array(connections.length).fill(false);
    const queue: number[] = [start];
    while (queue.length > 0) {
      const route = queue.shift() as number;
      if (!visited[route]) {
        visited[route] = true;
        if (!connections[route]) break; // the route is isolated
        // TODO
        // for (let adjacentRoute of connections[route]) {
        // previous[adjacentRoute] = route;
        // if (adjacentRoute === end) {
        // return previous;
        // }
        // queue.push(adjacentRoute)
        // }
      }
    }
    return previous;
  }
}
