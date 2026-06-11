import { useState, useEffect } from 'react'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Link } from 'react-router-dom'
import img_yaml_nocode from '@/assets/images/home/features/yaml-nocode.png'
import img_llm_providers from '@/assets/images/home/features/llm-providers.png'
import img_plugin from '@/assets/images/home/features/plugin.png'
import img_smarter_chat from '@/assets/images/home/features/smarter-chat.png'
import img_smarter_enterprise from '@/assets/images/home/features/smarter-enterprise.png'
import { CDN } from '@/common/constants'

import FeatureBlock from './FeatureBlock'



const FeatureYaml = () => {

  const feature = {
    text: "Leverage the power of YAML to define and manage your AI workflows with ease. Smarter's intuitive YAML-first approach allows you to create, modify, and deploy complex AI processes without writing a single line of code. Streamline your operations and enhance collaboration across teams with clear, human-readable configurations.",
    imgUrl: img_yaml_nocode,
  }


  return (
    <FeatureBlock
      heading="YAML-First Configuration"
      subHeading="Simplify AI Workflow Management"
      features={[feature]}
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

  const vid_prompt_workbench = `${CDN}/videos/read-the-docs2.mp4`
  const img_dashboard = `${CDN}/images/web-console-dashboard.png`
  const vid_prompt_passthrough = `${CDN}/videos/prompt_passthrough.mp4`
  const vid_server_logs = `${CDN}/videos/server-logs.mp4`
  const vid_apply_manifest = `${CDN}/videos/apply-manifest.mp4`
  const vid_everything_is_a_manifest = `${CDN}/videos/everything-is-a-manifest.mp4`


  const feature1 = {
    text: "Explore message flows, prompt metadata, token usage, tool calls, and raw responses — all in real time. " +
    "Watch server logs stream live and inspect complete JSON request and response objects. It’s the ultimate " +
    "workspace for designing, debugging, and perfecting AI behavior, BEFORE you deploy.",
    imgUrl: vid_prompt_workbench,
  }

  const feature2 = {
    text: "Smarter's ReactJS based customizable web console dashboard provides prompt engineers " +
    "with an interactive view into the AI resources that are at their disposal, " +
    "along with platform key performance metrics, and real-time system status. The dashboard " +
    "also provides engineers with a roadmap to the Smarter ecosystem, with quick access to " +
    "documentation, sdks, training materials, and support channels — all designed to help you get the most out of Smarter.",
    imgUrl: img_dashboard,
  }

  const feature3 = {
    text: "Smarter's prompt pass-through feature provides engineers with direct access to LLM APIs. " +
    "This is ideal for classroom lab exercises as well as for helping professional prompt " +
    "engineers gather diagnostic and debug information on complex prompting problems. The " +
    "convenience templates enable new users to instantly setup common, working JSON patterns for " +
    "everything from a 'Hello world!' prompt to complex multi-step tool calls.",
    imgUrl: vid_prompt_passthrough,
  }

  const feature4 = {
    text: "Smarter's web console server logs feature provides prompt engineers with a personalized, live, " +
    "real-time stream of all backend activity — from incoming requests to security " +
    "checks, resource provisioning, prompt preparation, interim LLM API responses, and outgoing responses. " +
    "Each log entry includes detailed metadata, such as timestamps, request IDs, user information, and execution details. " +
    "This comprehensive logging allows you to monitor performance, troubleshoot issues, and gain deep insights into how your " +
    "prompts are being processed and executed — all within the Prompt Engineer Workbench.",
    imgUrl: vid_server_logs,
  }

  const feature5 = {
    text: "Use Smarter's VS Code extension to help you effortlessly create AI solutions. Every Smarter AI resource is " +
    "declarable as a YAML manifest. Design your ChatBots, Plugins, Connections, Secrets and more in YAML, " +
    "and then simply drag-and-drop your manifest into the web console to apply it to your workspace. " +
    "It's that simple!",
    imgUrl: vid_apply_manifest,
    link: {
        url: 'https://marketplace.visualstudio.com/items?itemName=querium.smarter-manifest',
        text: 'Get the VS Code Extension',
        lucide_icon: 'lucide:book-open',
      }
  }

  const feature6 = {
    text: "Every Smarter AI resource is defined with a YAML manifest. " +
    "This unified approach eliminates any need for programming skills. It means that your students and prompt engineers " +
    "are instantaneously productive. It simplifies management, enhances visibility, and promotes best practices across " +
    "your AI projects. Everyone is able to focus on strategic outcomes instead of getting bogged down in code.",
    imgUrl: vid_everything_is_a_manifest,
  }

  const features = [feature1, feature2, feature3, feature4, feature5, feature6]

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
    text: "Just declare your provider and model in YAML — Smarter handles the rest: authentication, request formatting, and routing. Instantly swap between OpenAI, Anthropic, Mistral, or others in real time. Compare results, split-test performance, and keep your agents provider-agnostic by design.",
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

const PluginIntegrations = () => {
  const feature = {
    text: "Smarter’s Plugin system gives you a no-code, YAML-based way to create fully functional LLM tools. Each Plugin defines how and when it’s invoked, using selectors that work like CSS — from keyword triggers to unconditional inclusion. Connect your ChatBots and Agents to live databases, REST APIs, or sandboxed Python code — safely, seamlessly, and without glue scripts.",
    imgUrl: img_plugin,
  }

  return (
    <FeatureBlock
      heading="Extend your LLM with real-world power."
      subHeading="Smarter Plugins let any model call SQL, APIs, static data, or secure Python — all defined declaratively."
      features={[feature]}
      orientation="right"
      boxLayout={6}
    />
  )
}

const SmarterChat = () => {

  const feature = {
    text: "The same chat interface that powers the Prompt Engineer Workbench is available as a standalone npm package. Add it to any website — from SharePoint to Salesforce, from WordPress to custom apps — and instantly connect users to your Smarter ChatBots. It’s fully configurable, works with any Smarter deployment, and blends seamlessly with your existing design system.",
    imgUrl: img_smarter_chat,
    link: {
        url: 'https://github.com/smarter-sh/smarter-chat',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }
  }

  return (
    <FeatureBlock
      heading="Drop powerful AI chat into any web page."
      subHeading="Smarter Chat is a React component that connects directly to your deployed ChatBot APIs — no setup, no dependencies"
      features={[feature]}
      orientation="left"
      boxLayout={6}
    />
  )
}

const EnterpriseGovernance = () => {

  const feature = {
    text: "Smarter gives organizations a centralized framework for managing AI at scale. Enforce resource limits, moderation policies, and approval workflows across teams while maintaining complete auditability. Track costs, monitor usage, archive production prompts, and maintain a verifiable history of every AI interaction. Whether you’re deploying a single chatbot or hundreds of AI-powered services, Smarter helps ensure consistent, compliant, and accountable operations.",
    imgUrl: img_smarter_chat,
    link: {
        url: 'https://github.com/smarter-sh/smarter-chat',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }
  }

  return (
    <FeatureBlock
      heading="Enterprise Governance Built In"
      subHeading="Bring visibility, accountability, and control to every AI resource—from design to deployment."
      features={[feature]}
      orientation="left"
      boxLayout={6}
    />
  )
}

const ServerLogView = () => {

  const vid_log_view = `${CDN}/videos/terminal-emulator-logs.mp4`

  const feature = {
    text: "Smarter server log view provides prompt engineers with a personalized, live, real-time stream of their backend activity — from incoming requests to security checks, resource provisioning, prompt preparation, interim LLM API responses, and outgoing responses. Each log entry includes detailed metadata, such as timestamps, request IDs, user information, and execution details.",
    imgUrl: vid_log_view,
    link: {
        url: 'https://docs.smarter.sh/smarter-framework/developer-reference/smarter-dashboard/views/logs/api/streams.html',
        text: 'Learn More',
        lucide_icon: 'lucide:book-open',
      }
  }

  return (
    <FeatureBlock
      heading="Live Server Log View"
      subHeading="Monitor and analyze server logs in real-time with our integrated terminal emulator."
      features={[feature]}
      orientation="left"
      boxLayout={6}
    />
  )
}

const Features = () => {
  return (
    <div id="features" className="w-full px-4 sm:px-6 lg:px-0">
      <FeatureYaml />
      <PluginIntegrations />
      <EnterpriseGovernance />
      <FeaturePromptEngineerWorkbench />
      <ServerLogView />
      <UnifiedLLMInterface />
      <SmarterChat />
    </div>
  )
}

export default Features
