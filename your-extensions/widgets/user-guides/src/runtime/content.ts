export type VideoThumb = "overview" | "map" | "series";

export type GuideVideo = {
  title: string;
  description: string;
  duration: string;
  url: string;
  thumbnail: VideoThumb;
};

export type GuideContent = {
  title: string;
  intro: string;
  guideTitle: string;
  guideName: string;
  guideDescription: string;
  guideFileLabel: string;
  viewGuide: string;
  downloadPdf: string;
  viewUrl: string;
  downloadUrl: string;
  videosTitle: string;
  videosIntro: string;
  watchVideo: string;
  chartLabel: string;
  videos: GuideVideo[];
  helpTitle: string;
  helpBefore: string;
  helpLink: string;
  helpAfter: string;
  helpButton: string;
  faqPage: string;
};

const greek: GuideContent = {
  title: "Οδηγίες Χρήσης",
  intro:
    "Μάθετε πώς να αξιοποιείτε τις δυνατότητες του Γεωχωρικού Εργαλείου του Κόμβου Προσαρμογής στην Κλιματική Αλλαγή. Συμβουλευτείτε τον αναλυτικό Οδηγό Χρήσης ή παρακολουθήστε τα διαθέσιμα βίντεο εκμάθησης για τη χρήση των βασικών λειτουργιών του εργαλείου.",
  guideTitle: "Οδηγός Χρήσης",
  guideName: "Οδηγός Χρήσης Γεωχωρικού Εργαλείου",
  guideDescription:
    "Αναλυτικές οδηγίες για την πλοήγηση και τη χρήση του Γεωχωρικού Εργαλείου, την επιλογή και απεικόνιση κλιματικών δεδομένων, τη χρήση των διαθέσιμων λειτουργιών του χάρτη, την προβολή χρονοσειρών και τη λήψη δεδομένων.",
  guideFileLabel: "PDF οδηγός",
  viewGuide: "Προβολή Οδηγού",
  downloadPdf: "Λήψη PDF",
  viewUrl: "",
  downloadUrl: "",
  videosTitle: "Βίντεο Εκμάθησης",
  videosIntro:
    "Παρακολουθήστε σύντομα βίντεο με οδηγίες και πρακτικά παραδείγματα για τη χρήση του Γεωχωρικού Εργαλείου. Ξεκινήστε με τη γενική παρουσίαση του εργαλείου και συνεχίστε με τα επιμέρους βίντεο ανά λειτουργία.",
  watchVideo: "Παρακολούθηση βίντεο",
  chartLabel: "Χρονοσειρές",
  videos: [
    {
      title: "Γνωριμία με το Γεωχωρικό Εργαλείο",
      description:
        "Μια σύντομη παρουσίαση του Γεωχωρικού Εργαλείου και των βασικών επιλογών πλοήγησης και χρήσης του.",
      duration: "03:20",
      url: "",
      thumbnail: "overview",
    },
    {
      title: "Πλοήγηση στον χάρτη και βασικές λειτουργίες",
      description:
        "Προβολή χαρτών, επιλογές χάρτη και βασικά εργαλεία διερεύνησης.",
      duration: "04:10",
      url: "",
      thumbnail: "map",
    },
    {
      title: "Χρονοσειρές και λήψη δεδομένων",
      description:
        "Αναζήτηση περιοχής, προβολή χρονοσειρών και λήψη διαθέσιμων δεδομένων.",
      duration: "04:45",
      url: "",
      thumbnail: "series",
    },
  ],
  helpTitle: "Έχετε κάποια απορία;",
  helpBefore: "Δείτε τις ",
  helpLink: "Συχνές Ερωτήσεις",
  helpAfter:
    " για απαντήσεις σε συνήθη ζητήματα σχετικά με τη λειτουργία και τη χρήση του Γεωχωρικού Εργαλείου.",
  helpButton: "Δείτε τις Συχνές Ερωτήσεις",
  faqPage: "Συχνές-Ερωτήσεις",
};

const english: GuideContent = {
  title: "User Guides",
  intro:
    "Learn how to make use of the features of the Geospatial Tool of the Greek Climate Change Adaptation Hub. Consult the detailed User Guide or watch the available video tutorials to learn how to use the tool’s main features.",
  guideTitle: "User Guide",
  guideName: "Geospatial Tool User Guide",
  guideDescription:
    "Detailed guidance on navigating and using the Geospatial Tool, selecting and visualising climate data, using the available map features, viewing time series and downloading data.",
  guideFileLabel: "PDF guide",
  viewGuide: "View Guide",
  downloadPdf: "Download PDF",
  viewUrl: "",
  downloadUrl: "",
  videosTitle: "Video Tutorials",
  videosIntro:
    "Watch short videos with guidance and practical examples on how to use the Geospatial Tool. Start with the general overview of the tool and continue with the tutorials focusing on specific features.",
  watchVideo: "Watch Video",
  chartLabel: "Time series",
  videos: [
    {
      title: "Getting Started with the Geospatial Tool",
      description:
        "A short introduction to the Geospatial Tool and its main navigation and user features.",
      duration: "03:20",
      url: "",
      thumbnail: "overview",
    },
    {
      title: "Map navigation and basic functions",
      description: "Viewing maps, map options, and basic exploration tools.",
      duration: "04:10",
      url: "",
      thumbnail: "map",
    },
    {
      title: "Time series and data download",
      description:
        "Searching for an area, viewing time series, and downloading available data.",
      duration: "04:45",
      url: "",
      thumbnail: "series",
    },
  ],
  helpTitle: "Have a question?",
  helpBefore: "Visit the ",
  helpLink: "Frequently Asked Questions",
  helpAfter:
    " for answers to common questions about the operation and use of the Geospatial Tool.",
  helpButton: "View Frequently Asked Questions",
  faqPage: "FAQs",
};

export const getGuideContent = (locale: string): GuideContent =>
  locale === "el" ? greek : english;
