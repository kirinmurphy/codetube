import { FaEnvelope } from "react-icons/fa";

export function SiteFooter() {
  return (
    <div className="flex justify-end border-t border-gray-400 pr-1 pt-4vw pb-2vw 600mq:pt-10 600mq:pb-6">
      <a href="mailto:codethingsdotnet@gmail.com" 
        className="group flex gap-2 text-gray-600 hover:text-gray-400">

        <span className="invisible group-hover:visible">codethingsdotnet@gmail.com</span>
        <FaEnvelope className="size-6" />
      </a>
    </div>
  );
} 
