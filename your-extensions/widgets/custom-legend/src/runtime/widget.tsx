import { React, AllWidgetProps, jsx } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import Legend from "@arcgis/core/widgets/Legend";
import { useState, useEffect, useRef, useMemo } from "react";
import "./../../index.css";
import { useActiveLayer } from "../../../../shared/hooks";

const BASE_LAYER_ID = "custom-bottom-layer";

const Widget = (props: AllWidgetProps<any>) => {
  const [mapView, setMapView] = useState<__esri.MapView | null>(null);
  const legendRef = useRef<__esri.Legend | null>(null);
  const legendDivRef = useRef<HTMLDivElement>(null);
  const { activeLayer, layerDetails } = useActiveLayer();

  const baseLayer = useMemo(() => {
    if (!mapView?.map) return null;
    return mapView.map.findLayerById(BASE_LAYER_ID) || null;
  }, [mapView?.map, activeLayer]);

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (jmv) setMapView(jmv.view);
  };

  useEffect(() => {
    if (mapView?.map?.layers) {
      if (baseLayer?.url) {
        legendDivRef.current.innerHTML = "";
        legendRef.current = new Legend({
          view: mapView,
          container: legendDivRef.current,
          layerInfos: [
            {
              layer: baseLayer,
              title: "",
            },
          ],
        });
      } else {
        legendDivRef.current.innerHTML = "";
      }
    }
  }, [JSON.stringify(baseLayer)]);

  useEffect(() => {
    if (!legendDivRef.current) return;

    const container = legendDivRef.current;

    const cleanLegend = () => {
      container
        .querySelectorAll(".esri-legend__layer-cell")
        .forEach((el: HTMLElement) => {
          if (el.textContent?.includes("ADVANCEDLABELS - ")) {
            const parts = el.textContent.split(" - ");
            const value = parts[1] || null;
            if (layerDetails?.precision) {
              el.textContent = parseFloat(value).toFixed(
                layerDetails?.precision,
              );
            } else {
              el.textContent = parseFloat(value).toFixed(3);
            }
          }
        });
    };

    cleanLegend();

    const observer = new MutationObserver(() => cleanLegend());
    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [layerDetails]);

  return (
    <>
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={onActiveViewChange}
      />
      <div id={"legend-custom-wrapper"}>
        <div
          ref={legendDivRef}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "600px",
          }}
        />
      </div>
    </>
  );
};

export default Widget;
