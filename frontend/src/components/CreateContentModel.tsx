   
 import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input"; // Using shared Input component
import axios from "axios";

// Helper components for type selection button
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CreateContentModelProps {
    open: boolean;
    onClose: () => void;
}

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    LinkedIn : "linkedin",
    Document: "document"
}

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill in all details");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type: type === ContentType.Youtube ? "video" : "document",
                platform: type === ContentType.LinkedIn ? "linkedin" : 
                         (type === ContentType.Youtube ? "youtube" : 
                         (type === ContentType.Twitter ? "twitter" : "other"))
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            onClose();
            // Trigger a custom event or reload to update dashboard
            // For now, reload serves as a simple way to refresh data
            window.location.reload();
            
        } catch(e: any) {
            console.error(e);
            if (e.response?.status === 401 || e.response?.status === 403) {
                alert("Session expired. Please login again.");
                // createContentModel doesn't have navigate, but reloading will trigger Dashboard's useEffect which redirects
                window.location.reload(); 
            } else {
                alert("Error adding content");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div>
            {open && <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500/60 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded-md shadow-lg min-w-[300px]">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                            <Input ref={titleRef} placeholder={"Title"} />
                            <Input ref={linkRef} placeholder={"Link"} />
                        </div>
                        
                        <div className="mt-4 flex gap-2 justify-center pb-2">
                             <h3 className="text-gray-600 text-sm mb-1 self-center w-full text-center">Select Type</h3>
                        </div>
                        <div className="flex justify-center gap-2 pb-4">
                            <Button 
                                title="Youtube" 
                                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.Youtube)}
                                size="sm"
                                startIcon={<YoutubeIcon />} 
                            />
                            <Button 
                                title="Twitter" 
                                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.Twitter)}
                                size="sm"
                                startIcon={<TwitterIcon />}
                            />
                            <Button 
                                title="LinkedIn" 
                                variant={type === ContentType.LinkedIn ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.LinkedIn)}
                                size="sm"
                                startIcon={<LinkedinIcon />}
                            />
                             <Button 
                                title="Document" 
                                variant={type === ContentType.Document ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.Document)}
                                size="sm"
                                // startIcon={<LinkIcon />} // Fallback or add icon if available
                            />
                        </div>

                        <div className="flex justify-center pt-4 border-t border-gray-200">
                            <Button 
                                onClick={addContent} 
                                variant="primary" 
                                title={loading ? "Adding..." : "Submit"} 
                                size="md" 
                            />
                        </div>
                    </span>
                </div>
         </div>
            }
        </div>

    </>
    )
}
