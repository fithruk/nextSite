import {
  LineChartProps,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts";
import dayjs from "dayjs";

import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const createStrengthProgressionByExerciseConfig = (
  data: {
    exercise: string;
    date: string;
    averageWeight: number;
  }[]
): LineChartProps => {
  // Определяем количество уникальных дней
  const uniqueDates = [
    ...new Set(data.map((item) => dayjs(item.date).format("YYYY-MM-DD"))),
  ];
  const numberOfUniqueDays = uniqueDates.length;

  let groupBy: "day" | "week" | "month" = "day";

  // Увеличиваем порог для группировки по месяцам
  if (numberOfUniqueDays > 7 * 4 * 2) {
    // Если уникальных дней больше 56 (примерно 2 месяца)
    groupBy = "month";
  } else if (numberOfUniqueDays > 7 * 4) {
    // Если уникальных дней больше 28 (примерно месяц)
    groupBy = "month"; // Всегда по месяцам, если больше 28 дней
  } else if (numberOfUniqueDays > 7) {
    // Если уникальных дней больше 7 (неделя)
    groupBy = "week";
  } else {
    groupBy = "day";
  }

  const getGroupKey = (date: string) => {
    if (groupBy === "day") {
      return dayjs(date).format("DD.MM");
    } else if (groupBy === "week") {
      return `Недiля-${dayjs(date).week()}`;
    } else {
      // groupBy === "month"
      return dayjs(date).format("YYYY-MM");
    }
  };

  const grouped: Record<string, Record<string, number>> = {};

  data.forEach(({ exercise, date, averageWeight }) => {
    const groupKey = getGroupKey(date);
    if (!grouped[exercise]) {
      grouped[exercise] = {};
    }
    const currentMax = grouped[exercise][groupKey];
    if (currentMax === undefined || averageWeight > currentMax) {
      grouped[exercise][groupKey] = averageWeight;
    }
  });

  const allGroupKeys = [
    ...new Set(data.map((item) => getGroupKey(item.date))),
  ].sort((a, b) => {
    if (groupBy === "day") {
      const [dayA, monthA] = a.split(".");
      const [dayB, monthB] = b.split(".");
      return `${monthA}.${dayA}`.localeCompare(`${monthB}.${dayB}`);
    } else if (groupBy === "week") {
      const parseWeekKey = (key: string) => {
        const parts = key.split("-");
        return {
          year: parseInt(parts[0], 10),
          week: parseInt(parts[2], 10),
        };
      };
      const weekA = parseWeekKey(a);
      const weekB = parseWeekKey(b);
      if (weekA.year !== weekB.year) return weekA.year - weekB.year;
      return weekA.week - weekB.week;
    } else {
      // groupBy === "month"
      return a.localeCompare(b); // YYYY-MM сортируется лексикографически
    }
  });

  const series = Object.entries(grouped).map(([exercise, groupWeights]) => ({
    label: exercise,
    data: allGroupKeys.map((key) => groupWeights[key] ?? null),
  }));

  const xAxisConfig: LineChartProps["xAxis"] = [
    {
      scaleType: "band",
      data: allGroupKeys,
    },
  ];

  return {
    xAxis: xAxisConfig,
    series,
    height: 300,
  };
};

const createfrequentMuscleGroupstConfig = (
  frequentMuscleGroupsData: Record<string, number>
) => {
  const data = Object.values(frequentMuscleGroupsData);
  const metrics = Object.keys(frequentMuscleGroupsData);

  return {
    height: 300,
    series: [
      {
        label: "Пропорційність навантаження на м'язові групи %",
        data: data,
      },
    ],
    radar: {
      max: Math.max(...data) + 10, // или фиксированное значение
      metrics,
    },
  };
};

const createTonnagePerWorkoutConfig = (
  tonnagePerWorkoutData: {
    date: string;
    tonnage: number;
  }[],
  groupedBy: "day" | "week" | "month"
) => {
  const xAxisData = tonnagePerWorkoutData.map((item) => {
    if (groupedBy === "day") {
      return dayjs(item.date).format("DD.MM");
    } else if (groupedBy === "week") {
      return item.date; // уже строка "Week N"
    } else if (groupedBy === "month") {
      return dayjs(item.date).format("MMMM YYYY");
    }
  });

  const seriesData = tonnagePerWorkoutData.map((item) => item.tonnage);

  return {
    height: 300,
    sx: {
      width: { xs: "auto", md: "auto" },
      margin: "auto",
    },
    xAxis: [
      {
        scaleType: "band" as const,
        data: xAxisData,
      },
    ],
    series: [
      {
        data: seriesData,
      },
    ],
  };
};

const weightChangeDynamicsConfig = (
  data: { numberOfReps: number; valueOfWeight: number }[]
) => {
  const wData = data.map((data) => data.valueOfWeight);
  const rData = data.map((data) => data.numberOfReps);
  const xLabels = Array.from({ length: data.length }, (_, ind) => ind + 1);
  return {
    height: 300,
    // width: 800,
    series: [
      { data: wData, label: "Weight", id: "WeightId" },
      { data: rData, label: "Reps", id: "RepsId" },
    ],
    xAxis: [{ scaleType: "point" as const, data: xLabels }],
    yAxis: [{ width: 50 }],
    sx: {
      [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
        strokeWidth: 1,
      },
      [`.${lineElementClasses.root}[data-series="WeightId"]`]: {
        strokeDasharray: "5 5",
      },
      [`.${lineElementClasses.root}[data-series="RepsId"]`]: {
        strokeDasharray: "3 4 5 2",
      },
      [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
        fill: "#fff",
      },
      [`& .${markElementClasses.highlighted}`]: {
        stroke: "none",
      },
    },
    // margin: { right: 24 },
  };
};

export {
  createStrengthProgressionByExerciseConfig,
  createfrequentMuscleGroupstConfig,
  createTonnagePerWorkoutConfig,
  weightChangeDynamicsConfig,
};
