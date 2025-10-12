import { React, getAppStore, appActions } from "jimu-core";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

export const useActiveLayer = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  const [layerDetails, setLayerDetails] = useState(null);
  const activeLayerRef = useRef(null);

  useEffect(() => {
    const appStore = getAppStore();

    const unsubscribe = appStore.subscribe(() => {
      const state = appStore.getState();
      const widgetState = state.widgetsState?.["rasters-menu-widget"];

      if (widgetState?.activeLayer !== activeLayerRef.current) {
        activeLayerRef.current = widgetState?.activeLayer;
        setActiveLayer(widgetState?.activeLayer);
        setLayerDetails(widgetState?.layerDetails);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { activeLayer, layerDetails };
};

export const useLocale = () => {
  const [locale, setLocale] = useState(
    getAppStore().getState().appContext?.locale || "en-us",
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = getAppStore().subscribe(() => {
      const currentLocale = getAppStore().getState().appContext?.locale;
      if (currentLocale && currentLocale !== locale) {
        setLocale(currentLocale);
      }
    });
    return () => unsubscribe();
  }, [locale]);

  const setAppLocale = (newLocale, baseUrl) => {
    const url = new URL(window.location.href);
    const currentLocale = url.searchParams.get("locale") || "en-us";

    if (currentLocale === newLocale) {
      return;
    }

    const localeParam =
      newLocale !== "el"
        ? `?page=Home&locale=${newLocale}`
        : `?page=Αρχική&locale=${newLocale}`;
    window.location.href = baseUrl + localeParam;
  };

  return { locale, setAppLocale };
};

export const useBreakpoint = (minPx = 768) => {
  const getMatch = () =>
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${minPx}px)`).matches
      : false;

  const [isUp, setIsUp] = useState(getMatch);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(min-width: ${minPx}px)`);
    const onChange = (e) => setIsUp(e.matches);

    // set once in case minPx changed
    setIsUp(mql.matches);

    // modern + legacy listeners
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [minPx]);

  return isUp; // boolean
};
