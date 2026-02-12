import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { GutBrainIcon } from "../icons/GutBrain";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function SharePage() {
    const { hash } = useParams();
    const [content, setContent] = useState([]);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`)
            .then(response => {
                setContent(response.data.content);
                setUsername(response.data.username);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching shared content:", err);
                setError(true);
                setLoading(false);
            });
    }, [hash]);

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50 text-gray-400">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <GutBrainIcon />
                    <p className="font-medium">Loading Shared Brain...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="text-gray-500">Brain not found or sharing is disabled.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <GutBrainIcon />
                        <h1 className="text-2xl font-bold text-gray-800">
                            <span className="text-purple-600">@{username}'s</span> Brain
                        </h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {content.map((item: any) => (
                        <Card
                            key={item._id}
                            contentId={item._id}
                            title={item.title}
                            link={item.link}
                            type={item.type}
                            platform={item.platform}
                            onDelete={undefined} // Read-only, so pass undefined to hide delete button
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
