import { React, getAppStore } from "jimu-core";
import { useState, useEffect } from "react";
import enFlag from "./../../assets/en.png";
import grFlag from "./../../assets/gr.png";
import "./../../index.css";

const Widget = () => {
  const [locale, setLocale] = useState(
    getAppStore().getState().appContext.locale,
  );
  const [localeComp, setLocaleComp] = useState("el");

  useEffect(() => {
    const unsubscribe = getAppStore().subscribe(() => {
      const currentLocale = getAppStore().getState().appContext.locale;
   //   console.log(currentLocale, "locale");
      setLocale(currentLocale);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const setLanguage = (locale: string) => {
    setLocaleComp(locale);
    getAppStore().dispatch({
      type: "APP_LOCALE_CHANGED",
      locale,
    });
  };
  return (
    <div className="language-switchers">
      <div
        className={`switcher ${localeComp === "el" ? "switcher-active" : ""}`}
        id="switcher-el"
      >
        <a
          href="#"
          title="Ελληνικά"
          onClick={(e) => {
            e.preventDefault();
            setLanguage("el");
          }}
        >
          <img
            loading="lazy"
            src={grFlag}
            alt="gr-flag"
            style={{ width: "36px", height: "24px", border: "1px solid #ccc" }}
          />
        </a>
      </div>

      <div
        className={`switcher ${localeComp === "en" ? "switcher-active" : ""}`}
        id="switcher-en"
      >
        <a
          href="#"
          title="English"
          onClick={(e) => {
            e.preventDefault();
            setLanguage("en");
          }}
        >
          <img
            loading="lazy"
            src={enFlag}
            alt="us-flag"
            style={{ width: "36px", height: "24px", border: "1px solid #ccc" }}
          />
        </a>
      </div>
    </div>
  );
};

export default Widget;
