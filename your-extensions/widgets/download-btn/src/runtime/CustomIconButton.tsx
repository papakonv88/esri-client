import React from "react";
import { Button } from "jimu-ui";
import { DownloadOutlined } from "jimu-icons/outlined/editor/download";

const CustomIconButton = ({ openLink }) => {
  return (
    <Button
      className="exbmap-ui-tool esri-widget--button"
      title={"Λήψη Δεδομένων"}
      style={{
        width: 32,
        height: 32,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      size="sm"
      icon
      type="default"
      onClick={openLink}
    >
      <DownloadOutlined width={16} height={16} />
    </Button>
  );
};

export default CustomIconButton;
