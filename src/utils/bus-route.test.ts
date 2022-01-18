import {
  BusStop,
  // toGraph,
  // dfs,
  // countRoutes,
  numBusesToDestination,
} from "./bus-route";

describe("test findOrder", () => {
  it.skip("can count routes", () => {
    expect(
      numBusesToDestination(
        [
          [1, 2, 7],
          [3, 6, 7],
        ],
        1,
        7
      )
    ).toBe(1);
    expect(
      numBusesToDestination(
        [
          [1, 2, 7],
          [3, 6, 7],
          [6, 8, 9, 10],
          [10, 11, 12, 13],
        ],
        2,
        13
      )
    ).toBe(4);
  });

  it.skip("negative tests", () => {
    expect(
      numBusesToDestination(
        [[22], [1, 2, 7], [3, 6, 7], [6, 8, 9, 10], [10, 11, 12, 13]],
        22,
        13
      )
    ).toBe(-1);
    expect(
      numBusesToDestination(
        [
          [1, 7],
          [3, 5],
        ],
        5,
        5
      )
    ).toBe(0);
  });

  // it('toGraph 1', () => {
  // const graph = toGraph([
  // [1, 2, 7],
  // [1, 2, 3, 6, 7, 8],
  // [3, 6, 7],
  // ]);
  // const prevs = dfs(graph, 6, 2);
  // expect([...prevs.entries()]).toEqual(expect.arrayContaining([[2, { stop: 6, route: 1 }]]));

  // const routeCount = countRoutes(prevs, 6, 2);
  // expect(routeCount).toBe(1);
  // });

  // it('toGraph 2', () => {
  // const graph = toGraph([[9], [1, 2, 7], [1, 2, 3, 6, 7, 8], [3, 6, 7]]);
  // const prevs = dfs(graph, 6, 2);
  // expect([...prevs.entries()]).toEqual(expect.arrayContaining([[2, { stop: 6, route: 2 }]]));

  // const routeCount = countRoutes(prevs, 6, 2);
  // expect(routeCount).toBe(1);
  // }, 1);

  // it('normal test', () => {
  // const graph = toGraph([
  // [1, 2, 7],
  // [3, 6, 7],
  // ]);
  // expect(graph.get(1)?.connections.length).toBe(2);
  // expect(graph.get(2)?.connections.length).toBe(2);
  // expect(graph.get(7)?.connections.length).toBe(4);
  // expect(graph.get(3)?.connections.length).toBe(2);

  // const prevs = dfs(graph, 2, 6);
  // expect([...prevs.entries()]).toEqual(
  // expect.arrayContaining([
  // [7, { stop: 2, route: 0 }],
  // [6, { stop: 7, route: 1 }],
  // ])
  // );

  // const routeCount = countRoutes(prevs, 2, 6);
  // expect(routeCount).toBe(2);
  // });

  it("busStop", () => {
    const stop1 = new BusStop(1);
    const stop2 = new BusStop(2);
    stop1.addConnection({ route: 1, stop: stop2 });
    expect(stop1.connections.length).toBe(1);
    expect(stop1.connections[0].stop.label).toBe(2);
    expect(stop2.connections.length).toBe(0);
  });
});
