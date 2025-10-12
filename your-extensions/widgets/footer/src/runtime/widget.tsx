import { React, jsx } from "jimu-core";
import { Link, Image } from "jimu-ui";
import ofypekaLogo from "../../../../shared/assets/ofypeka-logo-footer.png";
import ofypekaEnLogo from "../../../../shared/assets/logo-necca-en.png";
import adaptiveLogo from "../../../../shared/assets/adaptive-footer-logo.png";
import lifeLogo from "../../../../shared/assets/eu-life-logo.png";
import lifeEnLogo from "../../../../shared/assets/fundedByLIFE-en.png";
import { useBreakpoint, useLocale } from "../../../../shared/hooks";
import "./../../index.css";

const Widget = () => {
  const { locale } = useLocale();
  const isUp = useBreakpoint(991);

  return (
    <div className="footer-container">
      {/* Title Block */}
      <div className="footer-title">
        <div className="footer-title-text">
          {locale === "el"
            ? "Χάρτης Κλιματικών Προβολών"
            : "Climate Projections Map"}
        </div>
      </div>

      {/* Logos Block */}
      <div className="footer-logos">
        {!isUp ? (
          <>
            <Link href="https://necca.gov.gr/" target="_blank">
              {locale === "el" ? (
                <Image src={ofypekaLogo} />
              ) : (
                <Image src={ofypekaEnLogo} />
              )}
            </Link>
            <Link href="https://www.adaptivegreece.gr/el-gr/" target="_blank">
              <Image src={adaptiveLogo} />
            </Link>
            <Link
              href="https://cinea.ec.europa.eu/programmes/life_en"
              target="_blank"
            >
              {locale === "el" ? (
                <Image src={lifeLogo} />
              ) : (
                <Image src={lifeEnLogo} />
              )}
            </Link>
          </>
        ) : (
          <>
            <Link href="https://necca.gov.gr/" target="_blank">
              {locale === "el" ? (
                <Image src={ofypekaLogo} />
              ) : (
                <Image src={ofypekaEnLogo} />
              )}
            </Link>
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
                <Image src={adaptiveLogo} />
              </Link>
              <Link
                href="https://cinea.ec.europa.eu/programmes/life_en"
                target="_blank"
              >
                {locale === "el" ? (
                  <Image src={lifeLogo} />
                ) : (
                  <Image src={lifeEnLogo} />
                )}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Widget;
