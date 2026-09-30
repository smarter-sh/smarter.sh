import img_llm_providers from '@/assets/images/home/features/llm-providers.png'
import img_smarter_chat from '@/assets/images/home/features/smarter-chat.png'
import { CDN } from '@/common/constants'

import FeatureBlock from './FeatureBlock'

const FeaturePromptEngineerWorkbench = () => {
  const vid_prompt_workbench = `${CDN}/videos/read-the-docs2.mp4`
  const img_dashboard = `${CDN}/images/web-console-dashboard.png`
  const vid_apply_manifest = `${CDN}/videos/apply-manifest.mp4`

  const feature1 = {
    text:
      'Explore message flows, prompt metadata, token usage, tool calls, and raw responses — all in real time. ' +
      'Watch server logs stream live and inspect complete JSON request and response objects. It’s the ultimate ' +
      'workspace for designing, debugging, and perfecting AI behavior, BEFORE you deploy.',
    imgUrl: vid_prompt_workbench,
  }

  const feature2 = {
    text:
      "Smarter's ReactJS based customizable web console dashboard provides prompt engineers " +
      'with an interactive view into the AI resources that are at their disposal, ' +
      'along with platform key performance metrics, and real-time system status. The dashboard ' +
      'also provides engineers with a roadmap to the Smarter ecosystem, with quick access to ' +
      'documentation, sdks, training materials, and support channels — all designed to help you get the most out of Smarter.',
    imgUrl: img_dashboard,
  }

  const feature5 = {
    text:
      "Use Smarter's VS Code extension to help you effortlessly create AI solutions. Every Smarter AI resource is " +
      'declarable as a YAML manifest. Design your ChatBots, Plugins, Connections, Secrets and more in YAML, ' +
      'and then simply drag-and-drop your manifest into the web console to apply it to your workspace. ' +
      "It's that simple!",
    imgUrl: vid_apply_manifest,
    link: {
      url: 'https://marketplace.visualstudio.com/items?itemName=querium.smarter-manifest',
      text: 'Get the VS Code Extension',
      lucide_icon: 'lucide:book-open',
    },
  }

  const features = [feature1, feature5, feature2]

  return (
    <FeatureBlock
      heading="See how your prompts really work"
      subHeading="Smarter’s Prompt Engineer Workbench gives you a live, transparent view into every part of a conversation — before you deploy."
      features={features}
      orientation="right"
      boxLayout={6}
      delay={15000}
    />
  )
}

const UnifiedLLMInterface = () => {
  const feature = {
    text: 'Just declare your provider and model in YAML — Smarter handles the rest: authentication, request formatting, and routing. Instantly swap between OpenAI, Anthropic, Mistral, or others in real time. Compare results, split-test performance, and keep your agents provider-agnostic by design.',
    imgUrl: img_llm_providers,
  }

  return (
    <FeatureBlock
      heading="Any model. Any provider. One interface."
      subHeading="Smarter abstracts every provider’s API, so you can switch or mix models with zero code changes."
      features={[feature]}
      orientation="left"
      boxLayout={6}
    />
  )
}

const SmarterChat = () => {
  const feature = {
    text: 'The same chat interface that powers the Prompt Engineer Workbench is available as a standalone npm package. Add it to any website — from SharePoint to Salesforce, from WordPress to custom apps — and instantly connect users to your Smarter ChatBots. It’s fully configurable, works with any Smarter deployment, and blends seamlessly with your existing design system.',
    imgUrl: img_smarter_chat,
    link: {
      url: 'https://github.com/smarter-sh/smarter-chat',
      text: 'Learn More',
      lucide_icon: 'lucide:book-open',
    },
  }

  return (
    <FeatureBlock
      heading="Drop powerful AI chat into any web page."
      subHeading="Smarter Chat is a React component that connects directly to your deployed ChatBot APIs — no setup, no dependencies"
      features={[feature]}
      orientation="right"
      boxLayout={6}
    />
  )
}

const Features = () => {
  return (
    <section id="features" className="w-full px-4 py-20 sm:px-6 lg:px-0">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-medium text-white">See it in action</h2>
      </div>
      <FeaturePromptEngineerWorkbench />
      <UnifiedLLMInterface />
      <SmarterChat />
    </section>
  )
}

export default Features
