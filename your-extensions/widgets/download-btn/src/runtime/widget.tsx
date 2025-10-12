import { React } from "jimu-core";
import CustomIconButton from "./CustomIconButton";
import {useActiveLayer, useLocale} from "./../../../../shared/hooks/index";

const Widget = () => {
  const { useState } = React;
  const { activeLayer, layerDetails } = useActiveLayer();
  const {locale} = useLocale();
  
  const openLink = () => {
    const url = locale === 'el' ? `https://adaptivegreecehub.gr/download-content/?layer=geonode:${activeLayer}` : `https://adaptivegreecehub.gr/en/download-gis-data/?layer=geonode:${activeLayer}`
    window.open(
      url,
      "_blank",
    );
  };

  return (
    <div className="exbmap-ui">
      <CustomIconButton locale={locale} openLink={openLink} />
    </div>
  );
};

export default Widget;
