import PageMetaData from '@/components/PageMetaData'
import Background1 from '@/components/Background1'
import TopNavbar from '@/components/TopNavbar'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import { KubernetesManifest, SmarterManifest } from './components/Code'

const About = () => {
  return (
    <>
      <PageMetaData title="About" />
      <Background1 />
      <TopNavbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Hero />
        <section className="mb-8">
          <p>
            I teach AI to non-programmers at University of British Columbia. Like most AI
            professionals at the time, I spent much of Q1-2023 discovering the
            capabilities of OpenAI's newly announced{' '}
            <a
              href="https://platform.openai.com/docs/api-reference/introduction"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              REST Api
            </a>
            . That same month I published a fun single page web app —{' '}
            <a
              href="https://openai.lawrencemcdaniel.com/"
              className="group relative inline-flex items-center gap-2 text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full"></span>
              openai.lawrencemcdaniel.com
            </a>{' '}
            — demonstrating three things:
          </p>
          <ol className="list-decimal list-inside my-4 space-y-1">
            <li>
              How to integrate the OpenAI Api into a web chat user interface using React +
              inexpensive serverless services from AWS
            </li>
            <li>
              An implementation of OpenAI's example LLM applications —{' '}
              <a
                href="https://platform.openai.com/docs/examples"
                className="group relative inline-flex items-center gap-2 text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full"></span>
                OpenAI Examples
              </a>
            </li>
            <li>
              An implementation of OpenAI's tool call example for "get_weather"{' '}
              <a
                href="https://platform.openai.com/docs/guides/function-calling"
                className="group relative inline-flex items-center gap-2 text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full"></span>
                Function Calling
              </a>{' '}
              to which they refer, but oddly, they never actually implement
            </li>
          </ol>
          <p>
            The source code for this project is open source and freely downloadable here,{' '}
            <a
              href="https://github.com/FullStackWithLawrence/aws-openai"
              className="group relative inline-flex items-center gap-2 text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="absolute -bottom-0 h-px w-7/12 rounded bg-primary/80 transition-all duration-500 group-hover:w-full"></span>
              GitHub
            </a>
            . While I like the end result, I was disappointed in the size and breadth of
            the project. At more than 12,000 lines of code, it is a solidly medium-sized
            project by commercial standards, spanning React, Python, Terraform, and
            advanced networking concepts. This makes it inaccessible to the kinds of
            working professionals who register for my courses and would most benefit from
            learning how to integrate function calls into their LLM prompts. Hence, this
            project is not an effective in-classroom teaching tool.
          </p>
        </section>
        <section className="mb-8">
          <p>
            This lived experience inspired the Smarter project. I wanted to abstract away
            all of the React, Python, Terraform, and network engineering, leaving only the
            LLM prompt and tool calls, editable in real-time in a classroom-friendly
            environment. Other goals included:
          </p>
          <ul className="list-disc list-inside my-4 space-y-1">
            <li>Swap out LLM providers on the fly</li>
            <li>Tightly control API key access</li>
            <li>Maintain history and an audit trail on all chats</li>
            <li>Publish chatbots to production URL endpoints that could scale</li>
            <li>
              Connect LLM tools to remote data sources like MySQL databases and other REST
              APIs
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <p>
            For several years, I've aspired to teach a class on advanced cloud computing
            techniques, namely Kubernetes. To do that well, you need an easy-to-understand
            application with a real-world purpose for running inside massively scalable
            cloud infrastructure. Bonus points if it's interesting to students. The
            approach involves starting simple, on a local computer with Docker Desktop,
            and scaling up to a Kubernetes cluster. Even more bonus points if the
            techniques work in the wild, for a real platform running at scale. These are
            the other objectives of the Smarter project.
          </p>
        </section>
        <section className="mb-8">
          <p>
            Kubernetes was an early and ongoing source of design inspiration for what a
            "good" platform might look like. Kubernetes relies on a command-line tool
            named <code>kubectl</code> to process YAML "manifest" files that describe
            complex cloud resources. For the uninitiated, a typical Kubernetes manifest
            might look like:
          </p>
          <KubernetesManifest />
          <p>
            The joint tests of time and scale have proven that most cloud resources can be
            described using this layout. In March 2023, I set out to create something like
            Kubernetes, but for AI resources. There are nuances: Kubernetes has no front
            end or user experience, while AI resources do. Still, the comparison is close.
            A comparable Smarter manifest might look like:
          </p>
          <SmarterManifest />
        </section>
        <section>
          <p>
            To a large extent, the implementations are identical. <code>kubectl</code> is
            written in Golang using the Viper and Cobra CLI frameworks, and so is the
            Smarter CLI. On the other hand, Python and JS are the languages of choice for
            data scientists and prompt engineers, so Smarter's backend uses these instead
            of Golang. Despite the language choices, both work with YAML manifests and are
            extensible. So no matter where you look, you'll see a lot of similarities.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default About
