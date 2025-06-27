import { ExerciseResult, PlannedValueTypes } from "@/Types/types";

const usePlanPercentages = () => {
  const getMinMaxWeigthRangeString = (row: ExerciseResult) => {
    const weights = row.sets
      .map((set) => set.weightValue)
      .filter((val): val is number => val !== undefined);

    const min = Math.min(...weights);
    const max = Math.max(...weights);
    return min === max ? `${min}` : `${min} - ${max}`;
  };

  const getMinMaxRepsRangeString = (row: ExerciseResult) => {
    const reps = row.sets
      .map((set) => set.numberOfreps)
      .filter((val): val is number => val !== undefined);

    const min = Math.min(...reps);
    const max = Math.max(...reps);
    return min === max ? `${min}` : `${min} - ${max}`;
  };

  const getComplitedPlanPercentages = (
    row: ExerciseResult,
    plannedValue: PlannedValueTypes[]
  ) => {
    const executedTonnage = row.sets.reduce((value, set) => {
      if (
        typeof set.numberOfreps === "number" &&
        typeof set.weightValue === "number"
      ) {
        return value + set.numberOfreps * set.weightValue;
      }
      return value;
    }, 0);
    const plannedTonnage = plannedValue.find(
      (ex) => ex.exName === row.exerciseName
    )?.tonnage;

    const executedPercents = (executedTonnage / plannedTonnage!) * 100;
    return executedPercents;
  };

  return {
    getMinMaxWeigthRangeString,
    getMinMaxRepsRangeString,
    getComplitedPlanPercentages,
  };
};

export { usePlanPercentages };
