import Assignment from "./models/Assignment";

export const calcAverage = (assignments: Assignment[]): string => {
  let initialValue = 0;
  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  );
  const totalScore = completedAssignments.reduce(
    (acc, cv) => acc + cv.score,
    initialValue
  );
  const totalTotal = completedAssignments.reduce(
    (acc, cv) => acc + cv.total,
    initialValue
  );
  return `${((100 * totalScore) / totalTotal).toFixed(1)} %`;
};
