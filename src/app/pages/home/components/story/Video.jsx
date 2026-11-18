import { EXPLAINER_VIDEO_EMBED } from '@/common/constants'
import { Panel, rise } from './Blocks'

// The five-minute explainer video: the problem, then the solution, told without technical jargon.
// It is the page's whole case for Smarter; the cards below it show the solution at work. The
// cover's What is Smarter? button links here. The player loads only when the panel nears the
// screen, from YouTube's privacy-enhanced domain.
const Video = () => (
  <Panel
    id="video"
    title="Learn. Build. Govern."
    subtitle="Why your organization probably needs Smarter."
  >
    <div className="home-video home-rise" style={rise(1)}>
      <iframe
        src={EXPLAINER_VIDEO_EMBED}
        title="The Smarter Project, in five minutes"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  </Panel>
)
export default Video
