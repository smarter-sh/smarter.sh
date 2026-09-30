const manifest = `apiVersion: smarter.sh/v1
kind: LLMClient
metadata:
  name: data_analyst
  description: Answers business questions using our data warehouse.
spec:
  config:
    provider: openai
    defaultModel: gpt-4o-mini
  plugins:
    - sql_analyst
  mcpClients:
    - deepwiki
  guardrails:
    - prompt_injection_keyword_input
    - pii_leak_output`

const About = () => {
  return (
    <section
      id="about"
      className="py-20"
      data-aos="zoom-in"
      data-aos-easing="ease"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-medium text-white">
            What is Smarter?
          </h2>
          <p className="text-base font-medium text-default-200">
            Until now, an AI application that looks things up, uses tools and
            stays within safe limits has been a software project, written and
            maintained by engineers. Smarter replaces that code with a short,
            human-readable manifest. Describe what you want, apply it with one
            command, and Smarter handles the rest.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="rounded-xl border-s-2 border-primary bg-default-950/60 backdrop-blur-3xl">
            <div className="border-b border-default-800 px-5 py-3 font-mono text-xs text-default-400">
              data-analyst.yaml
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-default-100">
              {manifest}
            </pre>
          </div>
          <div>
            <p className="mb-4 text-base text-default-200">
              This is a complete AI application: a data analyst that answers
              questions by querying a database, can look up documentation, and
              blocks prompt injection and leaks of personal data.
            </p>
            <p className="mb-6 text-base text-default-200">
              Every resource in Smarter — chatbots, plugins, data connections,
              guardrails and secrets — is defined this way.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-default-950/60 px-4 py-3 font-mono text-sm text-primary">
              smarter apply -f data-analyst.yaml
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About
