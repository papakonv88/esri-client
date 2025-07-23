import { React } from "jimu-core";
import { Label } from "jimu-ui";

const AboutUsTable = () => {
  const data = [
    {
      institute: "SMHI",
      regionalModel: ["RCA4"],
      globalModel1: ["HadGEM2-ES", "MPI-ESM-LR"],
      globalModel2: ["1.HadGEM2-ES_r1i1p_RCA4", "2.MPI-ESM-LR_r1i1pi_RCA4"],
    },
    {
      institute: "DMI",
      regionalModel: ["HIRHAM5", "CCLM4-817"],
      globalModel1: ["EC-EARTH"],
      globalModel2: [
        "3.EC-EARTH_r3i1p1_HIRHAM5",
        "4.EC-EARTH_r12i1p1_CCLM4-8-17",
      ],
    },
    {
      institute: "KNMI",
      regionalModel: ["RACMO22E"],
      globalModel1: ["CNRM-CM5", "HadGEM2-ES"],
      globalModel2: [
        "5.CNRM-CM5_r1i1p1_RACMO22E",
        "6.HadGEM2-ES_r1i1pi_RACMO22E",
      ],
    },
    {
      institute: "MPI-CSC",
      regionalModel: ["REMO2009"],
      globalModel1: ["MPI-M-MPI-ESM-LR"],
      globalModel2: ["7.MPI-ESM-LR-r1i1pi_REMO2009"],
    },
  ];

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    marginTop: "1rem",
  };

  const cellStyle: React.CSSProperties = {
    border: "1px solid #333",
    padding: "12px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  return (
    <div>
      <Label style={{ fontSize: "18px", fontWeight: "bold" }}>
        Κλιματικά Μοντέλα ανά Ινστιτούτο
      </Label>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Ινστιτούτο</th>
            <th style={cellStyle}>RCM</th>
            <th style={cellStyle}>GCM</th>
            <th style={cellStyle}>GCM - Variant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td style={cellStyle}>{row.institute}</td>
              <td style={cellStyle}>
                {row.regionalModel.map((model, i) => (
                  <div key={i}>{model}</div>
                ))}
              </td>
              <td style={cellStyle}>
                {row.globalModel1.map((model, i) => (
                  <div key={i}>{model}</div>
                ))}
              </td>
              <td style={cellStyle}>
                {row.globalModel2.map((model, i) => (
                  <div key={i}>{model}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AboutUsTable;
