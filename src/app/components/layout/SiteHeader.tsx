
export function SiteHeader() {
  return (
    <>
      <div className="flex items-center justify-between w-full py-4 600mq:py-2vw border-b border-gray-400">
        <h1 className="flex items-center gap-4 translate-y-[-8px]">
          <a href="/" className="text-base 600mq:text-lg 800mq:text-xl font-bold">
            <span className="inline-block pl-2 mr-5 scale-x-150 translate-y-[5px]">▶</span> 
            <span className="inline-block scale-y-[200%]">codetubes</span>
          </a>
        </h1>
      </div>
    </>
  );
}
