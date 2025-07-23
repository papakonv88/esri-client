import { React, AllWidgetProps, jsx, getAppStore } from "jimu-core";
import { Loading } from "jimu-ui";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { useState, useEffect, useRef } from "react";
import { layersConfig } from "./layers";
import { getPixelValue, getFeatureValue, pointToGrGrid } from "./utils";
import { greeceExtent } from "./greeceExtend";
import CustomPopup from "./CustomPopup";
import UserMessages from "../../../../shared/components/UserMessages";
import { useActiveLayer } from "./../../../../shared/hooks/index";
import CustomPopupHover from "./CustomPopupHover";

const Widget = (props: AllWidgetProps<any>) => {
  const [features, setFeatures] = useState<any[]>([]);
  const [clickHandle, setClickHandle] = useState<any>(null);
  const [hoverHandle, setHoverHandle] = useState<any>(null);
  const [popups, setPopups] = useState([]);
  const [hoverPopup, setHoverPopup] = useState(null);
  const [jimuMapView, setJimuMapView] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const appStore = getAppStore();
  const hoverTimeout = useRef(null);
  const refContainer = useRef(null);
  const activeLayerRef = useRef(null);
  const disableHover = useRef(false);

  const { activeLayer, layerDetails } = useActiveLayer();

  const isTargetLayer = (layer, targetName) => {
    return layer?.url && layer.url.includes(targetName) && layer.visible;
  };

  const closePopup = (id) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDisableHover = (bool) => (disableHover.current = bool);

  const isInGreece = (point) => {
    const { latitude, longitude } = point;
    const { xmin, xmax, ymin, ymax } = greeceExtent;
    return (
      longitude >= xmin &&
      longitude <= xmax &&
      latitude >= ymin &&
      latitude <= ymax
    );
  };

  const handeHoverPopup = (data) => setHoverPopup(data);

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (!jmv) return;
    setJimuMapView(jmv);

    if (hoverHandle) {
      hoverHandle.remove();
      setHoverHandle(null);
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    }

    if (clickHandle) {
      clickHandle.remove();
      setClickHandle(null);
    }

    const hover = jmv.view.on("pointer-move", (event) => {
      if (hoverTimeout.current) {
        handeHoverPopup(null);
        clearTimeout(hoverTimeout.current);
      }

      hoverTimeout.current = setTimeout(async () => {
        try {
          const view = jmv.view;
          const point = view.toMap({ x: event.x, y: event.y });
          if (!isInGreece(point)) {
            return;
          }
          if (disableHover.current) {
            return;
          }
          const results = view.map.layers.filter((mapLayer) =>
            isTargetLayer(mapLayer, activeLayerRef.current),
          );
          if (results?.items.length > 0) {
            const pixelResult = await getPixelValue(
              view,
              point,
              activeLayerRef.current,
            );
            let obj = {
              value: pixelResult,
              point: { x: event.x, y: event.y },
            };
            handeHoverPopup(obj);
          } else {
            return;
          }
        } catch (error) {
          console.error("Error querying features hover:", error);
          setErrorMessage({ text: "Παρουσιάστηκε σφάλμα", type: "error" });
        }
      }, 2000);
    });

    setHoverHandle(hover);

    const handle = jmv.view.on("click", async (event) => {
      const point = event.mapPoint;
      if (!isInGreece(event.mapPoint)) {
        return;
      }

      const view = jmv.view;
      const allFeatures: any[] = [];

      try {
        setIsLoading(true);
        const relevantLayers = view.map.layers.filter(
          (mapLayer) =>
            isTargetLayer(mapLayer, activeLayerRef.current) ||
            layersConfig.find(
              (cfg) => cfg.url === mapLayer.url && mapLayer.visible,
            ),
        );

        const allPromises = relevantLayers.map(async (mapLayer) => {
          if (isTargetLayer(mapLayer, activeLayerRef.current)) {
            const pixelResult = await getPixelValue(
              view,
              event.mapPoint,
              activeLayerRef.current,
            );
            return {
              layer: activeLayerRef.current,
              result: pixelResult,
            };
          }

          const layerConfig = layersConfig.find(
            (cfg) => cfg.url === mapLayer.url && mapLayer.visible,
          );

          if (layerConfig) {
            const featureResult = await getFeatureValue(layerConfig, event);
            return {
              layer: mapLayer.title,
              result: featureResult,
            };
          }
        });

        const egsaPoint = await pointToGrGrid(point);

        const results = await Promise.all(allPromises);
        const filteredResults = results.filter(
          (result) => result.result !== "-",
        );
        const addToResults = [
          ...filteredResults,
          {
            layer: "lat",
            result: `Lat: ${Number(point.latitude).toFixed(6)}`,
          },
          {
            layer: "lon",
            result: `Lon: ${Number(point.longitude).toFixed(6)}`,
          },
          { layer: "X", result: `X: ${Number(egsaPoint.x).toFixed(2)}` },
          { layer: "Y", result: `Y: ${Number(egsaPoint.y).toFixed(2)}` },
        ];

        setPopups((prev) => [
          ...prev,
          {
            id: Date.now(),
            mapPoint: point,
            results: addToResults,
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error querying features:", error);
        setErrorMessage({ text: "Παρουσιάστηκε σφάλμα", type: "error" });
      }
    });

    setClickHandle(handle);
  };

  useEffect(() => {
    return () => {
      if (clickHandle) {
        clickHandle.remove();
        setClickHandle(null);
      }
    };
  }, [clickHandle]);

  useEffect(() => {
    if (activeLayer) {
      activeLayerRef.current = activeLayer;
      setPopups([]);
    }
  }, [activeLayer]);

  useEffect(() => {
    const target =
      refContainer.current?.parentElement?.parentElement?.parentElement;
    target?.style.setProperty("pointer-events", "none", "important");
  }, []);

  return (
    <>
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={onActiveViewChange}
      />

      <div
        ref={refContainer}
        className="w-100 h-100"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <UserMessages toast={errorMessage} />
        {isLoading && (
          <div className="loading-overlay">
            <Loading type="PRIMARY" />
          </div>
        )}
        {popups.map((popup) => (
          <CustomPopup
            key={popup.id}
            payload={popup}
            view={jimuMapView?.view}
            closePopup={closePopup}
            activeLayer={activeLayerRef?.current}
            details={layerDetails}
            handleDisableHover={handleDisableHover}
          />
        ))}
        {hoverPopup && (
          <CustomPopupHover
            value={hoverPopup?.value}
            point={hoverPopup?.point}
            precision={layerDetails.precision}
          />
        )}
      </div>
    </>
  );
};

export default Widget;
