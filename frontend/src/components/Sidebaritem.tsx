import type { ReactElement } from "react";
export function Sidebaritem({text , icon, active, onClick}:{
    text : string;
    icon : ReactElement;
    active?: boolean;
    onClick?: () => void;
}
) {
    return <div 
        onClick={onClick}
        className = {`flex items-center text-gray-600 hover:text-gray-900 cursor-pointer transform transition-all duration-200 ease-out hover:scale-105 rounded-xl max-w-48 pl-4 py-1 my-1 ${active ? "bg-purple-100 text-purple-700 shadow-sm" : "hover:bg-gray-50"}`}
    >
      <div className = "p-2">
          {icon}
      </div>
      <div className = "p-2 font-medium">
         {text}
      </div>
    </div>
}