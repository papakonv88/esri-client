import { React } from "jimu-core";

export const EnglishContent = ({ children }) => (
  <div className="container">
    <h1 className="about-title">About</h1>

    <p>
      In the framework of the project{" "}
      <a
        className="about-link"
        href="https://www.adaptivegreece.gr/en-us/"
        target="_blank"
        rel="noreferrer"
      >
        LIFE-IP AdaptInGR - Boosting the implementation of adaptation policy
        across Greece - LIFE17 IPC/GR/000006
      </a>{" "}
      and the implementation of the digital information hub for Climate Change
      adaptation, the development of a geospatial data visualization tool has
      been required.
    </p>

    <p>
      This web-based spatial tool presents the results of Climate Change
      projection models in a simple and easily understandable way, by utilizing
      maps and charts, aiming to boost the understanding of Climate Change
      impacts and their analysis, as well as to support the design of adaptation
      policies and measures.
    </p>

    <p>
      This climate data have been calculated for two periods in the future:{" "}
      <b>2031–2060</b> (near future) and <b>2071–2100</b> (distant future). The
      Reference Period (current situation) spans the years <b>1971–2000</b>.
    </p>

    <p>
      These future climate projections are based on three Greenhouse Gases
      Emissions scenarios (Representative Concentration Pathways – RCPs),
      developed by IPCC:
    </p>

    <ul className="about-list">
      <li>
        The Very Stringent scenario of mitigation (<b>RCP 2.6</b>),
      </li>
      <li>
        The Intermediate scenario (<b>RCP 4.5</b>), and The Extreme one, with
        very high GHG emissions (<b>RCP 8.5</b>).
      </li>
    </ul>

    <p>
      In case of no additional mitigation measures, the scenario <b>RCP 8.5</b>{" "}
      will occur, while under <b>RCP 2.6</b>, the temperature increase is
      expected to remain below 2&nbsp;°C in comparison to the pre-industrial
      levels.
    </p>

    <p>
      <b>More Specifically:</b>
    </p>
    <ul className="about-list">
      <li>
        Scenario <b>RCP 2.6</b> assumes that the maximum global GHG emissions
        occurred during the previous decade (2010–2020), and a significant
        decrease will follow.
      </li>
      <li>
        According to scenario <b>RCP 4.5</b>, GHG emissions will increase until
        about 2040, and they will decrease thereafter.
      </li>
      <li>
        Finally, according to scenario <b>RCP 8.5</b>, the global GHG emissions
        will continue to increase throughout the 21st century.
      </li>
    </ul>

    <hr className="about-hr" />

    <p>
      The National Observatory of Athens, in collaboration with the Academy of
      Athens (as project partners), produced the climate projections based on
      the ensemble mean of <b>7 selected pairs</b> of cutting-edge Global
      Climate Models (GCMs) and Regional Climate Models (RCMs) developed within
      the{" "}
      <a
        className="about-link"
        href="https://www.euro-cordex.net/"
        target="_blank"
        rel="noreferrer"
      >
        EURO-CORDEX
      </a>{" "}
      framework. These datasets are available via the Copernicus Climate Data
      Store (CDS) of the Copernicus Climate Change Service (C3S) with a
      horizontal resolution of approximately <b>0.11°</b>. The spatial
      resolution of the maps that were produced based on these estimations is{" "}
      <b>500&nbsp;m</b> and was achieved by applying spatial interpolation
      methods to the raw model data. The results of the models are presented by
      the tool both as absolute values and as differences from the current
      situation.
    </p>

    <hr className="about-hr" />

    <p className="mb-5">
      <b>
        The GCM/RCM pairs that were used are presented in the following table:
      </b>
    </p>

    <div className={"table-container"}>{children}</div>

    <hr className="about-hr" />

    <p className="mb-5">
      <b>
        The indicators for which climate projections have been calculated, and
        which regard the climatic mean value of the corresponding 30-year
        period, are the following:
      </b>
    </p>

    <ol className="about-list">
      <li>Mean annual temperature (°C) – TG</li>
      <li>Mean annual minimum temperature (°C) – TN</li>
      <li>Mean annual maximum temperature (°C) – TX</li>
      <li>Number of days per year with TX &gt; 30&nbsp;°C – hot days</li>
      <li>Number of days per year with TX &gt; 35&nbsp;°C – very hot days</li>
      <li>Number of days per year with TN &gt; 20&nbsp;°C – tropical nights</li>
      <li>Number of days per year with TN &lt; 0&nbsp;°C – nighttime frost</li>
      <li>
        Number of days per year with TG &lt; 10&nbsp;°C – strong heating needs
      </li>
      <li>
        Number of days per year with TG &gt; 30&nbsp;°C – strong cooling needs
      </li>
      <li>Total annual precipitation (mm) – PR *</li>
      <li>
        Maximum number of consecutive days per year with PR &lt; 1&nbsp;mm –
        maximum dry-spell duration (days)
      </li>
      <li>
        Number of days per year with PR &gt; 10&nbsp;mm – days with heavy
        rainfall *
      </li>
      <li>
        Number of days per year with PR &gt; 20&nbsp;mm – days with very heavy
        rainfall *
      </li>
      <li>
        Number of days per year with PR &gt; 1&nbsp;mm – days with rainfall *
      </li>
      <li>
        Number of days per year with PR &lt; 1&nbsp;mm – days without rainfall *
      </li>
      <li>Mean annual relative humidity – RH (%)</li>
      <li>Mean annual wind velocity (m/sec)</li>
      <li>Mean annual percentage of cloud cover (%)</li>
      <li>Mean annual received short-wave radiation (W/m²)</li>
      <li>
        Number of days per year with discomfort index (Humidex) &gt; 38&nbsp;°C
      </li>
      <li>
        Number of days per year with discomfort index (Humidex) &gt; 40&nbsp;°C
      </li>
      <li>
        Number of days per year with discomfort index (Humidex) &gt; 46&nbsp;°C
      </li>
      <li>
        Mean Forest Fire Weather Index (FWI) during the fire season
        (May–October)
      </li>
      <li>
        Number of days per year with extreme forest fire risk (FWI &gt; 50)
      </li>
        <li>
            Maximum 24h precipitation (mm)
        </li>
        <li>
            Maximum 48h precipitation (mm)
        </li>
    </ol>

    <p>
      * Please, note that Indicators 10, 12, 13, 14 and 15 include all types of
      precipitation.
    </p>

    <hr className="about-hr" />

    <p>
      Beyond the annual data listed above, the indicators of mean temperature
      (1), precipitation (10) and wind velocity (17) are also provided
      seasonally (winter, spring, summer, autumn).
      <br />
      Furthermore, the changes per 5-year periods of the indicators “mean
      precipitation” and “mean temperature” for all prefecture capitals were
      calculated. These time series are presented both for the current period
      (blue line) and for future periods (up to 2100), using the GHG emissions
      scenarios (RCP 2.6, RCP 4.5, RCP 8.5) with green, yellow, and red lines
      correspondingly.
    </p>
  </div>
);
