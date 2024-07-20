import localFont from "next/font/local";
import "./css/globals.css";
import "./components/blog/BlogListItem/blogListItem.css";
import { VideoPlayerProvider } from "./components/VideoPlayer/VideoPlayerProvider";
import { Page } from "./components/layout/Page";
import { VideoPlayerWrapper } from "./components/layout/VideoPlayerWrapper";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-w-[320px]`}>
        <VideoPlayerProvider>
          <VideoPlayerWrapper>
            <Page>
              {children}
            </Page>
          </VideoPlayerWrapper>
        </VideoPlayerProvider>
      </body>
    </html>
  );
}
