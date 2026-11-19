import { cn } from '@/helpers/cn'

// A YouTube video, 16:9 at every width. The player loads only when it nears the screen, from
// YouTube's privacy-enhanced domain, which sets no cookies until the video plays.
const YouTubeVideo = ({ id, title, className }) => (
  <div
    className={cn(
      'relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-card',
      className
    )}
  >
    <iframe
      className="absolute inset-0 h-full w-full border-0"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
)
export default YouTubeVideo
