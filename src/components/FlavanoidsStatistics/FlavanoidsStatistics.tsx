import React from "react";
import wineData from "../../utils/wineData";
import { calculateStatisticsByClass } from "../../utils/utils";
import "../../styles/StatisticsTable.css";

interface Props {
  className: string;
}

const FlavanoidsStatistics: React.FC<Props> = ({ className }) => {
  // Extract Flavanoids data for each class
  const flavanoidsDataByClass: Record<number, number[]> = {};

  for (const wine of wineData) {
    const alcoholClass = wine["Alcohol"];
    const flavanoids = parseFloat(wine["Flavanoids"].toString());
    if (!isNaN(flavanoids)) {
      flavanoidsDataByClass[alcoholClass] = [
        ...(flavanoidsDataByClass[alcoholClass] || []),
        flavanoids,
      ];
    }
  }

  // Calculate statistics for each class using the utility function
  const statisticsByClass = calculateStatisticsByClass(
    wineData,
    flavanoidsDataByClass,
    "Flavanoids"
  );

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(statisticsByClass).map((alcoholClass) => (
              <th key={alcoholClass}>Class {alcoholClass}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {Object.values(statisticsByClass).map(([mean]) => (
              <td key={mean}>{mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {Object.values(statisticsByClass).map(([, median]) => (
              <td key={median}>{median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {Object.values(statisticsByClass).map(([, , mode]) => (
              <td key={mode}>{mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsStatistics;
