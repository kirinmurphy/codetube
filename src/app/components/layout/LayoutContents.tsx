import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { VideoPlayer } from "../mediaPlayer/VideoPlayer";

export function LayoutContents ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <header className="w-full">
          <div className={`max-w-screen-md mx-auto p-4`}>
            <SiteHeader />
          </div>
        </header>

        <main className="w-full">
          <div className={`max-w-screen-md mx-auto p-4`}>
            {children}
          </div>
        </main>

        <footer className="w-full">
          <div className={`max-w-screen-md mx-auto p-4`}>
            <SiteFooter />
          </div>
        </footer>
      </div>

      <div>
        <VideoPlayer />
      </div>
    </>
  ) 
}