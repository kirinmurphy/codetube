import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PageInner } from "./PageInner";

export function LayoutContents ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="w-full">
        <PageInner>
          <SiteHeader />
        </PageInner>
      </header>

      <main className="w-full">
        <PageInner>
          {children}
        </PageInner>
      </main>

      <footer className="w-full">
        <PageInner>
          <SiteFooter />
        </PageInner>
      </footer>
    </>
  ) 
}