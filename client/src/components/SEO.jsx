import { Helmet } from "react-helmet-async";

const SITE_NAME = "PlayRank";
const DEFAULT_IMAGE = "/favicon.png";

export default function SEO({
  title,
  description,
  image,
  type = "website",
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url =
    typeof window !== "undefined" ? window.location.href : undefined;
  const ogImage =
    image ??
    (typeof window !== "undefined"
      ? `${window.location.origin}${DEFAULT_IMAGE}`
      : DEFAULT_IMAGE);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && (
        <meta property="og:description" content={description} />
      )}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
