export default function Video({src}){
    console.log(src)
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return(
        <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${getYouTubeId(src)}`}
            title={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    )
}