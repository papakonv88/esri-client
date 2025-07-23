import { React, getAppStore } from "jimu-core";
import { useEffect, useState, useRef } from "react";

export const useActiveLayer = (widgetId = "widget_27") => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [layerDetails, setLayerDetails] = useState(null);
  const activeLayerRef = useRef(null);

  useEffect(() => {
    const appStore = getAppStore();

    const unsubscribe = appStore.subscribe(() => {
      const state = appStore.getState();
      const widgetState = state.widgetsState?.[widgetId];

      if (widgetState?.activeLayer !== activeLayerRef.current) {
        activeLayerRef.current = widgetState?.activeLayer;
        setActiveLayer(widgetState?.activeLayer);
        setLayerDetails(widgetState?.layerDetails);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [widgetId]);

  return { activeLayer, layerDetails };
};
