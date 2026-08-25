import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/shared/SiteHeader";
import SpiritualBackdrop from "@/components/shared/SpiritualBackdrop";
import Footer from "@/components/shared/Footer";
import PlaceholderBanner from "@/components/shared/PlaceholderBanner";
import CookieBanner from "@/components/shared/cookies/CookieBanner";
import StructuredData from "@/components/seo/StructuredData";
import { CartProvider } from "@/lib/cart/CartContext";
import { organizationJsonLd } from "@/lib/structuredData";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gothic = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Art by Urška",
    template: "%s",
  },
  description:
    "Original paintings by Urška — a storytelling gallery of mood, memory, and light. Shipping from Slovenia, EU, worldwide.",
  openGraph: {
    title: "Art by Urška",
    description: "Original paintings by Urška — a storytelling gallery of mood, memory, and light.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${gothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        <StructuredData data={organizationJsonLd()} />
        <SpiritualBackdrop />
        <CartProvider>
          <PlaceholderBanner />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
