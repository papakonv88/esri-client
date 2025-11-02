import { React, jsx } from "jimu-core";
import { Link, Image } from "jimu-ui";
import ReactDOM from "react-dom";
import { useBreakpoint, useLocale } from "../../../../shared/hooks";
import logo from "./../assets/adaptive-logo.png";
import "./../../index.css";
import MenuLinks from "./MenuLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import BurgerMenu from "./BurgerMenu";
import { useMemo, useState, useEffect, useRef } from "react";
import { links } from "./links.ts";

const menuPortal = document.querySelector('[data-testid="pageRenderer"]');

const MOBILE_BREAKPOINT = 576; // Match CSS breakpoint

const Widget = () => {
  const { locale, setAppLocale } = useLocale();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const isUp = useBreakpoint(1080);
  const [isMobile, setIsMobile] = useState(false);
  const scrollPositionRef = useRef<number>(0);

  // Detect mobile mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when burger menu is open in mobile mode
  useEffect(() => {
    if (isBurgerOpen && isMobile) {
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;
      // Lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else if (!isBurgerOpen) {
      // Restore scroll only when menu closes
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isBurgerOpen, isMobile]);

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
