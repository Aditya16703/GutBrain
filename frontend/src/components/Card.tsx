import {ShareIcon} from "../icons/Shareicon";

interface CardProps {
    title : string ;
    link : string ;
    type : "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
    return (
        <>
            < div className = "p-4 bg-white rounded-md border-gray-200 max-w-72 border " >
             <div  className = " flex justify-between ">
                <div className = "flex items-center front-md">
                    <div className = "text-gray-500 pr-2">
                        <ShareIcon size = "md" />
                    </div>
                    {title}
                </div>
                 <div className = "  p-2 flex items-center" >
                    <div className = "p-2 text-gray-500">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <ShareIcon size = "md" />
                        </a>
                        </div>
                        <div className = " text-gray-500">
                        <ShareIcon size = "md"/>
                    </div>
                 </div>
                 </div>

                 <div className = "pt-4 pb-2" >
                    {type === "youtube" &&
                     <iframe className = "w-full" src={link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}


                     {type === "twitter" && (
                     <blockquote 
                     className="twitter-tweet">
                        <a href={link.replace("x.com" ,"twitter.com")}></a>
                     </blockquote>
                     )}
                 </div>

                 
        </div>
        </>
    )
}