import localFont from "next/font/local";
import "./css/globals.css";
import "./components/BlogListItem/blogListItem.css";
import { VideoPlayerProvider } from "./components/VideoPlayer/VideoPlayerProvider";
import { LayoutContents } from "./components/layout/LayoutContents";
import { VideoPlayerWrapper } from "./components/layout/VideoPlayerWrapper";

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
      <body className={`${geistSans.variable} ${geistMono.variable} min-w-[320px]`}>
        <VideoPlayerProvider>
          <VideoPlayerWrapper>
            <LayoutContents>{children}</LayoutContents>
          </VideoPlayerWrapper>
        </VideoPlayerProvider>
      </body>
    </html>
  );
}
