import Point from "esri/geometry/Point";
import projection from "esri/geometry/projection";
import SpatialReference from "esri/geometry/SpatialReference";
import Query from "@arcgis/core/rest/support/Query";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import axios from "axios";

export const getPixelValue = async (view, mapPoint, layer) => {
  try {
    await projection.load();
    const webMercatorPoint = mapPoint.clone();
    const point = new Point({
      x: webMercatorPoint.longitude,
      y: webMercatorPoint.latitude,
      spatialReference: { wkid: 4326 },
    });

    const projectedExtent = await projection.project(
      view.extent,
      new SpatialReference({ wkid: 2100 }),
    );

    const layerPoint = await projection.project(
      point,
      new SpatialReference({ wkid: 2100 }),
    );

    const extent = view.extent;
    const mapExtent = `${extent.xmin},${extent.ymin},${extent.xmax},${extent.ymax}`;

    const width = view.width;
    const height = view.height;
    const dpi = 96;
    const imageDisplay = `${width},${height},${dpi}`;

    const baseUrl = `https://geohub.necca.gov.gr/server/rest/services/AdaptiveGreece/${layer}/MapServer/identify`;

    const params = {
      returnFieldName: true,
      returnGeometry: true,
      returnUnformattedValues: true,
      returnZ: false,
      tolerance: 3,
      imageDisplay: imageDisplay,
      geometry: JSON.stringify({ x: layerPoint.x, y: layerPoint.y }),
      geometryType: "esriGeometryPoint",
      mapExtent: mapExtent,
      sr: 2100,
      f: "pjson",
    };
    const response = await axios.get(baseUrl, { params });
    if (response) {
      return response.data?.results[0]?.attributes?.["Stretch.Pixel Value"] !==
        "NoData"
        ? response.data?.results[0]?.attributes?.["Stretch.Pixel Value"]
        : "-";
    }
  } catch (error) {
    throw error;
  }
};

export const getFeatureValue = async (layer, event) => {
  const { url, alias, attribute } = layer;
  const featureLayer = new FeatureLayer({ url });
  const query = new Query();
  query.geometry = event.mapPoint;
  query.spatialRelationship = "intersects";
  query.outFields = attribute;
  query.returnGeometry = false;

  try {
    let obj = { title: alias };
    const result = await featureLayer.queryFeatures(query);
    if (alias === "Natura 2000" && result?.features.length > 1) {
      const items = result?.features?.map((row) => row?.attributes[attribute]);
      return items;
    } else {
      return result?.features[0]?.attributes?.[attribute]
        ? result?.features[0]?.attributes?.[attribute]
        : "-";
    }
  } catch (error) {
    throw error;
  }
};

export const formatResult = (result, details, locale) => {
  if (result !== "-") {
    return `${details.index}\u2009\u2009\u2009${Number(result).toFixed(
      details.precision,
    )} ${locale === "el" ? details.unit : details.unitEn}`;
  } else {
    return `${details.index}\u2009\u2009\u2009${result}`;
  }
};

export const pointToGrGrid = async (point) => {
  try {
    await projection.load();
    return await projection.project(
      point,
      new SpatialReference({ wkid: 2100 }),
    );
  } catch (error) {
    throw error;
  }
};
