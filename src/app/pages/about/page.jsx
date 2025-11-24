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
      <main className="max-w-3xl mx-auto px-4 py-12 text-default-400">
        <Hero />
        <section className="problem">
          <h2 className="text-3xl mb-6">The Original Problem</h2>
          <section className="mb-8">
            <p>
              I teach AI to non-programmers at University of British Columbia. Like most
              AI professionals at the time, I spent much of Q1-2023 discovering the
              capabilities of OpenAI's newly published{' '}
              <a
                href="https://platform.openai.com/docs/api-reference/introduction"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                REST Api
              </a>
              . In early April of that year I deployed a fun single page web app —{' '}
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
            <ol className="list-decimal list-inside my-4 space-y-3">
              <li>
                How to integrate the OpenAI Api into a web chat user interface using React
                + inexpensive serverless services from AWS. The source code for this
                project is available at{' '}
                <a
                  href="https://github.com/FullStackWithLawrence/aws-openai"
                  className="group relative inline-flex items-center gap-2 text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/FullStackWithLawrence/aws-openai
                </a>
                .
              </li>
              <li>
                An implementation of OpenAI's two dozen or so example LLM applications —{' '}
                <a
                  href="https://platform.openai.com/docs/examples"
                  className="group relative inline-flex items-center gap-2 text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAI Examples
                </a>
              </li>
              <li>
                An implementation of OpenAI's tool call example, "get_weather()"{' '}
                <a
                  href="https://platform.openai.com/docs/guides/function-calling"
                  className="group relative inline-flex items-center gap-2 text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Function Calling Guide
                </a>{' '}
                to which they refer, but oddly, they never actually implement. If that's
                what you're looking for, then follow this link{' '}
                <a
                  href="https://github.com/smarter-sh/smarter/blob/main/smarter/smarter/apps/prompt/functions/function_weather.py"
                  className="group relative inline-flex items-center gap-2 text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  function_weather.py
                </a>{' '}
                and god speed on your journey.
              </li>
            </ol>
            <p>
              Even though I'm satisfied with the end result, I was nonetheless
              disappointed in the size and breadth of the project. It's entirely too
              complicated. At more than 12,000 lines of code, it is a solidly medium-sized
              project by commercial standards, spanning complex technologies including
              React, Python, Terraform, and advanced networking concepts; all of which
              have steep learning curves. The daunting size and the complexity of the
              source code make it inaccessible to the kinds of working professionals who
              register for my courses and would most benefit from learning how to
              integrate function calls into their LLM prompts. Hence, this first attempt
              at creating a reference project was basically a bust, in that it is not an
              effective in-classroom teaching tool.
            </p>
          </section>
          <section className="mb-8">
            <p>
              This lived experience inspired the Smarter project. I wanted to abstract
              away all of the React, Python, Terraform, and network engineering, leaving
              only the LLM prompt and tool calls, editable in real-time in a
              classroom-friendly environment. And after careful thought I realized there
              was a laundry list of pretty big secondary goals as well, including:
            </p>
            <ul className="list-disc my-4 space-y-4 pl-6">
              <li>
                The ability to swap out LLM providers on the fly, and make these available
                from within the manifests such that vendor Api keys are abstracted away in
                favor of these being controlled by the institution.
              </li>
              <li>
                Adding a tool 'selector' technology that can dynamically choose which
                tools to include in a prompt based on a variety of factors, kind of like
                how CSS selectors work.
              </li>
              <li>
                Providing more visibility into the inner workings of LLM function calling,
                especially in cases where complex 'selectors' are employed, and multiple
                tools are being presented in a single chat session, and remote data
                sources are being integrated to these tools. Ideally, I wanted to extend
                the traditional chat interface to include a kind of 'debug mode' that
                introduces additional roles into the chat thread, showing how the LLM is
                reasoning about which tools to call, what data is being returned from
                these tools, and how this data is being integrated into the final
                response. And importantly, providing visibility into costing on a
                per-request basis.
              </li>
              <li>Tightly controlling API key access, because, y'know, students 🤷🏼‍♂️</li>
              <li>
                Maintaining auditable history on all chats, because, y'know, students 🤷🏼‍♂️
              </li>
              <li>
                The ability to publish chatbots to production URL endpoints that can run
                at scale.
              </li>
              <li>
                Integrating remote data sources so that chatbots can securely access real,
                live enterprise data from traditional sources like MySQL databases and
                REST Apis; meanwhile maintaining strict role-based access controls and
                audit logging.
              </li>
            </ul>
          </section>
          <section className="problem mb-8">
            <p>
              Separately, and on an aside, for several years I've aspired to teach a class
              on advanced cloud computing techniques; namely Kubernetes. To do that well,
              you need an easy-to-understand application with a real-world purpose for
              running inside massively scalable cloud infrastructure. Bonus points if this
              application turns out to be interesting to students. The approach should
              ideally involve starting simple, on a local computer with Docker Desktop,
              and then scaling up to a Kubernetes cluster. Even more bonus points if the
              techniques that you're teaching actually work out in the wild, for a real
              platform running at scale. These eventually became additional, ancillary
              objectives of the Smarter project.
            </p>
          </section>
        </section>
        <section className="solution">
          <h2 className="text-3xl mb-6">The Eventual Solution</h2>
          <section className="mb-8">
            <p>
              {' '}
              <a
                href="https://kubernetes.io/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kubernetes
              </a>{' '}
              was an early and ongoing source of design inspiration for what a "smarter"
              resource management strategy might look like. Kubernetes relies on a
              command-line tool named <code>kubectl</code> to process YAML "manifest"
              files that describe complex cloud resources. For the uninitiated, a typical
              Kubernetes manifest might look like:
            </p>
            <KubernetesManifest />
            <p>
              Kubernetes was open sourced by Google in June 2014. The project was
              originally a sparse collection of their own in-house best practices,
              perfected over time based on their own realized experience running
              containers in production for more than a decade. The joint tests of time and
              scale have proven that most cloud resources can be described using the
              Kubernetes manifest layout. So in April 2023, I set about prototyping
              something like Kubernetes, but for AI resources. To be sure, there are
              nuances. For example, Kubernetes has no front end nor user experience, while
              AI resources often do. Still, though imperfect, the comparison is close
              enough. A comparable Smarter manifest might look like:
            </p>
            <SmarterManifest />
          </section>
          <section className="mb-8">
            <p className="mb-8">
              From a design philosophy perspective, and to a large extent, the eventual
              implementation of Smarter Api is identical to that of Kubernetes.{' '}
              <code>kubectl</code> is written in Golang using the Viper and Cobra CLI
              frameworks, and so is the Smarter CLI. On the other hand, Python is the the
              lingua franca for data scientists and prompt engineers, so with that in
              mind, Smarter's backend is written in Python rather than in Golang. And not
              to beat the matter to death, but Smarter requires a web front end for the
              Prompt Engineers Workbench as well as for adminstration, and Django is an
              excellent choice for both, so that's what I used. Despite the divergence in
              language choices, both platforms work with YAML manifests and both are
              extensible. So no matter where you look, you'll see a lot of similarities.
            </p>
            <section>
              <p className="mb-8">
                Two and a half years later, Smarter is now a production-ready platform
                running at scale on AWS, used by students at UBC and other institutions.
                It is freely available to the general public, and contributors are warmly
                welcomed. Smarter is capable of deploying LLM chatbots connected to remote
                SQL databases, all defined using simple YAML manifests. The platform
                supports multiple LLM providers, dynamic tool selection, audit logging,
                and secure API key management. Best of all, Smarter abstracts away all of
                the complex infrastructure, allowing educators and students to focus
                solely on crafting effective prompts and tool calls.
              </p>

              <p className="mb-8">
                Plenty more work remains, of course. Smarter is a young project, and there
                are many hoped-for features that are yet to be implemented. Nonetheless,
                I'm proud of the project so far, and I'm excited about its potential to
                transform how AI applications are developed and taught.
              </p>
            </section>
          </section>
        </section>

        <div className="mt-12 text-base text-gray-500 text-right">
          <div>
            {' '}
            <a
              href="https://lawrencemcdaniel.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lawrence McDaniel
            </a>
            , principal author and maintainer
          </div>
          <div>Data Scientist, Full Stack Developer, Instructor at UBC</div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
