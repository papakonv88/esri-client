import { React, getAppStore, appActions } from "jimu-core";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

const isDraftMode = () =>
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("draft") === "true";

const usesStructuralPageUrl = () => {
  const jimuConfig = (window as any).jimuConfig;
  return !jimuConfig || jimuConfig.useStructuralUrl !== false;
};

export const getAppPageHref = (link, locale) => {
  const localeCode = locale === "el" ? "el" : "en-us";

  if (isDraftMode()) {
    const params = new URLSearchParams(window.location.search);
    const base = window.location.pathname
      .replace(/\/page\/.*$/, "")
      .replace(/\/$/, "");
    const pageSegment = String(link.to || "")
      .replace(/^\/page\//, "")
      .replace(/^\?page=/, "");

    params.set("draft", "true");
    params.set("locale", localeCode);

    if (usesStructuralPageUrl()) {
      params.delete("page");
      return `${window.location.origin}${base}/page/${encodeURIComponent(pageSegment)}?${params.toString()}`;
    }

    params.set("page", pageSegment);
    return `${window.location.origin}${base}?${params.toString()}`;
  }

  return `${process.env.API_URL}${link.prodTo}&locale=${localeCode}`;
};

export const goToAppPage = (link, locale) => {
  window.location.href = getAppPageHref(link, locale);
};

if (typeof window !== "undefined" && !window.location.pathname.includes("/builder")) {
  const params = new URLSearchParams(window.location.search);
  if (!params.get("locale")) {
    const url = new URL(window.location.href);
    if (params.get("draft") === "true") {
      url.searchParams.set("locale", "el");
    } else {
      url.searchParams.set("page", "Αρχική");
      url.searchParams.set("locale", "el");
    }
    window.location.replace(url.toString());
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

  const setAppLocale = (newLocale, baseUrl) => {
    const url = new URL(window.location.href);
    const currentLocale = url.searchParams.get("locale") || "el";

    if (currentLocale === newLocale) {
      return;
    }

    if (url.searchParams.get("draft") === "true") {
      const page = newLocale !== "el" ? "Home" : "Αρχική";
      goToAppPage({ to: `/page/${page}`, prodTo: `?page=${page}` }, newLocale);
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
