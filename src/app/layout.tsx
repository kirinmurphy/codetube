import localFont from "next/font/local";
import "./globals.css";
import { VideoPlayerProvider } from "./components/mediaPlayer/VideoPlayerProvider";
import { LayoutContents } from "./components/layout/LayoutContents";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <VideoPlayerProvider>
          <LayoutContents>{children}</LayoutContents>
        </VideoPlayerProvider>
      </body>
    </html>
  );
}
