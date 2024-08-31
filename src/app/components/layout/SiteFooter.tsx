import Script from "next/script";

// Extend JSX.IntrinsicElements to include the web component
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'copy-email-component': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { email: string }, 
        HTMLElement
      >;
    }
  }
}

export function SiteFooter() {
  return (
    <div className="flex justify-end border-t border-gray-400 pr-1 pt-4vw pb-2vw 600mq:pt-10 600mq:pb-6">
      <Script
        src="https://cdn.codethings.net/webcomponents/copy-email-component/index.js"
        type="module"
        strategy="lazyOnload"
      />
      <copy-email-component 
        email="codethingsdotnet@gmail.com">
      </copy-email-component>
    </div>
  );
} 
