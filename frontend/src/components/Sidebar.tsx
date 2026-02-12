import {GutBrainIcon} from "../icons/GutBrain";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { OtherIcon } from "../icons/OtherIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import  {Sidebaritem} from "./Sidebaritem";  
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    onFilterChange: (filter: string) => void;
    activeFilter: string;
}

export function Sidebar({ onFilterChange, activeFilter }: SidebarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return <div className = "h-screen bg-white border-r w-72 fixed left-0 top-0 z-50 overflow-y-auto transition-all duration-300 ease-out flex flex-col justify-between pb-4">
        <div>
            <div 
                className = "pt-6 p-4 pb-8 flex items-center gap-2 text-2xl font-bold cursor-pointer transition-all hover:opacity-80"
                onClick={() => onFilterChange("all")}
            >
               <div className="text-purple-600">
                   <GutBrainIcon />
               </div>
               <span className="tracking-tight">GutBrain</span>
            </div>
            <div className="pt-2 m-2">
                <Sidebaritem 
                    text = "Twitter" 
                    icon = {<TwitterIcon/>} 
                    active={activeFilter === "twitter"}
                    onClick={() => onFilterChange("twitter")}
                />
            </div>
            <div className="pt-2 m-2">
                <Sidebaritem 
                    text = "Youtube" 
                    icon = {<YoutubeIcon/>} 
                    active={activeFilter === "youtube"}
                    onClick={() => onFilterChange("youtube")}
                />
            </div>
            <div className="pt-2 m-2">
                <Sidebaritem 
                    text = "Linkedin" 
                    icon = {<LinkedinIcon/>} 
                    active={activeFilter === "linkedin"}
                    onClick={() => onFilterChange("linkedin")}
                />
            </div>
            <div className="pt-2 m-2">
                <Sidebaritem 
                    text = "Others" 
                    icon = {<OtherIcon/>} 
                    active={activeFilter === "other"}
                    onClick={() => onFilterChange("other")}
                />
            </div>
        </div>

        <div className="pt-2 m-2 mt-auto border-t border-gray-100">
            <Sidebaritem 
                text = "Sign Out" 
                icon = {<LogoutIcon/>} 
                onClick={handleLogout}
            />
        </div>
    </div>
}  