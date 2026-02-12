import { useEffect, useState } from "react"
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/Plusicon'
import { ShareIcon } from '../icons/Shareicon'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { Sidebar } from '../components/Sidebar'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [contents, setContents] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                setContents(response.data.content)
            })
            .catch(error => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/signin");
                }
                console.error("Error fetching content:", error);
            })
    }, [modalOpen, navigate])

    const handleDelete = (id: string) => {
        setContents(prev => prev.filter((content: any) => content._id !== id));
    };

    const filteredContents = filter === "all" 
        ? contents 
        : contents.filter((c: any) => c.platform === filter);

    async function shareBrain() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'My GutBrain',
                        text: 'Check out my second brain!',
                        url: shareUrl,
                    });
                } catch (err) {
                    console.error('Error sharing:', err);
                    // Fallback to clipboard if sharing fails or is cancelled
                    copyLink(shareUrl);
                }
            } else {
                copyLink(shareUrl);
            }
        } catch (error) {
            console.error("Error sharing brain:", error);
            alert("Error generating share link");
        }
    }

    function copyLink(url: string) {
        navigator.clipboard.writeText(url);
        alert("Share link copied to clipboard: " + url);
    }

    return (
        <div>
            <Sidebar activeFilter={filter} onFilterChange={setFilter} />
            <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2 border-slate-100">
                <CreateContentModel open={modalOpen} onClose={() => {
                    setModalOpen(false);
                }} />
                <div className='flex gap-4 justify-end pt-2 pb-6'>
                    <Button
                        onClick={() => {
                            setModalOpen(true)
                        }}
                        variant={"primary"}
                        startIcon={<PlusIcon size={"lg"} />}
                        size={"md"}
                        title={"Add Content"}
                    />
                    <Button
                        onClick={shareBrain}
                        variant={"secondary"}
                        startIcon={<ShareIcon size={"lg"} />}
                        size={"md"}
                        title={"Share Brain"}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                    {[...filteredContents].reverse().map(({type, link, title, platform, _id}, index) => 
                        <Card 
                            key={_id || index}
                            contentId={_id}
                            type={type} 
                            link={link} 
                            title={title} 
                            platform={platform}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
