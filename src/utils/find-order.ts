interface Dependency {
  course: number;
  completed: boolean;
  started: boolean;
}
export default function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // base case
  if (numCourses === 0) {
    return [];
  }
  if (prerequisites.length === 0) {
    return new Array(numCourses).fill(0).map((_, index) => index);
  }

  const courses = new Array(numCourses).fill(0).map((_, index) => ({ course: index, completed: false, started: false }));
  const dependenciesMap: Dependency[][] = [];

  for (let [dependentCourse, mainCourse] of prerequisites) {
    if (!dependenciesMap[dependentCourse]) {
      dependenciesMap[dependentCourse] = [];
    }
    dependenciesMap[dependentCourse].push({
      course: mainCourse,
      completed: false,
      started: false,
    });
  }
  const completed: Set<number> = new Set();

  function dfs(subject: { course: number, completed: boolean, started: boolean }) {
    const dependents = dependenciesMap[subject.course] || [];
    if (dependents.length === 0) {
      completed.add(subject.course);
      return;
    }
    for (let dependent of dependents) {
      if (dependent.started) {
        return;
      }
      dependent.started = true;
      if (dfs(dependent) === null) {
        return null;
      }
    }
    // check cyclic dependency
    if (dependents.every((dependent) => completed.has(dependent.course))) {
      completed.add(subject.course);
    } else {
      // cyclic dependency
      return null;
    }
  }

  for (let subject of courses) {
    if (dfs(subject) === null) {
      return [];
    }
  }

  return Array.from(completed);
}
