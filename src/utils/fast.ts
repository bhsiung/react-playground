/*
We are writing a tool to help users manage their calendars. Given an unordered list of times of day when people are busy, write a function that tells us the intervals during the day when ALL of them are available.

Each time is expressed as an integer using 24-hour notation, such as 1200 (12:00), 1530 (15:30), or 800 (8:00).

Sample input:

p1_meetings = [
  (1230, 1300),
  ( 845, 900),
  (1300, 1500),
]

p2_meetings = [
  ( 0, 844),
  ( 930, 1200),
  (1515, 1546),
  (1600, 2400),
]

p3_meetings = [
  ( 845, 915),
  (1515, 1545),
  (1235, 1245),
]

p4_meetings = [
  ( 1, 5),
  (844, 900),
  (1515, 1600)
]

schedules1 = [p1_meetings, p2_meetings, p3_meetings] // number[][]
schedules2 = [p1_meetings, p3_meetings]
schedules3 = [p2_meetings, p4_meetings]

Expected output:

findAvailableTimes(schedules1)
 => [  844,  845 ],
    [  915,  930 ],
    [ 1200, 1230 ],
    [ 1500, 1515 ],
    [ 1546, 1600 ]

findAvailableTimes(schedules2)
 => [    0,  845 ],
    [  915, 1230 ],
    [ 1500, 1515 ],
    [ 1545, 2400 ]

findAvailableTimes(schedules3)
    [  900,  930 ],
    [ 1200, 1515 ]
*/

export const p1Meetings: TimeRange[] = [
  [1230, 1300],
  [845, 900],
  [1300, 1500],
];

export const p2Meetings: TimeRange[] = [
  [0, 845],
  [930, 1200],
  [1515, 1545],
  [1600, 2400],
];

export const p3Meetings: TimeRange[] = [
  [845, 915],
  [1515, 1545],
  [1235, 1245],
];

export const p4Meetings: TimeRange[] = [
  [1, 5],
  [845, 900],
  [1515, 1600],
];

export const schedules1: TimeRange[][] = [p1Meetings, p2Meetings, p3Meetings];
export const schedules2:TimeRange[][] = [p1Meetings, p3Meetings]
export const schedules3:TimeRange[][] = [p2Meetings, p4Meetings]

type TimeRange = [number, number];
export function isAvailable(meetings: TimeRange[], start: number, end: number) {
  return !meetings.some(([start0, end0]) => {
    // type 1
    if (start0 < start && start < end0) return true;
    // type 2
    if (start0 < start && end0 > end) return true;
    // type 3
    if (end0 > start && start0 < end) return true;

    return false;
  });
}

export function findAvailableTimes(meetingSet: TimeRange[][]) {
  // marge into 1d
  const flattenMeetings: TimeRange[] = meetingSet
    .reduce((set, meetings) => [...set, ...meetings], [])
    .sort((a, b) => a[0] - b[0]);
  const normalizedMeetings = mergeMeetings(flattenMeetings);
  return revertMeetings(normalizedMeetings);
}

function mergeMeetings(meetings: TimeRange[], start = 0): TimeRange[] {
  if (start > meetings.length - 2) return meetings;
  const [start0, end0] = meetings[start];
  const [start1, end1] = meetings[start + 1];
  if (start1 <= end0) {
    const mergedMeeting: TimeRange = [start0, Math.max(end0, end1)];
    meetings.splice(start, 2, mergedMeeting);
    return mergeMeetings(meetings, start);
  } else {
    return mergeMeetings(meetings, start + 1);
  }
}

function revertMeetings(meetings: TimeRange[]): TimeRange[] {
  const availabilities: TimeRange[] = [];
  if (meetings.length === 0) return [[0, 2400]];
  if (meetings[0][0] > 0) availabilities.push([0, meetings[0][0]]);
  for (let i = 0; i < meetings.length - 1; i++) {
    availabilities.push([meetings[i][1], meetings[i + 1][0]]);
  }
  if (meetings[meetings.length - 1][1] < 2400)
    availabilities.push([meetings[meetings.length - 1][1], 2400]);
  return availabilities;
}
