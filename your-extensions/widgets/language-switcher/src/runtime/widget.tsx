import { React } from "jimu-core";
import enFlag from "./../../assets/en.png";
import grFlag from "./../../assets/gr.png";
import "./../../index.css";
import { useLocale } from "../../../../shared/hooks/index";

const Widget = () => {
    const { locale, setAppLocale } = useLocale();
    console.log(locale, 'locale')

    return (
        <div className="language-switchers">
            <div
                className={`switcher ${locale === "el" ? "switcher-active" : ""}`}
                id="switcher-el"
            >
                <a
                    href="#"
                    title="Ελληνικά"
                    onClick={(e) => {
                        e.preventDefault();
                        setAppLocale("el");
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
                className={`switcher ${locale !== "el" ? "switcher-active" : ""}`}
                id="switcher-en"
            >
                <a
                    href="#"
                    title="English"
                    onClick={(e) => {
                        e.preventDefault();
                        setAppLocale("en");
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
