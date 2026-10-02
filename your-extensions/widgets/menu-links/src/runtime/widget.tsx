import { React, getAppStore, appActions } from "jimu-core";
import { useLocale, goToAppPage } from "./../../../../shared/hooks";
import { Link } from "jimu-ui";
import "./../../index.css";
import { links } from "./links";

const Widget = () => {
  const { locale } = useLocale();

  const getPageUrl = (link: any): string => {
    goToAppPage(link, locale);
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
