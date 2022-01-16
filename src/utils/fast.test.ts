import {
  isAvailable,
  findAvailableTimes,
  p1Meetings,
  schedules1,
  schedules2,
  schedules3,
} from "./fast";

test("findAvailableTimes works", () => {
  expect(findAvailableTimes([p1Meetings])).toEqual([
    [0, 845],
    [900, 1230],
    [1500, 2400],
  ]);
  expect(findAvailableTimes(schedules1)).toEqual([
    [915, 930],
    [1200, 1230],
    [1500, 1515],
    [1545, 1600],
  ]);
  expect(findAvailableTimes(schedules2)).toEqual([
    [0, 845],
    [915, 1230],
    [1500, 1515],
    [1545, 2400],
  ]);
  expect(findAvailableTimes(schedules3)).toEqual([
    [900, 930],
    [1200, 1515],
  ]);
});
test("isAvailable works", () => {
  expect(isAvailable(p1Meetings, 500, 846)).toBeFalsy();
});
