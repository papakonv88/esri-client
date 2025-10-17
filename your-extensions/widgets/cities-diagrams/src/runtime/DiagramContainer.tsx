import { React, jsx } from "jimu-core";
import { useRef, useLayoutEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import "./../../index.css";

am4core.options.queue = true;
am4core.options.onlyShowOnViewport = true;
am4core.useTheme(am4themes_material);

const DiagramContainer = ({
  diagramID,
  type,
  data,
  filenameToDownload,
  locale,
}) => {
  const chartRef = useRef<am4charts.XYChart | null>(null);

  let symbol = "",
    diagramTitle = "",
    preFilenameToDownload = "";

  switch (type) {
    case "temp":
      symbol = "°C";
      diagramTitle = locale === "el" ? "Θερμοκρασία" : "Temperature";
      preFilenameToDownload = "Tmean";
      break;
    case "rain":
      symbol = "mm";
      diagramTitle = locale === "el" ? "Βροχόπτωση" : "Rainfall";
      preFilenameToDownload = "Pre";
      break;
  }

  const createSeries = (chart, name, fieldX, fieldY) => {
    const series = chart.series.push(new am4charts.LineSeries());
    series.name = name;
    series.dataFields.valueY = fieldY;
    series.dataFields.categoryX = fieldX;

    const bullets = series.bullets.push(new am4core.Circle());
    bullets.tooltipText = `{${fieldX}}: {${fieldY}} ${symbol}`;
    bullets.radius = 4;

    const bulletHover = bullets.states.create("hover");
    bulletHover.properties.scale = 1.5;
    return series;
  };

  useLayoutEffect(() => {
    const chart = am4core.create(diagramID, am4charts.XYChart);
    chart.data = data;
    chart.numberFormatter.numberFormat = "#.##";
    chart.legend = new am4charts.Legend();
    chart.colors.list = [
      am4core.color("#005AD4"),
      am4core.color("#68A34F"),
      am4core.color("#FFC700"),
      am4core.color("#f94f00"),
    ];

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    categoryAxis.dataFields.category = "dateRange";
    categoryAxis.cursorTooltipEnabled = false;
    valueAxis.cursorTooltipEnabled = false;

    const s1 = createSeries(chart, "Control", "dateRange", "control");
    const s2 = createSeries(
      chart,
      `${locale === "el" ? "RCP2.6 (αυστηρό)" : "RCP2.6 (stringment)"}`,
      "dateRange",
      "rcp26",
    );
    const s3 = createSeries(
      chart,
      `${locale === "el" ? "RCP4.5 (ενδιάμεσο)" : "RCP4.5 (intermediate)"}`,
      "dateRange",
      "rcp45",
    );
    const s4 = createSeries(
      chart,
      `${locale === "el" ? "RCP8.5 (ακραίο)" : "RCP8.5 (extreme)"}`,
      "dateRange",
      "rcp85",
    );

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.snapToSeries = [s1, s2, s3, s4];

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, locale]);

  return (
    <>
      <div className="diagram-box">
        <div className="diagram-header">
          <h3>
            {diagramTitle} ({symbol})
          </h3>
          {locale === "el" ? (
            <a
              style={{ textDecoration: "none", color: "#FFFFFF" }}
              href={`https://adaptivegreecehub.gr/download-content?timelines=${preFilenameToDownload}_${filenameToDownload}`}
              className="diagram-download"
              target="_blank"
              rel="noreferrer"
            >
              {"Λήψη δεδομένων"}
            </a>
          ) : (
            <a
              style={{ textDecoration: "none", color: "#FFFFFF" }}
              href={`https://adaptivegreecehub.gr/en/download-gis-data/?timelines=${preFilenameToDownload}_${filenameToDownload}`}
              className="diagram-download"
              target="_blank"
              rel="noreferrer"
            >
              {"Download data"}
            </a>
          )}
        </div>
        <div className="diagram-wrapper">
          <div id={diagramID} style={{ width: "100%", height: "400px" }}></div>
        </div>
      </div>
    </>
  );
};

export default DiagramContainer;
