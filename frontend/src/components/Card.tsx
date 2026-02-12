import { ShareIcon } from "../icons/Shareicon";
import { useEffect, useRef } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { OtherIcon } from "../icons/OtherIcon";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CardProps {
  title: string;
  link: string;
  platform: "twitter" | "youtube" | "linkedin" | "other";
  type: "document" | "image" | "video" | "audio";
  contentId: string;
  onDelete?: (id: string) => void;
}

declare global {
  interface Window {
    twttr: any;
  }
}

export function Card({ title, link, platform, type, contentId, onDelete }: CardProps) {
  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (platform === "twitter" && twitterRef.current) {
      const loadTwitterWidget = () => {
        if (window.twttr?.widgets) {
          window.twttr.widgets.load(twitterRef.current);
        }
      };

      if (window.twttr?.widgets) {
        loadTwitterWidget();
      } else {
        const checkTwitter = setInterval(() => {
          if (window.twttr?.widgets) {
            loadTwitterWidget();
            clearInterval(checkTwitter);
          }
        }, 100);

        setTimeout(() => clearInterval(checkTwitter), 10000);
        return () => clearInterval(checkTwitter);
      }
    }
  }, [platform, link]);

  async function deleteContent() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content?contentId=${contentId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      onDelete?.(contentId);
    } catch (e) {
      console.error("Error deleting content:", e);
      alert("Error deleting content");
    }
  }

  return (
    <div className="p-5 bg-white rounded-2xl border-gray-200 min-w-72 max-w-72 border transform transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 flex flex-col min-h-[480px]">
      
      {/* Header - Reference Style */}
      <div className="flex justify-between items-center mb-5 shrink-0">
        <div className="flex items-center text-gray-600 gap-2.5">
          <div className="flex items-center justify-center">
            {platform === "youtube" && <div className="text-gray-500"><YoutubeIcon /></div>}
            {platform === "twitter" && <div className="text-gray-500"><TwitterIcon /></div>}
            {platform === "linkedin" && <div className="text-gray-500"><LinkedinIcon /></div>}
            {platform === "other" && <div className="text-gray-500"><OtherIcon /></div>}
          </div>
          <span className="text-sm font-medium text-gray-800 truncate max-w-[140px]">{title}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-600 transition-all p-1 hover:bg-purple-50 rounded-md"
            title="View Original"
          >
            <ShareIcon size="md" />
          </a>
          {onDelete && (
            <button 
              onClick={deleteContent}
              className="text-gray-400 hover:text-red-500 transition-all p-1 hover:bg-red-50 rounded-md"
              title="Delete Content"
            >
              <DeleteIcon className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="overflow-hidden rounded-xl">

        {/* YouTube Embed - Tight Size */}
        {platform === "youtube" && type === "video" && (
          <div className="aspect-video w-full bg-gray-100">
            <iframe
              className="w-full h-full"
              src={link
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "youtube.com/embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Twitter Embed - Fixed Visibility */}
        {platform === "twitter" && (
          <div ref={twitterRef} className="max-h-[400px] overflow-y-auto no-scrollbar scroll-smooth">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}

        {/* LinkedIn Embed - Fixed Regex and Size */}
        {platform === "linkedin" && (
          <div className="bg-gray-50 w-full min-h-[300px] max-h-[450px] flex flex-col border border-gray-100 rounded-lg overflow-hidden">
            {(() => {
              // Extraction logic for LinkedIn Update ID
              const match = link.match(/(?:activity-|share:|posts\/.*-)(\d+)(?:$|[/?])/);
              const id = match ? match[1] : null;

              if (id) {
                return (
                  <iframe
                    src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${id}`}
                    height="400px"
                    width="100%"
                    frameBorder="0"
                    allowFullScreen
                    title="LinkedIn post"
                    className="flex-grow w-full"
                  />
                );
              } else {
                return (
                  <div className="p-10 flex flex-col items-center justify-center flex-grow gap-4 text-center">
                    <div className="bg-white px-4 py-4 rounded-full shadow-sm">
                       <LinkedinIcon />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-gray-700 text-sm font-semibold">Preview Loading...</p>
                      <p className="text-gray-400 text-[11px] leading-relaxed px-2">Some formats require direct viewing on LinkedIn.</p>
                    </div>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-white font-semibold text-xs py-2 px-5 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      Open Post <ShareIcon size="sm" />
                    </a>
                  </div>
                );
              }
            })()}
          </div>
        )}

        {/* Others Fallback */}
        {platform === "other" && (
          <div className="py-8 px-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-4 min-h-[160px]">
             <div className="text-gray-200">
               <OtherIcon />
             </div>
             <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-purple-600 border border-purple-100 hover:border-purple-300 rounded-full font-bold text-xs shadow-sm transition-all"
            >
              Learn More
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

