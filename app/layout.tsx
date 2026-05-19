import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Special_Elite,
  Dancing_Script,
  Caveat,
  Indie_Flower,
  Homemade_Apple,
  Sacramento,
  Great_Vibes,
  Pacifico,
  Satisfy,
  Kalam,
  Amatic_SC,
  Patrick_Hand,
  Shadows_Into_Light,
  Architects_Daughter,
  Alex_Brush,
  Allura,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
});

const homemadeApple = Homemade_Apple({
  variable: "--font-homemade-apple",
  weight: "400",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  weight: "400",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  weight: "400",
  subsets: ["latin"],
});

const amaticSC = Amatic_SC({
  variable: "--font-amatic-sc",
  weight: "400",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  weight: "400",
  subsets: ["latin"],
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  weight: "400",
  subsets: ["latin"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-architects-daughter",
  weight: "400",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greeting Card Editor",
  description: "Create beautiful digital greeting cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${specialElite.variable} ${dancingScript.variable} ${caveat.variable} ${indieFlower.variable} ${homemadeApple.variable} ${sacramento.variable} ${greatVibes.variable} ${pacifico.variable} ${satisfy.variable} ${kalam.variable} ${amaticSC.variable} ${patrickHand.variable} ${shadowsIntoLight.variable} ${architectsDaughter.variable} ${alexBrush.variable} ${allura.variable} antialiased bg-cream text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
