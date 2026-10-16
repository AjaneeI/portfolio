import type { Metadata } from "next";

const author = {
  name: "Ajanee Igharo",
  url: "https://ajaneeigharo.com",
  sameAs: [
    "https://www.linkedin.com/in/ajaneeigharo/",
    "https://github.com/AjaneeI",
  ],
};

export type ProjectMeta = {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
};

export function projectMetadata(props: ProjectMeta): Metadata {
  return {
    title: { absolute: props.title },
    description: props.description,
    authors: [{ name: author.name, url: author.url }],
    creator: author.name,
    publisher: author.name,
    alternates: { canonical: props.url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: props.url,
      title: props.title,
      description: props.description,
      siteName: author.name,
      authors: [author.url],
      ...(props.datePublished ? { publishedTime: props.datePublished } : {}),
      modifiedTime: props.dateModified,
      images: [{ url: "https://ajaneeigharo.com/og.png", width: 1200, height: 630, alt: "Ajanee Igharo portfolio preview." }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AjaneeIgharo",
      title: props.title,
      description: props.description,
      images: ["https://ajaneeigharo.com/og.png"],
    },
  };
}

export function ProjectStructuredData(props: ProjectMeta) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: props.title,
    description: props.description,
    url: props.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": props.url },
    author: { "@type": "Person", ...author },
    publisher: { "@type": "Person", name: author.name, url: author.url },
    ...(props.datePublished ? { datePublished: props.datePublished } : {}),
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
