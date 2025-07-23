const indexes = [
    {
        id: 1,
        label: "Μέση θερμοκρασία (°C) - TG",
        value: "tmean",
        has_seasonal_data: true,
        unit: '°C',
        index: 'TG',
        precision: 3
    },
    {
        id: 2,
        label: "Μέση ελάχιστη θερμοκρασία (°C) - TN",
        value: "tmin",
        unit: '°C',
        index: 'TN',
        precision: 3
    },
    {
        id: 3,
        label: "Μέση μέγιστη θερμοκρασία (°C) - TX",
        value: "tmax",
        unit: '°C',
        index: 'TX',
        precision: 3
    },
    {
        id: 4,
        label: "Αριθμός ημερών με TX > 30°C - θερμές ημέρες",
        value: "hot30",
        unit: 'ημέρες',
        index: 'TX > 30°C',
        precision: 1
    },
    {
        id: 5,
        label: "Αριθμός ημερών με TX > 35°C - πολύ θερμές ημέρες",
        value: "hot35",
        unit: 'ημέρες',
        index: 'TX > 35°C',
        precision: 1
    },
    {
        id: 6,
        label: "Αριθμός ημερών με TN > 20°C - τροπικές νύχτες",
        value: "tr20",
        unit: 'ημέρες',
        index: 'TN > 20°C',
        precision: 1
    },
    {
        id: 7,
        label: "Αριθμός ημερών με TN < 0°C - νυχτερινός παγετός",
        value: "FN",
        unit: 'ημέρες',
        index: 'TN < 0°C',
        precision: 1
    },
    {
        id: 8,
        label: "Αριθμός ημερών με ισχυρές ανάγκες για θέρμανση (ημέρες με TG<10 °C)",
        value: "HeatingDD",
        unit: 'ημέρες',
        index: 'TG  <10 °C',
        precision: 1
    },
    {
        id: 9,
        label: "Αριθμός ημερών με ισχυρές ανάγκες για ψύξη (ημέρες με TG>30 °C)",
        value: "CoolingDD",
        unit: 'ημέρες',
        index: 'TG > 30 °C',
        precision: 1
    },
    {
        id: 10,
        label: "Ολική βροχόπτωση (mm) - PR",
        value: "PR_GR_3racmo",
        has_seasonal_data: true,
        unit: 'mm',
        index: 'PR',
        precision: 3
    },
    {
        id: 11,
        label: "Μέγιστη διάρκεια διαδοχικών ημερών με PR < 1mm - μέγιστη διάρκεια ξηρασίας σε ημέρες",
        value: "dryspel",
        unit: 'ημέρες',
        index: 'PR < 1mm',
        precision: 1
    },
    {
        id: 12,
        label: "Αριθμός ημερών με PR > 10mm - ημέρες ισχυρής βροχόπτωσης",
        value: "pr10_3racmo",
        unit: 'ημέρες',
        index: 'PR > 10mm',
        precision: 1
    },
    {
        id: 13,
        label: "Αριθμός ημερών PR > 20mm - ημέρες πολύ ισχυρής βροχόπτωσης",
        value: "pr20_3racmo",
        unit: 'ημέρες',
        index: 'PR > 20mm',
        precision: 1
    },
    {
        id: 14,
        label: "Αριθμός ημερών με PR > 1mm - ημέρες βροχόπτωσης",
        value: "wetdays",
        unit: 'ημέρες',
        index: 'PR > 1mm',
        precision: 1
    },
    {
        id: 15,
        label: "Αριθμός ημερών με PR < 1mm - ημέρες χωρίς βροχόπτωση",
        value: "drydays",
        unit: 'ημέρες',
        index: 'PR < 1mm',
        precision: 1
    },
    {
        id: 16,
        label: "Μέση σχετική υγρασία - RH (%)",
        value: "RH",
        unit: '%',
        index: 'RH',
        precision: 3
    },
    {
        id: 17,
        label: "Μέση ταχύτητα ανέμου (m/sec)",
        value: "wind",
        has_seasonal_data: true,
        unit: 'm/sec',
        index: 'Wind',
        precision: 3
    },
    {
        id: 18,
        label: "Αριθμός ημερών με δείκτη δυσφορίας (Humidex) >38 ºC",
        value: "Humidex38",
        unit: 'ημέρες',
        index: '(Humidex) >38 ºC',
        precision: 1
    },
    {
        id: 19,
        label: "Αριθμός ημερών με δείκτη δυσφορίας (Humidex) >40 ºC",
        value: "Humidex40",
        unit: 'ημέρες',
        index: '(Humidex) >40 ºC',
        precision: 1
    },
    {
        id: 20,
        label: "Αριθμός ημερών με δείκτη δυσφορίας (humidex) > 46°C",
        value: "Humidex46",
        unit: 'ημέρες',
        index: '(Humidex) >46 ºC',
        precision: 1
    },
    {
        id: 21,
        label: "Μέσος δείκτης κινδύνου δασικής πυρκαγιάς -FWI αντιπυρικής περιόδου (Μάιος- Οκτώβριος)",
        value: "fwi_fireseason",
        unit: '',
        index: 'FWI',
        precision: 3
    },
    {
        id: 22,
        label: "Αριθμός ημερών με ακραίο κίνδυνο εκδήλωσης δασικής πυρκαγιάς (FWI > 50)",
        value: "fwi50",
        unit: 'ημέρες',
        index: 'FWI > 50',
        precision: 1
    },
    {
        id: 23,
        label: "Μέση ετήσια εισερχόμενη μικρού μήκους κύματος ακτινοβολία (Watt/m2)",
        value: "Rsdss_YEAR",
        unit: 'm2',
        index: 'Watt',
        precision: 3
    },
    {
        id: 24,
        label: "Μέσo ετήσιo κλάσμα νεφοκάλυψης (%)",
        value: "Cl_Cov_YEAR",
        unit: '% - έτος',
        index: 'CL COV',
        precision: 3
    }
];


export default indexes
