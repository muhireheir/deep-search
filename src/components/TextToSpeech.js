import React, { useEffect } from 'react'

function TextToSpeech({ canPlay,data,setCanPlay }) {

    useEffect(() => {
        const audio = new Audio(data.audioUrl);
        if (canPlay) {
           
            audio.play();
            audio.onended = () => {
                setCanPlay(false);
            }
        }
    }, [canPlay, data.audioUrl])
    return (
        <></>
    )
}

export default TextToSpeech