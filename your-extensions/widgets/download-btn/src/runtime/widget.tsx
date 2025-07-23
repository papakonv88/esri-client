import { React } from "jimu-core";
import CustomIconButton from "./CustomIconButton";
import { useActiveLayer } from "./../../../../shared/hooks/index";

const Widget = () => {
  const { useState } = React;
  const { activeLayer, layerDetails } = useActiveLayer();

  const openLink = () => {
    window.open(
      `https://adaptivegreecehub.gr/download-content/?layer=geonode:${activeLayer}`,
      "_blank",
    );
  };

  return (
    <div className="exbmap-ui">
      <CustomIconButton openLink={openLink} />
    </div>
  );
};

export default Widget;
