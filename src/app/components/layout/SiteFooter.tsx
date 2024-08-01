import { FaEnvelope } from "react-icons/fa";

export function SiteFooter() {
  return (
    <>  
      <hr className="w-full border-gray-400" />
      <div className="py-12 flex justify-end">
        <a href="mailto:codethingsdotnet@gmail.com" 
          className="group flex gap-2 text-gray-600 hover:text-gray-400">

          <span className="invisible group-hover:visible">codethingsdotnet@gmail.com</span>
          <FaEnvelope className="size-6" />
        </a>
      </div>
    </>
  );
} 
