import React from "react";
import wineData from "../../utils/wineData";
import { calculateStatisticsByClass } from "../../utils/utils";
import "../../styles/StatisticsTable.css";

interface Props {
  className: string;
}

const GammaStatistics: React.FC<Props> = ({ className }) => {
  // Calculate Gamma for each data point and group by class
  const gammaDataByClass: Record<number, number[]> = {};

  // Iterate through the wineData to calculate Gamma values and group them by class
  for (const wine of wineData) {
    const alcoholClass = wine["Alcohol"];
    const ash = parseFloat(wine["Ash"].toString());
    const hue = parseFloat(wine["Hue"].toString());
    const magnesium = parseFloat(wine["Magnesium"].toString());
    if (!isNaN(ash) && !isNaN(hue) && !isNaN(magnesium)) {
      const gamma = (ash * hue) / magnesium;
      gammaDataByClass[alcoholClass] = [
        ...(gammaDataByClass[alcoholClass] || []),
        gamma,
      ];
    }
  }

  // Calculate statistics for Gamma values for each class using the utility function
  const statisticsByClass = calculateStatisticsByClass(
    wineData,
    gammaDataByClass,
    "Gamma"
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
            <td>Gamma Mean</td>
            {Object.values(statisticsByClass).map(([mean]) => (
              <td key={mean}>{mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.values(statisticsByClass).map(([, median]) => (
              <td key={median}>{median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.values(statisticsByClass).map(([, , mode]) => (
              <td key={mode}>{mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GammaStatistics;
