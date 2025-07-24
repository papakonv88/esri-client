import { React, jsx } from "jimu-core";
import { Link, Image } from "jimu-ui";

const Widget = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#68b24f",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "140px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "1rem",
            display: "flex",
            flex: "1.5 1 0%",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "white",
              fontSize: "2rem",
              lineHeight: 1.2,
              textAlign: "left",
              width: "70%",
            }}
          >
            Χάρτης Απεικόνισης Κλιματικών Προβλέψεων
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "white",
            borderTopLeftRadius: "30px",
            borderBottomLeftRadius: "30px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              maxWidth: "50%",
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link href="https://necca.gov.gr/" target="_blank">
              <Image
                src="https://adaptivegreecehub.gr/wp-content/themes/CustomTheme/assets/images/ofypeka-logo-footer.png"
                style={{ maxHeight: "60px", maxWidth: "100%", height: "auto" }}
              />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0.5 1 0%",
              width: "100%",
              maxWidth: "30%",
            }}
          >
            <Link href="https://www.adaptivegreece.gr/el-gr/" target="_blank">
              <Image
                src="https://adaptivegreecehub.gr/wp-content/themes/CustomTheme/assets/images/footer/adaptive-footer-logo.png"
                style={{ maxWidth: "280px", width: "100%" }}
              />
            </Link>
            <Link
              href="https://cinea.ec.europa.eu/programmes/life_en"
              target="_blank"
            >
              <Image
                src="https://adaptivegreecehub.gr/wp-content/themes/CustomTheme/assets/images/eu-life-logo.png"
                style={{ maxWidth: "380px", width: "100%" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
