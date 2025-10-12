import { React, type AllWidgetProps } from "jimu-core";
import { JimuMapViewComponent, type JimuMapView } from "jimu-arcgis";
import Point from "esri/geometry/Point";
import { appActions } from "jimu-core";
import { TextInput, Label, Button, Scrollable } from "jimu-ui";
import "./../../index.css";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { CloseOutlined } from "jimu-icons/outlined/editor/close";
import { cities } from "./cities";
import { CityButton } from "./CityButton";
import { CloseOutlined } from "../../../../../jimu-icons/outlined/editor/close";
import CustomIconButton from "./CustomIconButton";
import { CloseButton } from "./../../../../shared/components/CloseButton";
import { useLocale, useBreakpoint } from "../../../../shared/hooks";

const Widget = (props: AllWidgetProps<any>) => {
  const { useState } = React;

  const [jimuMapView, setJimuMapView] = useState<JimuMapView>();
  const [inputValue, setInputValue] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const { locale } = useLocale();
  const isUp = useBreakpoint(546);
  const [isOpen, setIsOpen] = useState(isUp ? true : false);

  const { useMapWidgetIds } = props;
  const widgetKey = "timelines-widget-key";

  const dispatch = useDispatch();

  const filteredCities = useMemo(() => {
    return cities.filter((f) => {
      if (locale === "el") {
        return f.name.toLowerCase().includes(inputValue.toLowerCase());
      } else {
        return f.filename.toLowerCase().includes(inputValue.toLowerCase());
      }
    });
  }, [inputValue, cities, locale]);

  const handleCityClick = (e) => {
    const city = e.target;

    setSelectedCity({
      id: city.dataset.id,
      name: city.dataset.name,
      filename: city.dataset.filename,
      lat: city.dataset.lat,
      lng: city.dataset.lng,
    });
  };

  const zoomToLatLon = async (lat, lon) => {
    if (!jimuMapView) return;

    const point = new Point({
      latitude: lat,
      longitude: lon,
      spatialReference: { wkid: 4326 },
    });

    await jimuMapView.view.goTo({
      target: point,
      zoom: 14,
    });
  };

  const handleIsOpen = (bool) => setIsOpen(bool);

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
      setJimuMapView(jmv);
    }
  };

  useEffect(() => {
    if (selectedCity?.lat && selectedCity?.lng) {
      zoomToLatLon(selectedCity.lat, selectedCity.lng);
      handleIsOpen(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity?.filename) {
      dispatch(
        appActions.widgetStatePropChange(widgetKey, "city", selectedCity),
      );
    }
  }, [selectedCity?.filename]);

  useEffect(() => {
    if (!jimuMapView) return;

    const handler = jimuMapView.view.on("click", async (event) => {
      const response = await jimuMapView.view.hitTest(event);
      const result = response.results.find((r) => r.graphic?.layer);

      if (result) {
        const objectId = result.graphic.attributes.OBJECTID;
        const layer = result.graphic.layer as __esri.FeatureLayer;

        const query = layer.createQuery();
        query.objectIds = [objectId];
        query.outFields = ["*"];
        query.returnGeometry = true;

        const resultFull = await layer.queryFeatures(query);
        const feature = resultFull.features[0];

        if (feature?.attributes?.filename) {
          dispatch(
            appActions.widgetStatePropChange(
              widgetKey,
              "city",
              feature.attributes,
            ),
          );
        }

        setSelectedCity(feature.attributes);

        jimuMapView.view.popup.autoOpenEnabled = false;

        await jimuMapView.view.goTo({ target: feature.geometry, zoom: 14 });
      }
    });

    return () => {
      handler.remove();
    };
  }, [jimuMapView]);

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  return (
    <>
      {useMapWidgetIds && useMapWidgetIds.length === 1 ? (
        <JimuMapViewComponent
          useMapWidgetId={useMapWidgetIds?.[0]}
          onActiveViewChange={activeViewChangeHandler}
        />
      ) : null}

      {isOpen ? (
        <div className={"timeline-wrapper"}>
          <CloseButton handleClick={handleIsOpen} />
          <div className="d-flex justify-content-center">
            <Label className="mt-2">
              {locale === "el" ? "Αναζήτηση Πόλης" : "Search City"}
            </Label>
          </div>
          <TextInput
            className="w-100 mb-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={locale === "el" ? "Πληκτρολογήστε..." : "Type..."}
          />

          <Scrollable className={"mt-1 list-wrapper"}>
            <div className={"cities-list"}>
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <CityButton
                    id={city.id}
                    name={city.name}
                    filename={city.filename}
                    lat={city.lat}
                    lng={city.lng}
                    isActive={city.id === selectedCity?.id}
                    clickHandler={handleCityClick}
                    locale={locale}
                  />
                ))
              ) : (
                <p style={{ fontWeight: "bold" }}>
                  {locale === "el" ? "Δεν βρέθηκαν αποτελέσματα" : "No results"}
                </p>
              )}
            </div>
          </Scrollable>
        </div>
      ) : (
        <div className="exbmap-ui">
          <CustomIconButton locale={locale} handleModal={handleIsOpen} />
        </div>
      )}
    </>
  );
};
export default Widget;
