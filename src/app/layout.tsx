import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/shared/SiteHeader";
import IntroSplash from "@/components/shared/IntroSplash";
import SkyBackdrop from "@/components/shared/SkyBackdrop";
import Footer from "@/components/shared/Footer";
import PlaceholderBanner from "@/components/shared/PlaceholderBanner";
import CookieBanner from "@/components/shared/cookies/CookieBanner";
import InstallAppPrompt from "@/components/shared/InstallAppPrompt";
import OwnerAlerts from "@/components/shared/OwnerAlerts";
import StructuredData from "@/components/seo/StructuredData";
import { CartProvider } from "@/lib/cart/CartContext";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { organizationJsonLd } from "@/lib/structuredData";
import { getSiteUrl } from "@/lib/siteUrl";

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
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Art by Urška",
    template: "%s",
  },
  description:
    "Original paintings by Urška — a storytelling gallery of mood, memory, and light. Shipping from Slovenia, EU, worldwide.",
  applicationName: "Spirituality by Urška",
  // Opens full-screen with its own icon when added to an iPhone home screen.
  appleWebApp: { capable: true, title: "Spirituality", statusBarStyle: "black-translucent" },
  openGraph: {
    title: "Art by Urška",
    description: "Original paintings by Urška — a storytelling gallery of mood, memory, and light.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${gothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-bone">
        <StructuredData data={organizationJsonLd()} />
        <IntroSplash />
        <SkyBackdrop />
        <LanguageProvider>
        <CartProvider>
          <OwnerAlerts />
          <PlaceholderBanner />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <InstallAppPrompt />
        </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
