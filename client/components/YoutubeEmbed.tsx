interface Props {
  url: string
}

function YoutubeEmbed({ url }: Props) {
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={url.replace(/watch\?v=/, 'embed/')}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        role="presentation"
      />
    </div>
  )
}

export default YoutubeEmbed
