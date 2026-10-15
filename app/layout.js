import "./globals.css";
import ContextProvider from "@/app/lib/ContextProvider";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import Popup from "@/app/ui/Popup";
import Maintenance from "./ui/Maintenance";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Members portal",
  description: "EIK members portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className+' lg:text-sm 2xl:text-base'}>
        <ContextProvider>
          <Suspense>
            {
              !true ? <Maintenance duration={"October 8, 2025"} /> : children
            }
            <Popup />
          </Suspense>
        </ContextProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GLSYTLFHJD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GLSYTLFHJD');
          `}
        </Script>
      </body>
    </html>
  );
}
