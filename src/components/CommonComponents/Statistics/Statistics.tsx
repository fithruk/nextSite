"use client";
import statisticsStyles from "./statistics.module.css";
import { Chart, Column } from "@ant-design/plots";

type DataProps = { data: any[] };

const Statistics = ({ data }: DataProps) => {
  //Вынести в configs
  const config = {
    data,
    xField: "letter",
    yField: "frequency",
    colorField: "letter",
    color: ["#5B21B6"],
    title: "Overwiew chart",
    titlePosition: "top",
    onReady: ({ chart }: { chart: Chart }) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          "afterrender",
          () => {
            chart.emit("tooltip:show", {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
  };
  return (
    <div className={statisticsStyles.container}>
      <Column {...config} />
    </div>
  );
};

export default Statistics;
