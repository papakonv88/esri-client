import { getAppStore } from "jimu-core";

export const getWidgetIdByLabel = (label: string): string | null => {
  const appConfig = getAppStore().getState().appConfig;

  if (!appConfig || !appConfig.widgets) return null;

  const entry = Object.entries(appConfig.widgets).find(
    ([, config]) => config.label === label,
  );

  return entry ? entry[0] : null;
};
