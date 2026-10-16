import Section from '@/components/site/Section'
import Showcase from '@/components/site/Showcase'
import Button from '@/components/site/Button'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { cn } from '@/helpers/cn'
import { accent, accentCycle } from '@/helpers/accent'
import guardrailsImg from '@/assets/images/screens/guardrails.webp'
import extensionsImg from '@/assets/images/screens/extensions.webp'
import { erp, examples, questions, resources, safety } from '../data'

// The theme's colored tool tiles.
export const WhatYouBuild = () => {
  return (
    <Section
      id="what-you-build"
      accent="violet"
      eyebrow="Phase 2 · Production"
      title="What your people will build"
      intro="These four patterns cover much of what organizations ask for first, and each is something Smarter does today."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {examples.map((item, idx) => (
          <div
            key={item.title}
            className="group rounded-2xl bg-default-950/40 p-8 backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:bg-default-950/70"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div
              className={cn(
                'mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl',
                item.iconClass
              )}
            >
              <IconifyIcon icon={item.icon} className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-medium text-white">{item.title}</h3>
            <p className="text-default-300">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export const SafeByDefault = () => {
  return (
    <Showcase
      id="safe-by-default"
      accent="sky"
      eyebrow="Built in, not bolted on"
      title="Safe by default, not by policy memo"
      image={guardrailsImg}
      alt="The Guardrails page of the Smarter web console, listing input and output guardrails"
      callouts={['18 ready-made guardrails', 'Checked on every message']}
    >
      <p className="mb-8 text-lg text-default-200">
        A policy memo asks people to remember the rules. Smarter enforces them on every
        message, for every assistant, whoever built it.
      </p>
      <ul className="space-y-5">
        {safety.map((item) => (
          <li key={item.title} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
              <IconifyIcon icon={item.icon} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="text-sm text-default-300">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Showcase>
  )
}

export const Extend = () => {
  return (
    <Showcase
      id="extend"
      accent="violet"
      reverse
      eyebrow="Extensible"
      title="Connect it to everything you already run"
      image={extensionsImg}
      alt="The Extensions page of the Smarter web console, with three official extensions installed"
      callouts={['Installed from a signed registry']}
    >
      <p className="mb-6 text-lg text-default-200">
        Assistants read your documents, query approved databases, call your systems and
        use any MCP server. When a tool doesn’t exist, a developer packages one in Python
        and an administrator installs it from the console, the way WordPress installs
        plugins.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button href="/extensions" icon="lucide:puzzle">
          Extensions
        </Button>
        <Button href="/integrations" variant="secondary" icon="lucide:globe">
          Website integrations
        </Button>
      </div>
    </Showcase>
  )
}

export const ErpForAi = () => {
  return (
    <Section
      id="erp-for-ai"
      accent="sky"
      glow
      eyebrow="The destination"
      title="An ERP for AI resources"
      intro="An “AI resource” is anything an organization must own, approve, pay for or answer for in order to use AI. In Smarter, each one is a named, owned, recorded item, like an invoice or an employee record."
    >
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {resources.map((name, idx) => (
          <span
            key={name}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm text-default-100',
              accent(accentCycle[idx % accentCycle.length]).chip
            )}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-default-950/40 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-default-950/70 text-default-200">
              <tr>
                <th className="px-6 py-4 font-medium">What your ERP manages</th>
                <th className="px-6 py-4 font-medium text-sky-400">
                  What Smarter manages for AI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {erp.map(([left, right]) => (
                <tr key={left}>
                  <td className="px-6 py-4 text-default-300">{left}</td>
                  <td className="px-6 py-4 text-default-100">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-white/10 bg-gradient-to-br from-sky-500/15 to-violet-500/10 p-8 lg:col-span-2 lg:border-s lg:border-t-0">
          <h3 className="mb-5 text-xl font-medium text-white">
            Questions leadership can finally answer
          </h3>
          <ul className="space-y-3">
            {questions.map((question) => (
              <li key={question} className="flex items-start gap-3 text-default-100">
                <IconifyIcon
                  icon="lucide:circle-check"
                  className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                />
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
