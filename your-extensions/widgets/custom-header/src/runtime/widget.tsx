import { React, jsx } from "jimu-core";
import { Link, Image } from "jimu-ui";
import ReactDOM from "react-dom";
import { useBreakpoint, useLocale } from "../../../../shared/hooks";
import logo from "./../assets/adaptive-logo.png";
import "./../../index.css";
import MenuLinks from "./MenuLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import BurgerMenu from "./BurgerMenu";
import { useMemo, useState } from "react";
import { links } from "./links.ts";

const menuPortal = document.querySelector('[data-testid="pageRenderer"]');

const Widget = () => {
  const { locale, setAppLocale } = useLocale();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const isUp = useBreakpoint(1080);

  const getPageUrl = (link): string => {
    window.location.href =
      process.env.API_URL +
      `${link.prodTo}&locale=${locale === "el" ? "el" : "en-us"}`;
  };

  const currentLinks = useMemo(() => {
    return locale?.toLowerCase() === "el" ? links.el : links.en;
  }, [locale]);

  const handleIsBurgerOpen = () => setIsBurgerOpen((prev) => !prev);

  const handleChangeLocale = (newLocale: string) => {
    setAppLocale(newLocale, process.env.API_URL);
  };

  const logoHeight = useMemo(() => {
    if (isUp) {
      return "73px";
    } else {
      return "60px";
    }
  }, [isUp]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className={"header-container"}>
        <div className={"logo-wrapper"}>
          <Link href="https://adaptivegreecehub.gr/" target="_blank">
            <Image src={logo} style={{ height: logoHeight, width: "auto" }} />
          </Link>
        </div>
        <MenuLinks getPageUrl={getPageUrl} currentLinks={currentLinks} />
        <LanguageSwitcher
          locale={locale}
          handleChangeLocale={handleChangeLocale}
        />
        {menuPortal &&
          ReactDOM.createPortal(
            <BurgerMenu
              handleIsBurgerOpen={handleIsBurgerOpen}
              isOpen={isBurgerOpen}
              locale={locale}
              currentLinks={currentLinks}
              getPageUrl={getPageUrl}
              handleChangeLocale={handleChangeLocale}
            />,
            menuPortal,
          )}
      </div>
    </div>
  );
};

export default Widget;
