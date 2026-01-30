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
import { useLocale, useBreakpoint } from "../../../../shared/hooks";
import FiltersDropdown from "./FiltersDropdown";
import { useEffect, useMemo, useState } from "react";
import UserMessages from "../../../../shared/components/UserMessages";
import Point from "esri/geometry/Point";

const BASE_LAYER_ID = "custom-bottom-layer";

const Widget = (props: AllWidgetProps<any>) => {
  const { useState } = React;
  const isTitle = useBreakpoint(1080);

  const [selectedIndex, setSelectedIndex] = useState(indexes[0]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
  const { useMapWidgetIds } = props;
  const { locale } = useLocale();
  const isMdUp = useBreakpoint(768);
  const widgetId = props.id;
  const [filters, setFilters] = useState({
    index: indexes[0].value,
    scenario: scenarios[0].value,
    timeline: timeline[0].value,
    season: seasons[0].value,
  });

  const [selectedLabels, setSelectedLabels] = useState({
    index: locale === "el" ? indexes[0].label : indexes[0].labelEn,
    scenario: locale === "el" ? scenarios[0].label : scenarios[0].labelEn,
    timeline: locale === "el" ? timeline[0].label : timeline[0].labelEn,
    season: locale === "el" ? seasons[0].label : seasons[0].labelEn,
  });

  const [selectedTimeline, setSelectedTimeline] = useState(
    locale === "el" ? timeline[0].label : timeline[0].labelEn,
  );

  const [selectedSeason, setSelectedSeason] = useState(
    locale === "el" ? seasons[0].label : seasons[0].labelEn,
  );

  const [selectedScenario, setSelectedScenario] = useState(
    locale === "el" ? scenarios[0].label : scenarios[0].labelEn,
  );

  const dispatch = useDispatch();

  const selectedOptionsPath = useMemo(() => {
    const { has_seasonal_data } = selectedIndex;
    let selectedOptionsPath;
    if (!has_seasonal_data) {
      const { season, ...rest } = selectedLabels;
      selectedOptionsPath = Object.values(rest);
    } else {
      selectedOptionsPath = Object.values(selectedLabels);
    }
    const timelineLabel =
      locale === "el" ? timeline[0].label : timeline[0].labelEn;
    if (selectedLabels.timeline === timelineLabel) {
      selectedOptionsPath = selectedOptionsPath.filter(
        (item) => item !== selectedScenario,
      );
    }
    return selectedOptionsPath.join(" | ");
  }, [JSON.stringify(selectedLabels), JSON.stringify(selectedIndex)]);

  const layer = useMemo(() => {
    let layer;
    let { index, scenario, timeline, season } = filters;
    const { has_seasonal_data } = selectedIndex || {};
    if (!has_seasonal_data && season) {
      season = null;
    }
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

      layer = `${index}${
        season ? "_" + season : ""
      }_${dif}_${timeline}_${scenarioName}`;
    } else {
      layer = `${index}${season ? "_" + season : ""}_${timeline}_${scenario}`;
    }

    if (timeline === "ref") {
      layer = `${index}${season ? "_" + season : ""}_${timeline}`;
    }

    if (!layer) {
      setErrorMessage({
        text:
          locale === "el"
            ? "Δεν υπάρχουν δεδομένα για τον συνδυασμό παραμέτρων που επιλέξατε"
            : "No data available for the selected parameter combination",
        type: "error",
      });
    }
    return layer;
  }, [JSON.stringify(filters), JSON.stringify(selectedIndex)]);

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

    const zoomToLatLonMainMap = async (lat: number, lon: number) => {
        const view = jimuMapView?.view;
        if (!view) return;

        await view.when();

        const target = new Point({
            latitude: lat,
            longitude: lon,
            spatialReference: { wkid: 4326 },
        });

        await view.goTo(
            { target, zoom: 9 },
            { animate: true, duration: 800 }
        );
    };

  const updateLayerDetails = () => {
    const details = indexes.find(
      (index) => index.value === selectedIndex.value,
    );
    dispatch(
      appActions.widgetStatePropChange(
        "rasters-menu-widget",
        "layerDetails",
        details,
      ),
    );
    dispatch(
      appActions.widgetStatePropChange(
        "rasters-menu-widget",
        "activeLayer",
        layer,
      ),
    );
  };

  const handleFiltersChange = (e, type) => {
    if (type === "scenario") {
      setSelectedScenario(locale === "el" ? e.label : e.labelEn);
    }

    if (type === "season") {
      setSelectedSeason(locale === "el" ? e.label : e.labelEn);
    }

    if (type === "timeline") {
      if (locale === "el") {
        setSelectedTimeline(e.label);
      } else {
        setSelectedTimeline(e.labelEn);
      }
    }

    if (type === "index") {
      const label = e.label;
      const index = indexes.filter((index) => index.label === label)[0];

      setSelectedIndex(index);
      if (!index?.has_seasonal_data) {
        setSelectedSeason(
          locale === "el" ? seasons[0].label : seasons[0].labelEn,
        );
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
        const { has_seasonal_data } = index;
        if (!has_seasonal_data) {
          return {
            ...prevLabels,
            [type]: locale === "el" ? e.label : e.labelEn,
            season: locale === "el" ? seasons[0].label : seasons[0].labelEn,
          };
        } else {
          return {
            ...prevLabels,
            [type]: locale === "el" ? e.label : e.labelEn,
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
          [type]: locale === "el" ? e.label : e.labelEn,
        };
      });
    }
  };

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    setJimuMapView(jmv);
  };

    useEffect(() => {
        if (!jimuMapView?.view) return;

        const params = new URLSearchParams(window.location.search);
        const mapParam = params.get("map");
        if (!mapParam) return;

        const [latStr, lonStr] = mapParam.split(",");
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);

        if (Number.isNaN(lat) || Number.isNaN(lon)) return;

        zoomToLatLonMainMap(lat, lon);
    }, [jimuMapView]);

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
      <UserMessages toast={errorMessage} />
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
            title={locale === "el" ? "Δείκτες" : "Indices"}
            items={indexes}
            selectedItem={
              locale === "el" ? selectedIndex.label : selectedIndex.labelEn
            }
            handleFiltersChange={handleFiltersChange}
            type={"index"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/add-rasters-32.svg"
            }
            locale={locale}
            isUp={isTitle}
          />
          <div className={"vertical-divider"} />
          <FiltersDropdown
            key={"dates"}
            title={locale === "el" ? "Χρονική Περίοδος" : "Time Period"}
            items={timeline}
            selectedItem={selectedTimeline}
            handleFiltersChange={handleFiltersChange}
            type={"timeline"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/date-time-32.svg"
            }
            locale={locale}
            isUp={isTitle}
          />
          <div className={"vertical-divider"} />
          <FiltersDropdown
            key={"season"}
            title={locale === "el" ? "Εποχές" : "Seasons"}
            items={seasons}
            selectedItem={selectedSeason}
            handleFiltersChange={handleFiltersChange}
            type={"season"}
            hasSeasonalData={selectedIndex?.has_seasonal_data}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/time-filter-32.svg"
            }
            locale={locale}
            isUp={isTitle}
          />
          <div className={"vertical-divider"} />
          <FiltersDropdown
            key={"scenarios"}
            title={locale === "el" ? "Σενάρια" : "Scenarios"}
            items={scenarios}
            selectedItem={selectedScenario}
            handleFiltersChange={handleFiltersChange}
            type={"scenario"}
            isDisabled={filters.timeline === "ref"}
            iconUrl={
              "https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/test-data-32.svg"
            }
            locale={locale}
            isUp={isTitle}
          />
        </div>
        <div className={"description-wrapper"}>{selectedOptionsPath}</div>
      </div>
    </div>
  );
};

export default Widget;
