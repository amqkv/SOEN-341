import React, { useState, useEffect } from "react";

export default function ProfileIcon() {
    const [icon, setIcon] = useState();

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => {
                response.json()
                    .then(jsonResponse => {
                        setIcon(jsonResponse.data.memes[Math.round(Math.random()*(jsonResponse.data.memes.length -1))]);
                    });  
            });
    }, []);

    return (   
                icon ? <img key={icon.id} src={icon.url} alt={icon.name} style={{width : "100%" , height : "100%", objectFit: "cover"}} /> : null            
    );
}