import { React, AllWidgetProps, jsx } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { useState, useEffect, useRef, useMemo } from "react";
import "./../../index.css";
import { useActiveLayer } from "../../../../shared/hooks";

const BASE_LAYER_ID = "custom-bottom-layer";

const Widget = (props: AllWidgetProps<any>) => {
  const [mapView, setMapView] = useState<__esri.MapView | null>(null);
  const [opacity, setOpacity] = useState(0.6);
  const { activeLayer } = useActiveLayer();

  const baseLayer = useMemo(() => {
    if (!mapView?.map) return null;
    return mapView.map.findLayerById(BASE_LAYER_ID) || null;
  }, [mapView?.map, activeLayer]);

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (jmv) setMapView(jmv.view);
  };

  useEffect(() => {
    if (mapView) {
      if (baseLayer) {
        baseLayer.opacity = opacity;
      }
    }
  }, [mapView, opacity, baseLayer]);

  useEffect(() => {
    setOpacity(0.6);
  }, [activeLayer]);

  return (
    <>
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={onActiveViewChange}
      />
      <div style={{ marginTop: "8px", padding: "4px" }}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className={"slider-wrapper"}
        />
      </div>
    </>
  );
};

export default Widget;
