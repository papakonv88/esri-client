import { React } from "jimu-core";
import { useLocale, getAppPageHref } from "../../../../shared/hooks";
import { getGuideContent, GuideVideo } from "./content";
import "./../../index.css";

const openExternal = (url: string) => {
  if (!url) {
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
};

const faqHref = (page: string, locale: string) =>
  getAppPageHref(
    { to: `/page/${page}`, prodTo: `?page=${page}` },
    locale,
  );

const PdfIcon = () => (
  <svg className="guides-pdf-icon" viewBox="0 0 88 104" aria-hidden="true">
    <rect x="8" y="4" width="62" height="80" rx="8" fill="#fff" stroke="#e4e7ea" />
    <path d="M48 4v22h22" fill="#f3f4f6" stroke="#e4e7ea" />
    <rect x="18" y="40" width="34" height="4" rx="2" fill="#d5dbe0" />
    <rect x="18" y="50" width="28" height="4" rx="2" fill="#e4e8eb" />
    <rect x="18" y="60" width="22" height="4" rx="2" fill="#e4e8eb" />
    <rect x="22" y="62" width="58" height="34" rx="6" fill="#e25b4a" />
    <text
      x="51"
      y="84"
      textAnchor="middle"
      fill="#fff"
      fontFamily="Arial, sans-serif"
      fontSize="14"
      fontWeight="700"
    >
      PDF
    </text>
  </svg>
);

const FileGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 1.5h5.2L12.5 4.8V14a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z"
      fill="none"
      stroke="#667078"
      strokeWidth="1.2"
    />
    <path d="M9 1.7V5h3.2" fill="none" stroke="#667078" strokeWidth="1.2" />
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M2.5 3.2c1.4-.7 2.8-.7 4.2 0v9.2c-1.4-.6-2.8-.6-4.2 0V3.2Zm11 0c-1.4-.7-2.8-.7-4.2 0v9.2c1.4-.6 2.8-.6 4.2 0V3.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M8 2.5v7.2M5.2 7.4 8 10.2l2.8-2.8M3.5 12.8h9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M5 3.2v9.6L13 8 5 3.2Z" fill="currentColor" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3 8h9.2M8.8 4.2 12.6 8l-3.8 3.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HelpIcon = () => (
  <svg className="guides-help-icon" viewBox="0 0 46 46" aria-hidden="true">
    <circle cx="23" cy="23" r="22" fill="#e7f5e1" stroke="#68b250" strokeWidth="1.5" />
    <text
      x="23"
      y="30"
      textAnchor="middle"
      fill="#2a6530"
      fontFamily="Arial, sans-serif"
      fontSize="22"
      fontWeight="700"
    >
      ?
    </text>
  </svg>
);

const OverviewThumb = () => (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="320" height="168" fill="#8fd0c2" />
    <path d="M120 20c30 8 48 40 70 48 28 10 60-6 90 8v92H120V20Z" fill="#3e9a78" />
    <path d="M150 70c18 20 10 48 28 62 12 10 40 8 52 22v14H140V78c6-6 8-12 10-8Z" fill="#2f7d62" />
    <rect x="16" y="18" width="118" height="132" rx="8" fill="#fff" />
    <rect x="28" y="32" width="72" height="8" rx="3" fill="#68b250" />
    <rect x="28" y="50" width="94" height="6" rx="3" fill="#d5e8cc" />
    <rect x="28" y="64" width="80" height="6" rx="3" fill="#e7eee4" />
    <rect x="28" y="78" width="88" height="6" rx="3" fill="#e7eee4" />
    <rect x="28" y="100" width="70" height="22" rx="6" fill="#68b250" />
  </svg>
);

const MapThumb = () => (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="320" height="168" fill="#7ec8ea" />
    <path
      d="M70 28c18-8 30 6 48 4 16-2 22-16 40-12 20 4 18 22 34 30 14 8 28-2 42 10 10 8 8 22 2 34-8 16-28 14-40 26-10 10-8 26-24 32-18 6-28-10-44-8-14 2-22 16-38 12-16-4-14-20-28-26-16-8-30 4-40-8-8-10-2-24 6-34 10-12-2-28 2-40 4-10 22-12 40-20Z"
      fill="#3d9a62"
    />
    <path
      d="M118 48c8 2 10 12 18 14 8 2 14-6 22-2 8 4 6 14 2 20-6 8-16 6-22 14-4 6 0 14-8 16-10 2-14-8-22-6-6 2-12 8-18 4-8-4-4-14-10-18-6-6 2-16 6-22 6-8-2-16 4-22 6-4 16 0 28 2Z"
      fill="#2f7d4e"
    />
    <circle cx="168" cy="78" r="16" fill="#fff" />
    <path d="M168 58c-8 0-14 6-14 14 0 10 14 24 14 24s14-14 14-24c0-8-6-14-14-14Zm0 19a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" fill="#e25b4a" />
    <rect x="188" y="96" width="92" height="36" rx="6" fill="#fff" />
    <rect x="198" y="106" width="58" height="5" rx="2" fill="#68b250" />
    <rect x="198" y="116" width="72" height="4" rx="2" fill="#d5e0d8" />
  </svg>
);

const SeriesThumb = ({ label }: { label: string }) => (
  <svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="320" height="168" fill="#6fbee0" />
    <path d="M0 90c40-20 70 10 110 0s70-30 110-10 60 20 100 4v84H0V90Z" fill="#3c9470" />
    <path d="M0 118c50-10 80 16 130 6s80-24 120-8 40 14 70 6v46H0v-50Z" fill="#2c7358" />
    <rect x="36" y="22" width="248" height="112" rx="10" fill="#fff" />
    <text x="52" y="46" fill="#2a6530" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">
      {label}
    </text>
    <polyline
      points="52,108 84,96 112,100 142,78 172,84 202,62 236,70 268,48"
      fill="none"
      stroke="#2f6fbf"
      strokeWidth="3"
    />
    <polyline
      points="52,112 84,108 112,92 142,96 172,74 202,80 236,58 268,66"
      fill="none"
      stroke="#68b250"
      strokeWidth="3"
    />
  </svg>
);

const VideoCard = ({
  video,
  watchLabel,
  chartLabel,
}: {
  video: GuideVideo;
  watchLabel: string;
  chartLabel: string;
}) => {
  return (
    <article className="guides-card guides-video-card">
      <div className="guides-thumb">
        {video.thumbnail === "overview" && <OverviewThumb />}
        {video.thumbnail === "map" && <MapThumb />}
        {video.thumbnail === "series" && <SeriesThumb label={chartLabel} />}
        <button
          type="button"
          className="guides-play"
          aria-label={watchLabel}
          onClick={() => openExternal(video.url)}
        >
          <span style={{ color: "#2a6530", display: "flex" }}>
            <PlayIcon size={20} />
          </span>
        </button>
        <span className="guides-duration">{video.duration}</span>
      </div>
      <h3 className="guides-card-title">{video.title}</h3>
      <p className="guides-card-text">{video.description}</p>
      <div className="guides-actions">
        <button
          type="button"
          className="guides-btn"
          onClick={() => openExternal(video.url)}
        >
          <PlayIcon size={14} />
          {watchLabel}
        </button>
      </div>
    </article>
  );
};

const Widget = () => {
  const { locale } = useLocale();
  const content = getGuideContent(locale);
  const helpUrl = faqHref(content.faqPage, locale);

  return (
    <div className="guides-page">
      <h1 className="guides-title">{content.title}</h1>
      <p className="guides-intro">{content.intro}</p>

      <section className="guides-section">
        <h2 className="guides-section-title">{content.guideTitle}</h2>
        <article className="guides-card guides-pdf-card">
          <PdfIcon />
          <div className="guides-pdf-body">
            <h3 className="guides-card-title">{content.guideName}</h3>
            <p className="guides-card-text">{content.guideDescription}</p>
            <div className="guides-file-label">
              <FileGlyph />
              <span>{content.guideFileLabel}</span>
            </div>
            <div className="guides-actions">
              <button
                type="button"
                className="guides-btn guides-btn-primary"
                onClick={() => openExternal(content.viewUrl)}
              >
                <BookIcon />
                {content.viewGuide}
              </button>
              <button
                type="button"
                className="guides-btn"
                onClick={() => openExternal(content.downloadUrl)}
              >
                <DownloadIcon />
                {content.downloadPdf}
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="guides-section">
        <h2 className="guides-section-title">{content.videosTitle}</h2>
        <p className="guides-section-intro">{content.videosIntro}</p>
        <div className="guides-videos">
          {content.videos.map((video) => (
            <VideoCard
              key={video.title}
              video={video}
              watchLabel={content.watchVideo}
              chartLabel={content.chartLabel}
            />
          ))}
        </div>
      </section>

      <section className="guides-help">
        <div className="guides-help-main">
          <HelpIcon />
          <div>
            <h2 className="guides-help-title">{content.helpTitle}</h2>
            <p className="guides-help-text">
              {content.helpBefore}
              <a className="guides-inline-link" href={helpUrl}>
                {content.helpLink}
              </a>
              {content.helpAfter}
            </p>
          </div>
        </div>
        <a className="guides-btn guides-btn-primary" href={helpUrl}>
          {content.helpButton}
          <ArrowIcon />
        </a>
      </section>
    </div>
  );
};

export default Widget;
