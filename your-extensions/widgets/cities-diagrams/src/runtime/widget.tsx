import { React, AllWidgetProps, IMState } from "jimu-core";
import { useState, useEffect } from "react";
import "./../../index.css";
import DiagramContainer from "./DiagramContainer";
import { useSelector } from "react-redux";
import { getWidgetIdByLabel } from "./../../../../shared/utils/index";
import { useLocale } from "../../../../shared/hooks";

const Widget = (props: AllWidgetProps<any>) => {
  const [dataError, setDataError] = useState(false);
  const [cityTimelineData, setCityTimelineData] = useState(null);
  const parentWidgetLabel = "cities-list";
  const parentWidgetID = getWidgetIdByLabel(parentWidgetLabel);
  const { locale } = useLocale();

  const diagramTypes = ["temp", "rain"];

  const widgetKey = "timelines-widget-key";

  const loadCityTimelineData = async (selectedCity) => {
    try {
      const data = await import(`./timelines/${selectedCity}.json`);
      setCityTimelineData(data.default);
      setDataError(false);
    } catch (err) {
      console.error(err);
      setDataError(true);
    }
  };

  const city = useSelector(
    (state: IMState) => state.widgetsState?.[widgetKey]?.city,
  );

  useEffect(() => {
    if (city?.id) {
      loadCityTimelineData(city.id);
    }
  }, [city]);

  if (dataError) {
    return (
      <section className="timelines--diagrams">
        <h1>
          {locale === "el"
            ? "Σφάλμα κατά την φόρτωση των δεδομένων"
            : "Error while loading data"}
        </h1>
      </section>
    );
  }

  if (!cityTimelineData) {
    return (
      <section className="timelines--diagrams">
        <h1>
          {locale === "el"
            ? "Επιλέξτε μια πόλη για να δείτε τις χρονοσειρές"
            : "Choose a city to see its time series"}
        </h1>
      </section>
    );
  }

  return (
    <section className="timelines--diagrams">
      {diagramTypes.map((type) => (
        <DiagramContainer
          key={type}
          diagramID={`diagram_${type}`}
          type={type}
          data={cityTimelineData[type]}
          filenameToDownload={city?.filename}
          locale={locale}
        />
      ))}
    </section>
  );
};

export default Widget;
