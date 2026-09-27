export const layersConfig = [
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/Natura_2000/MapServer",
    alias: "Δίκτυο Natura 2000",
    attribute: "SITECODE",
    isNatura: true,
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/Dhmoi/MapServer",
    alias: "Δήμοι",
    attribute: "MUNICIPALI",
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/Regions/FeatureServer/0",
    alias: "Περιφέρειες",
    attribute: "LEKTIKO",
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/MDPP/MapServer",
    alias: "Μονάδες Διαχείρισης Προστατευόμενων Περιοχών",
    attribute: "Onomasia",
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/Hosted/mdpp_eng/FeatureServer/0",
    alias: "Protected Area Management Units",
    attribute: "onomasia",
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/Hosted/REGIONS_en_new/FeatureServer/0",
    alias: "Regions",
    attribute: "lektiko",
  },
  {
    url: "https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/DHMOI_en/MapServer",
    alias: "Municipalities",
    attribute: "MUNICIPALI",
  },
];

export const matchLayerConfig = (mapLayerUrl?: string) => {
  if (!mapLayerUrl) return undefined;
  return layersConfig.find(
    (cfg) =>
      mapLayerUrl === cfg.url ||
      mapLayerUrl.startsWith(`${cfg.url}/`) ||
      cfg.url.startsWith(`${mapLayerUrl}/`),
  );
};
