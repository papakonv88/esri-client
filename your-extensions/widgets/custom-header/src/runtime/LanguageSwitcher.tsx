import { React } from "jimu-core";
import grFlag from "./../assets/gr.png";
import enFlag from "./../assets/en.png";

const LanguageSwitcher = ({ locale, handleChangeLocale }) => {
  return (
    <div className="language-switchers">
      <div
        className={`switcher ${locale !== "el" ? "switcher-active" : ""}`}
        id="switcher-el"
      >
        <a
          href="#"
          title="Ελληνικά"
          onClick={(e) => {
            e.preventDefault();
            handleChangeLocale("el");
          }}
        >
          <img
            loading="lazy"
            src={grFlag}
            alt="gr-flag"
            style={{ width: "30px", height: "16px", border: "1px solid #ccc" }}
          />
        </a>
      </div>
      <div
        className={`switcher ${locale === "el" ? "switcher-active" : ""}`}
        id="switcher-en"
      >
        <a
          href="#"
          title="English"
          onClick={(e) => {
            e.preventDefault();
            handleChangeLocale("en-us");
          }}
        >
          <img
            loading="lazy"
            src={enFlag}
            alt="en-flag"
            style={{ width: "30px", height: "16px", border: "1px solid #ccc" }}
          />
        </a>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
