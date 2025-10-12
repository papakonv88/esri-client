import { React } from "jimu-core";
import { useState } from "react";
import AboutUsTable from "./AboutUsTable";
import { GreekContent } from "./GreekContent";
import { EnglishContent } from "./EnglishContent";

import "./../../index.css";
import { useLocale } from "../../../../shared/hooks";

const Widget = () => {
  const [dataError, setDataError] = useState(false);
  const { locale } = useLocale();

  return (
    <div className="about-wrapper">
      {locale === "el" ? (
        <GreekContent>
          <AboutUsTable locale={locale} />
        </GreekContent>
      ) : (
        <EnglishContent>
          <AboutUsTable locale={locale} />
        </EnglishContent>
      )}
    </div>
  );
};

export default Widget;
