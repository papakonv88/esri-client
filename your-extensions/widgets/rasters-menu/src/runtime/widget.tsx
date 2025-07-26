import { React, type AllWidgetProps } from "jimu-core";
import { JimuMapViewComponent, type JimuMapView } from "jimu-arcgis";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  Icon,
} from "jimu-ui";
import MapImageLayer from "esri/layers/MapImageLayer";
import { appActions } from "jimu-core";
import { DataOutlined } from "jimu-icons/outlined/data/data";
import "./../../index.css";
import indexes from "./filters/indexes";
import scenarios from "./filters/scenarios";
import seasons from "./filters/seasons";
import timeline from "./filters/timeline";
import { useDispatch } from "react-redux";

import FiltersDropdown from "./FiltersDropdown";
import { useEffect, useMemo } from "react";

const BASE_LAYER_ID = "custom-bottom-layer";

const Widget = (props: AllWidgetProps<any>) => {
  const { useState } = React;

  const [selectedIndex, setSelectedIndex] = useState(indexes[0]);
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].label);
  const [selectedTimeline, setSelectedTimeline] = useState(timeline[0].label);
  const [selectedSeason, setSelectedSeason] = useState(seasons[0].label);
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
  const { useMapWidgetIds } = props;
  const widgetId = props.id;
  const [filters, setFilters] = useState({
    index: indexes[0].value,
    scenario: scenarios[0].value,
    timeline: timeline[0].value,
    season: seasons[0].value,
  });

  const [selectedLabels, setSelectedLabels] = useState({
    index: indexes[0].label,
    scenario: scenarios[0].label,
    timeline: timeline[0].label,
    season: seasons[0].label,
  });

  const dispatch = useDispatch();

  const selectedOptionsPath = useMemo(() => {
    let selectedOptionsPath = Object.values(selectedLabels);
    if (selectedLabels.timeline === timeline[0].label) {
      selectedOptionsPath = selectedOptionsPath.filter(
        (item) => item !== selectedScenario,
      );
    }
    return selectedOptionsPath.join(" | ");
  }, [JSON.stringify(selectedLabels)]);

  const layer = useMemo(() => {
    let layer;
    let { index, scenario, timeline, season } = filters;
    // if season is selected then map tmean and wind indexes to another index label
    if (season) {
      switch (index) {
        case "tmean":
          index = "Temp";
          break;
        case "wind":
          index = "SfsWind";
          break;
        case "PR_GR_3racmo":
          index = "Prec";
          break;
        default:
          break;
      }
    }

    if (scenario.includes("dif")) {
      const scenarioParts = scenario.split("_");
      const dif = scenarioParts[0];
      const scenarioName = scenarioParts[1];

      layer = `${index}${season ? "_" + season : ""}_${dif}_${timeline}_${scenarioName}`;
    } else {
      layer = `${index}${season ? "_" + season : ""}_${timeline}_${scenario}`;
    }

    if (timeline === "ref") {
      layer = `${index}${season ? "_" + season : ""}_${timeline}`;
    }
    return layer;
  }, [JSON.stringify(filters)]);

  const replaceRasterLayer = () => {
    if (!jimuMapView?.view || !layer) return;

    const layerUrl = `https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/${layer}/MapServer`;

    const newLayer = new MapImageLayer({
      id: BASE_LAYER_ID,
      url: layerUrl,
      opacity: 0.5,
      visible: true,
    });

    const existingLayer = jimuMapView.view.map.findLayerById(BASE_LAYER_ID);

    if (existingLayer && existingLayer.url === layerUrl) {
      return;
    }

    if (existingLayer) {
      jimuMapView.view.map.remove(existingLayer);
    }

    jimuMapView.view.map.add(newLayer, 0);
  };

  const updateLayerDetails = () => {
    const details = indexes.find(
      (index) => index.value === selectedIndex.value,
    );
    dispatch(
      appActions.widgetStatePropChange(widgetId, "layerDetails", details),
    );
    dispatch(appActions.widgetStatePropChange(widgetId, "activeLayer", layer));
  };

  const handleFiltersChange = (e, type) => {
    if (type === "scenario") {
      setSelectedScenario(e.label);
    }

    if (type === "season") {
      setSelectedSeason(e.label);
    }

    if (type === "timeline") {
      setSelectedTimeline(e.label);
    }

    if (type === "index") {
      const label = e.label;
      const index = indexes.filter((index) => index.label === label)[0];

      setSelectedIndex(index);
      if (!index?.has_seasonal_data) {
        setSelectedSeason(seasons[0].label);
      }

      setFilters((prevFilters) => {
        if (prevFilters.index.has_seasonal_data && !index?.has_seasonal_data) {
          return {
            ...prevFilters,
            [type]: e.value,
            season: seasons[0].value,
          };
        } else {
          return {
            ...prevFilters,
            [type]: e.value,
          };
        }
      });

      setSelectedLabels((prevLabels) => {
        if (prevLabels.index.has_seasonal_data && !index?.has_seasonal_data) {
          return {
            ...prevLabels,
            [type]: e.label,
            season: seasons[0].label,
          };
        } else {
          return {
            ...prevLabels,
            [type]: e.label,
          };
        }
      });
    } else {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [type]: e.value,
        };
      });

      setSelectedLabels((prevLabels) => {
        return {
          ...prevLabels,
          [type]: e.label,
        };
      });
    }
  };

  const activeViewChangeHandler = (jmv: JimuMapVie) => {
    setJimuMapView(jmv);
  };

  useEffect(() => {
    updateLayerDetails();
    replaceRasterLayer();
  }, [layer]);

  useEffect(() => {
    if (layer) {
      updateLayerDetails();
      replaceRasterLayer();
    }
  }, [jimuMapView?.view]);

  return (
    <div>
      {useMapWidgetIds && useMapWidgetIds.length === 1 ? (
        <JimuMapViewComponent
          useMapWidgetId={useMapWidgetIds?.[0]}
          onActiveViewChange={activeViewChangeHandler}
        />
      ) : null}

      <div>
        <div className={"dropdown-wrapper"}>
          <FiltersDropdown
            key={"indexex"}
            title={"Δείκτες"}
            items={indexes}
            selectedItem={selectedIndex.label}
            handleFiltersChange={handleFiltersChange}
            type={"index"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/add-rasters-32.svg"
            }
          />
          <FiltersDropdown
            key={"dates"}
            title={"Χρονική Περίοδος"}
            items={timeline}
            selectedItem={selectedTimeline}
            handleFiltersChange={handleFiltersChange}
            type={"timeline"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/date-time-32.svg"
            }
          />
          <FiltersDropdown
            key={"season"}
            title={"Εποχές"}
            items={seasons}
            selectedItem={selectedSeason}
            handleFiltersChange={handleFiltersChange}
            type={"season"}
            hasSeasonalData={selectedIndex?.has_seasonal_data}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/time-filter-32.svg"
            }
          />
          <FiltersDropdown
            key={"scenarios"}
            title={"Σενάρια"}
            items={scenarios}
            selectedItem={selectedScenario}
            handleFiltersChange={handleFiltersChange}
            type={"scenario"}
            isDisabled={filters.timeline === "ref"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/test-data-32.svg"
            }
          />
        </div>
        <div className={"description-wrapper"}>{selectedOptionsPath}</div>
      </div>
    </div>
  );
};

export default Widget;
