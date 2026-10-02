import { React, getAppStore, appActions } from "jimu-core";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

const isInsideBuilder = () => {
  if (window.location.pathname.includes("/builder")) {
    return true;
  }
  try {
    return window.parent !== window && window.parent.location.pathname.includes("/builder");
  } catch (e) {
    return false;
  }
};

const usesStructuralPageUrl = () =>
  typeof window !== "undefined" && window.jimuConfig && window.jimuConfig.useStructuralUrl;

export const goToAppPage = (link, locale) => {
  const localeCode = locale === "el" ? "el" : "en-us";
  if (usesStructuralPageUrl()) {
    const base = window.location.pathname.replace(/\/page\/.*$/, "").replace(/\/$/, "");
    const pageSegment = String(link.to || "").replace(/^\/page\//, "");
    window.location.href = `${base}/page/${encodeURIComponent(pageSegment)}?locale=${localeCode}`;
    return;
  }
  window.location.href = `${process.env.API_URL}${link.prodTo}&locale=${localeCode}`;
};

if (typeof window !== "undefined" && !isInsideBuilder()) {
  const params = new URLSearchParams(window.location.search);
  if (!params.get("locale")) {
    const url = new URL(window.location.href);
    if (usesStructuralPageUrl() || url.searchParams.get("page")) {
      url.searchParams.set("locale", "el");
      window.location.replace(url.pathname + url.search);
    } else {
      window.location.replace(`${url.pathname}?page=${encodeURIComponent("Αρχική")}&locale=el`);
    }
  }
}

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
    getAppStore().getState().appContext?.locale || "el",
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

  const setAppLocale = (newLocale) => {
    const url = new URL(window.location.href);
    const currentLocale = url.searchParams.get("locale") || "el";

    if (currentLocale === newLocale) {
      return;
    }

    const page = newLocale !== "el" ? "Home" : "Αρχική";
    goToAppPage({ to: `/page/${page}`, prodTo: `?page=${page}` }, newLocale);
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
