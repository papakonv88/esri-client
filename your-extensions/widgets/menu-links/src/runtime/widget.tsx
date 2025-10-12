import { React, getAppStore, appActions } from "jimu-core";
import { useLocale } from "./../../../../shared/hooks";
import { Link } from "jimu-ui";
import "./../../index.css";
import { links } from "./links";

const Widget = () => {
  const { locale } = useLocale();

  const getPageUrl = (link: any): string => {
    window.location.href =
      process.env.API_URL +
      `${link.prodTo}&locale=${locale === "el" ? "el" : "en-us"}`;
  };

  const currentLinks = () => {
    return locale?.toLowerCase() === "el" ? links.el : links.en;
  };

  return (
    <div className={"wrapper-menu-links"}>
      <div className="menu-navigation jimu-nav">
        {currentLinks().map((link) => (
          <Link
            onClick={() => getPageUrl(link)}
            key={link.to}
            target="_self"
            className="custom-nav-link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Widget;
