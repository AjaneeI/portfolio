import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://ajaneeigharo.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Ajanee Igharo | Applied AI Engineer",
      template: "%s | Ajanee Igharo",
    },
    description:
      "Applied AI engineer building and evaluating agent systems, workflow automation, guardrails, analytics tools, and human-in-the-loop AI systems.",
    alternates: { canonical: "/" },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      ],
      shortcut: "/favicon.png",
      apple: [{ url: "/favicon.png", sizes: "96x96", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title: "Ajanee Igharo | Applied AI Engineering",
      description: "Agents, evaluation, workflow automation, guardrails, and AI systems designed for real-world work.",
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Ajanee Igharo",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ajanee Igharo portfolio preview." }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@AjaneeIgharo",
      title: "Ajanee Igharo | Applied AI Engineering",
      description: "Agents, evaluation, workflow automation, guardrails, and AI systems designed for real-world work.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = { "@context":"https://schema.org", "@graph":[
    { "@type":"Person", "@id":`${siteUrl}/#person`, name:"Ajanee Igharo", jobTitle:"Applied AI Engineer", url:siteUrl, email:"mailto:ajaneeigharo@gmail.com", address:{ "@type":"PostalAddress", addressLocality:"Boston", addressRegion:"MA", addressCountry:"US" }, alumniOf:{ "@type":"CollegeOrUniversity", name:"University of Massachusetts Boston" }, sameAs:["https://www.linkedin.com/in/ajaneeigharo/","https://github.com/AjaneeI","https://x.com/AjaneeIgharo"], knowsAbout:["Applied AI engineering","AI agents","Evaluation","Workflow automation","Human-in-the-loop systems"] },
    { "@type":"WebSite", "@id":`${siteUrl}/#website`, url:siteUrl, name:"Ajanee Igharo | Applied AI Engineer", inLanguage:"en-US", publisher:{ "@id":`${siteUrl}/#person` } }
  ] };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
