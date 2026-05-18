import { useState, useEffect } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Link } from 'react-router-dom'
import img_yaml_nocode from '@/assets/images/home/features/yaml-nocode.png'
//import img_prompt_workbench from '@/assets/images/home/features/prompt-workbench.png'
import img_llm_providers from '@/assets/images/home/features/llm-providers.png'
import img_plugin from '@/assets/images/home/features/plugin.png'
import img_smarter_chat from '@/assets/images/home/features/smarter-chat.png'
import img_smarter_enterprise from '@/assets/images/home/features/smarter-enterprise.png'
import { CDN } from '@/common/constants'

const img_prompt_workbench = `${CDN}/videos/read-the-docs2.mp4`


const FeatureBlock = ({
  heading,
  subHeading,
  features,
  orientation = 'left',
  boxLayout = 6,
  delay = 5000,
}) => {
  const imageColWidth = boxLayout
  const textColWidth = 12 - boxLayout
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Treat as lists internally
  const [featureTextList] = useState(() => Array.isArray(features) ? features.map(f => f.text) : [features.text])
  const [imgUrlList] = useState(() => Array.isArray(features) ? features.map(f => f.imgUrl) : [features.imgUrl])
  const [featureIndex, setFeatureIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [isHovering, setIsHovering] = useState(false)


  // featureText,
  // imgUrl,
  // link,


  useEffect(() => {
    if (featureTextList.length < 2) return;
    if (isImageModalOpen || isHovering) return; // Pause cycling when modal is open or hovered
    const interval = setInterval(() => {
      if (featureTextList.length > 1) {
        setFeatureIndex((i) => (i + 1) % featureTextList.length)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [featureTextList, delay, isImageModalOpen, isHovering])

  // Forward/back handlers
  const handleForward = () => {
    if (imgUrlList.length > 1) setFeatureIndex((i) => (i + 1) % imgUrlList.length)
    //setTimerKey((k) => k + 1)
  }
  const handleBack = () => {
    if (imgUrlList.length > 1) setFeatureIndex((i) => (i - 1 + imgUrlList.length) % imgUrlList.length)
    //setTimerKey((k) => k + 1)
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsImageModalOpen(false)
      }
    }

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isImageModalOpen])

  const textContent = (
    <div className={`col-span-${textColWidth}`}>
      <div className="p-4 md:p-10">
        <p className="text-sm font-medium text-default-100 leading-relaxed mb-4 whitespace-pre-line">
          {featureTextList[featureIndex]}
        </p>
        {features[featureIndex].link && (
          <Link
            to={features[featureIndex].link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 text-primary"
          >
            <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w/full" />
            {features[featureIndex].link.text} <IconifyIcon icon={features[featureIndex].link.lucide_icon} className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )

  const currentImgUrl = imgUrlList[featureIndex]
  const isVideo = typeof currentImgUrl === 'string' && currentImgUrl.toLowerCase().endsWith('.mp4')

  const imageContent = (
    <>
      <div className={`col-span-${imageColWidth}`}>
        <div
          className="p-6 relative flex items-center justify-center"
          style={{ width: '100%', maxWidth: '1920px', minWidth: '0', height: '100%', maxHeight: '1080px', aspectRatio: '16/9' }}
        >
          {/* Forward/back controls */}
          {(imgUrlList.length > 1 || featureTextList.length > 1) && (
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center z-10 pointer-events-none">
              <button
                type="button"
                aria-label="Back"
                className="pointer-events-auto bg-black/60 hover:bg-black/80 text-white rounded-full p-2 m-2 shadow"
                onClick={handleBack}
                tabIndex={0}
              >
                <IconifyIcon icon="lucide:chevron-left" className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Forward"
                className="pointer-events-auto bg-black/60 hover:bg-black/80 text-white rounded-full p-2 m-2 shadow"
                onClick={handleForward}
                tabIndex={0}
              >
                <IconifyIcon icon="lucide:chevron-right" className="h-6 w-6" />
              </button>
            </div>
          )}
          {isVideo ? (
            <video
              src={currentImgUrl}
              className="rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100%', height: '100%', maxWidth: '1920px', maxHeight: '1080px', aspectRatio: '16/9', background: '#000' }}
              onClick={() => setIsImageModalOpen(true)}
              title="Click to enlarge"
              controls={false}
              poster=""
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              src={currentImgUrl}
              alt={heading}
              className="rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity"
              style={{ width: '100%', height: '100%', maxWidth: '1920px', maxHeight: '1080px', aspectRatio: '16/9', background: '#000' }}
              onClick={() => setIsImageModalOpen(true)}
              title="Click to enlarge"
            />
          )}
        </div>
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative"
            style={{ width: '100%', maxWidth: '1920px', height: '100%', maxHeight: '1080px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => e.stopPropagation()} // Prevent modal close on content click
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              title="Close (Esc)"
            >
              <IconifyIcon icon="lucide:x" className="h-8 w-8" />
            </button>
            {isVideo ? (
              <video
                src={currentImgUrl}
                className="rounded-lg object-contain border-8 border-yellow-400"
                style={{ width: '100%', height: '100%', maxWidth: '1920px', maxHeight: '1080px', aspectRatio: '16/9', background: '#000' }}
                controls
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={currentImgUrl}
                alt={heading}
                className="rounded-lg object-contain border-8 border-yellow-400"
                style={{ width: '100%', height: '100%', maxWidth: '1920px', maxHeight: '1080px', aspectRatio: '16/9', background: '#000' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )

  const OrientedContent = ({ orientation, imageContent, textContent }) => {
    return orientation === 'left' ? (
      <>
        {imageContent}
        {textContent}
      </>
    ) : (
      <>
        {textContent}
        {imageContent}
      </>
    )
  }

  return (
    <div
      className="hover:-translate-y-2 rounded-xl border-s-2 border-primary bg-default-950/40 backdrop-blur-3xl transition-all duration-500 mb-6 md:mb-12 min-h-[300px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4 pb-0 md:p-10 md:pb-0">
        <h3 className="mb-2 text-2xl font-medium text-white">{heading}</h3>
        <h4 className="mb-6 text-lg font-medium text-primary">{subHeading}</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrientedContent orientation={orientation} imageContent={imageContent} textContent={textContent} />
      </div>
    </div>
  )
}

export default FeatureBlock;
