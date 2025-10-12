import { React } from "jimu-core";
import { useEffect, useRef, useState, useMemo } from "react";
import { Icon, Button } from "jimu-ui";
import UpOutlined from "jimu-icons/svg/outlined/directional/up.svg";
import DownOutlined from "jimu-icons/svg/outlined/directional/down.svg";
import { formatResult } from "./utils";
import "./../../index.css";

const CustomPopup = ({
  payload,
  view,
  closePopup,
  activeLayer,
  details,
  handleDisableHover,
  locale,
}) => {
  const [screenPoint, setScreenPoint] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const popupRef = useRef(null);
  const [popupHeight, setPopupHeight] = useState(0);

  const updatePosition = () => {
    if (!view || !payload?.mapPoint) return;
    const sp = view.toScreen(payload.mapPoint);
    setScreenPoint(sp);
  };

  const toggle = () => setExpanded((prev) => !prev);

  useEffect(() => {
    if (!view || !payload?.mapPoint) return;

    const update = () => {
      const sp = view.toScreen(payload.mapPoint);
      setScreenPoint(sp);
    };

    update();

    const handleViewpoint = view.watch("viewpoint", update);

    return () => {
      handleViewpoint?.remove();
    };
  }, [view, payload?.mapPoint]);

  useEffect(() => {
    if (popupRef.current) {
      setPopupHeight(popupRef.current.offsetHeight || 0);
    }
  }, [screenPoint]);

  const activeIndex = useMemo(() => {
    if (!payload?.results) return "-";
    const res = payload.results.find((item) => item.layer === activeLayer);
    const resFinal = res?.result ? res.result : "-";
    return formatResult(resFinal, details, locale);
  }, [activeLayer]);

  const payloadValues = useMemo(() => {
    const allowedTypes = ["lat", "lon", "X", "Y"];
    const naturaTypes = ["Natura 2000"];
    const payloadCoords = payload.results.filter((item) =>
      allowedTypes.includes(item.layer),
    );
    const payloadRest = payload.results.filter(
      (item) =>
        !allowedTypes.includes(item.layer) && !naturaTypes.includes(item.layer),
    );
    const payloadNatura = payload.results.filter((item) =>
      naturaTypes.includes(item.layer),
    );
    return { payloadCoords, payloadRest, payloadNatura };
  }, []);

  if (!payload || !screenPoint) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: `calc(100% - ${screenPoint.y - 10}px)`,
        left: screenPoint.x,
        transform: "translate(-50%, 0)",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <div
        ref={popupRef}
        onMouseEnter={() => handleDisableHover(true)}
        onMouseLeave={() => handleDisableHover(false)}
        className="esri-features esri-widget esri-widget--panel popup-container"
      >
        <div className={"popup-anchor"} />
        <button
          onClick={() => closePopup(payload.id)}
          className={"popup-close-button"}
        >
          ×
        </button>

        <div style={{ padding: "20px 10px 10px 10px" }}>
          <div className={"row-container"}>
            <div style={{ marginBottom: "5px" }}>
              <strong>{activeIndex}</strong>
            </div>
            <div>
              <Button
                icon
                size="sm"
                variant="text"
                onClick={toggle}
                title={expanded ? "Collapse" : "Expand"}
                aria-label="Toggle"
              >
                <Icon icon={expanded ? UpOutlined : DownOutlined} />
              </Button>
            </div>
          </div>

          {expanded && (
            <div>
              <div className={"container-popup"}>
                {payloadValues.payloadRest.map((item, idx) => {
                  if (item.layer !== activeLayer) {
                    return (
                      <div key={idx} className={"row-popup"}>
                        {item.result}
                      </div>
                    );
                  }
                })}
              </div>
              <div className={"container-popup"}>
                {payloadValues.payloadNatura.map((item, idx) => {
                  if (item.layer !== activeLayer) {
                    return (
                      <div key={idx} className={"row-popup"}>
                        {item.result}
                      </div>
                    );
                  }
                })}
              </div>
              <div className={"container-popup"}>
                {payloadValues.payloadCoords.map((item, idx) => {
                  if (item.layer !== activeLayer) {
                    return (
                      <div key={idx} className={"row-popup"}>
                        {item.result}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
