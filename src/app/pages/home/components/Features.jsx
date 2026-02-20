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
  featureText,
  imgUrl,
  orientation = 'left',
  boxLayout = 6,
  link,
}) => {
  const imageColWidth = boxLayout
  const textColWidth = 12 - boxLayout
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Handle escape key
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
          {featureText}
        </p>
        {link && (
          <Link
            to={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 text-primary"
          >
            <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full" />
            {link.text} <IconifyIcon icon={link.lucide_icon} className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )

  // Determine if the file is an mp4 video
  const isVideo = typeof imgUrl === 'string' && imgUrl.toLowerCase().endsWith('.mp4')

  const imageContent = (
    <>
      <div className={`col-span-${imageColWidth}`}>
        <div className="p-6">
          {isVideo ? (
            <video
              src={imgUrl}
              className="w-full h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
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
              src={imgUrl}
              alt={heading}
              className="w-full h-auto rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
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
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              title="Close (Esc)"
            >
              <IconifyIcon icon="lucide:x" className="h-8 w-8" />
            </button>
            {isVideo ? (
              <video
                src={imgUrl}
                className="w-full h-auto rounded-lg object-contain border-8 border-yellow-400"
                onClick={(e) => e.stopPropagation()}
                controls
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={imgUrl}
                alt={heading}
                className="w-full h-auto rounded-lg object-contain border-8 border-yellow-400"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="hover:-translate-y-2 rounded-xl border-s-2 border-primary bg-default-950/40 backdrop-blur-3xl transition-all duration-500 mb-6 md:mb-12">
      <div className="p-4 pb-0 md:p-10 md:pb-0">
        <h3 className="mb-2 text-2xl font-medium text-white">{heading}</h3>
        <h4 className="mb-6 text-lg font-medium text-primary">{subHeading}</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orientation === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  )
}

const FeatureYaml = () => {
  return (
    <FeatureBlock
      heading="YAML-First Configuration"
      subHeading="Simplify AI Workflow Management"
      featureText="Leverage the power of YAML to define and manage your AI workflows with ease. Smarter's intuitive YAML-first approach allows you to create, modify, and deploy complex AI processes without writing a single line of code. Streamline your operations and enhance collaboration across teams with clear, human-readable configurations."
      imgUrl={img_yaml_nocode}
      orientation="left"
      boxLayout={6}
      link={{
        url: 'https://ubc.smarter.sh/docs/manifests/',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }}
    />
  )
}

const FeaturePromptEngineerWorkbench = () => {
  return (
    <FeatureBlock
      heading="See how your prompts really work"
      subHeading="Smarter’s Prompt Engineer Workbench gives you a live, transparent view into every part of a conversation — before you deploy."
      featureText="Explore message flows, prompt metadata, token usage, tool calls, and raw responses — all in real time. Watch server logs stream live and inspect complete JSON request and response objects. It’s the ultimate workspace for designing, debugging, and perfecting AI behavior, BEFORE you deploy."
      imgUrl={img_prompt_workbench}
      orientation="right"
      boxLayout={6}
    />
  )
}

const UnifiedLLMInterface = () => {
  return (
    <FeatureBlock
      heading="Any model. Any provider. One interface."
      subHeading="Smarter abstracts every provider’s API, so you can switch or mix models with zero code changes."
      featureText="Just declare your provider and model in YAML — Smarter handles the rest: authentication, request formatting, and routing. Instantly swap between OpenAI, Anthropic, Mistral, or others in real time. Compare results, split-test performance, and keep your agents provider-agnostic by design."
      imgUrl={img_llm_providers}
      orientation="left"
      boxLayout={6}
    />
  )
}

const PluginIntegrations = () => {
  return (
    <FeatureBlock
      heading="Extend your LLM with real-world power."
      subHeading="Smarter Plugins let any model call SQL, APIs, static data, or secure Python — all defined declaratively."
      featureText="Smarter’s Plugin system gives you a no-code, YAML-based way to create fully functional LLM tools. Each Plugin defines how and when it’s invoked, using selectors that work like CSS — from keyword triggers to unconditional inclusion. Connect your ChatBots and Agents to live databases, REST APIs, or sandboxed Python code — safely, seamlessly, and without glue scripts."
      imgUrl={img_plugin}
      orientation="right"
      boxLayout={6}
    />
  )
}

const SmarterChat = () => {
  return (
    <FeatureBlock
      heading="Drop powerful AI chat into any web page."
      subHeading="Smarter Chat is a React component that connects directly to your deployed ChatBot APIs — no setup, no dependencies"
      featureText="The same chat interface that powers the Prompt Engineer Workbench is available as a standalone npm package. Add it to any website — from SharePoint to Salesforce, from WordPress to custom apps — and instantly connect users to your Smarter ChatBots. It’s fully configurable, works with any Smarter deployment, and blends seamlessly with your existing design system."
      imgUrl={img_smarter_chat}
      orientation="left"
      boxLayout={6}
      link={{
        url: 'https://github.com/smarter-sh/smarter-chat',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }}
    />
  )
}

const SmarterEnterprise = () => {
  return (
    <FeatureBlock
      heading="Built for teams. Ready for the enterprise."
      subHeading="Smarter brings production-grade governance, visibility, and control to every AI resource — from design to deployment."
      featureText="Designed for real-world organizations, Smarter runs natively in Kubernetes across on-prem, AWS, and Azure. Each team operates within its own secure workspace — engineers, PMs, designers, and prompt specialists collaborating on shared ChatBots and Agents. With configurable logging, built-in cost accounting, and environment-aware CI/CD, Smarter makes it easy to move from design to production safely. The optional Journal archives every production prompt for long-term storage and legal compliance — ensuring you always have a verifiable record of AI activity."
      imgUrl={img_smarter_enterprise}
      orientation="right"
      boxLayout={6}
      link={{
        url: 'https://ubc.smarter.sh/docs/',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }}
    />
  )
}

const Features = () => {
  return (
    <div id="features" className="w-full px-4 sm:px-6 lg:px-0">
      <FeatureYaml />
      <FeaturePromptEngineerWorkbench />
      <UnifiedLLMInterface />
      <PluginIntegrations />
      <SmarterChat />
      <SmarterEnterprise />
    </div>
  )
}

export default Features
