import { React, getAppStore, appActions } from "jimu-core";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

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

export const useLocale = () => {
  const [locale, setLocale] = useState(
    getAppStore().getState().appContext?.locale || "en",
  );

  const dispatch = useDispatch();

  console.log(getAppStore().getState()?.appContext?.locale, "state");

  useEffect(() => {
    const unsubscribe = getAppStore().subscribe(() => {
      const currentLocale = getAppStore().getState().appContext?.locale;
      if (currentLocale && currentLocale !== locale) {
        setLocale(currentLocale);
      }
    });
    return () => unsubscribe();
  }, [locale]);

  const setAppLocale = (newLocale: string) => {
    const url = new URL(window.location.href);
    const currentLocale = url.searchParams.get("locale") || "en";

    if (currentLocale === newLocale) {
      return;
    }

    url.searchParams.set("locale", newLocale);
    window.location.href = url.toString();
  };

  return { locale, setAppLocale };
};
