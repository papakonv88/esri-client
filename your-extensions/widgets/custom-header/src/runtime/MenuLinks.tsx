import { Link } from "jimu-ui";
import { React } from "jimu-core";
import { useLocale } from "./../../../../shared/hooks";
import "./../../index.css";
import { links } from "./links";
const MenuLinks = ({ getPageUrl, currentLinks}) => {

  return (
    <div className="menu-navigation jimu-nav">
      {currentLinks.map((link) => (
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
  );
};

export default MenuLinks;
