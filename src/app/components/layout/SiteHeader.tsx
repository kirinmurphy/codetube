
export function SiteHeader() {
  return (
    <>
      <div className="flex items-center justify-between w-full pt-6 pb-8">
        <h1 className="flex items-center gap-4">
          <a href="/" className="text-xl font-bold">
            <span className="inline-block pl-2 mr-5 scale-x-150 translate-y-[5px]">▶</span> 
            <span className="inline-block scale-y-[200%]">codethube</span>
          </a>
        </h1>
      </div>
      <hr className="w-full border-gray-400" />
    </>
  );
}
