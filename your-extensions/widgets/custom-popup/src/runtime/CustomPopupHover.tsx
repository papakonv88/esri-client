import { React } from "jimu-core";
import "./../../index.css";

const CustomPopupHover = ({ value, point, precision }) => {
  if (typeof value !== "number" && isNaN(value)) {
    return;
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: `calc(100% - ${point.y - 10}px)`,
        left: point.x,
        transform: "translate(-50%, 0)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div className="esri-features esri-widget esri-widget--panel popup-container-hover">
        <div className={"popup-anchor"} />
        <div className={"row-container"}>
          <div style={{ marginBottom: "5px" }}>
            <strong>{Number(value).toFixed(precision)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPopupHover;
