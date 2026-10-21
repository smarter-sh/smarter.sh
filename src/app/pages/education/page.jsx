import PageShell from '@/components/site/PageShell'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import FeatureCard from '@/components/site/FeatureCard'
import Button from '@/components/site/Button'
import CtaBand from '@/components/site/CtaBand'
import SmarterChatEmbed from '@/components/site/SmarterChatEmbed'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { chatbots } from '@/common/chatbots'
import { COMMUNITY, DOCS } from '@/common/constants'
import { Instructors as InstructorsWidget } from '@smarter.sh/ui-widgets'
import ConsoleWidgets from '@/components/site/ConsoleWidgets'

const COURSES = `${DOCS}/smarter-instructors/example-courses`

const why = [
  {
    icon: 'lucide:hammer',
    title: 'Building sticks',
    text: 'Lectures about AI fade quickly. Building something with it, and watching what it does, is what people remember.',
  },
  {
    icon: 'lucide:message-square-off',
    title: 'Chat apps don’t teach it',
    text: 'Consumer chat tools teach people to type questions, not how AI works with an organization’s own information.',
  },
  {
    icon: 'lucide:scale',
    title: 'Literate people decide better',
    text: 'AI-literate staff and graduates are better buyers, better builders and better critics of AI.',
  },
]

const outcomes = [
  'Explain what AI is, and why it sometimes makes things up',
  'Connect an assistant to approved documents and data',
  'Recognize the risks: personal data, leaks and manipulation',
  'Estimate what an AI conversation actually costs',
  'Judge which vendor’s model fits which task',
  'Spot where AI could help their own team',
]

const Education = () => {
  return (
    <PageShell
      title="Education"
      description="Teach AI by building it. Smarter gives universities, schools and training teams a free platform and 21 ready-to-teach course designs."
    >
      <PageHero
        accent="emerald"
        eyebrow="Smarter for education"
        title="Teach AI"
        highlight="by building it"
        lead="Smarter began in a University of British Columbia classroom, where non-programmers needed to learn how AI really works. Today it is a free platform and a complete, open course catalog for universities, schools and corporate training teams."
      >
        <Button href={`${COURSES}/index.html`} icon="lucide:library">
          Browse the 21 course designs
        </Button>
        <Button href="#euclid" variant="secondary" icon="lucide:message-circle">
          Meet Euclid
        </Button>
      </PageHero>

      <Section
        accent="emerald"
        eyebrow="Phase 1 · Literacy"
        title="You can’t govern what your people don’t understand"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {why.map((item) => (
            <FeatureCard accent="emerald" key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section
        accent="emerald"
        id="courses"
        eyebrow="Free course catalog"
        title="21 ready-to-teach course designs"
        intro="Each one comes with schedules, graded assignments and rubrics, capstone projects and reading lists, so an instructor can take a plan, set the dates and teach it. Free and open source, with no seat counts and no sign-up forms."
      >
        <ConsoleWidgets>
          <InstructorsWidget className="col-12" />
        </ConsoleWidgets>
      </Section>

      <Section
        accent="emerald"
        id="euclid"
        eyebrow="Built on Smarter"
        title="Euclid, a math tutor for students"
        intro="Euclid typesets equations, draws diagrams, plots functions and finds pictures. Its chalkboard look, its tools and its teaching style are all set in a 113-line manifest that an instructor can read, copy and change."
      >
        <div className="mx-auto min-h-[560px] max-w-4xl">
          <SmarterChatEmbed bot={chatbots.math} />
        </div>
      </Section>

      <Section
        accent="emerald"
        eyebrow="Outcomes"
        title="What an AI-literate learner can do"
        intro="These are outcomes, not topics: each is something a learner has done on the platform by the end of an introductory course."
      >
        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-start gap-3 rounded-lg bg-default-950/40 p-4 text-default-200"
            >
              <IconifyIcon
                icon="lucide:check"
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              />
              {outcome}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        accent="emerald"
        eyebrow="Beyond the classroom"
        title="Coursework becomes production work"
        intro="The assistant a learner builds in class runs unchanged in production. No rewrite, no second vendor."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            accent="emerald"
            icon="lucide:user"
            title="Personal sandbox"
            text="A learner builds and tests an assistant, visible only to them."
          />
          <FeatureCard
            accent="emerald"
            icon="lucide:users"
            title="Shared team space"
            text="Colleagues share and refine it, each with their own login and budget."
          />
          <FeatureCard
            accent="emerald"
            icon="lucide:globe"
            title="Live service"
            text="One command publishes it to staff, students or the public, on your own website."
          />
        </div>
      </Section>

      <CtaBand
        title="Bring Smarter to your institution"
        text="Start with one cohort and one course on a shared installation. Instructors get the platform, the course plans and the documentation for free."
      >
        <Button href={COMMUNITY} icon="lucide:users">
          Join the community
        </Button>
        <Button
          href={`${DOCS}/smarter-instructor.html`}
          variant="secondary"
          icon="lucide:book-open"
        >
          Instructor guide
        </Button>
      </CtaBand>
    </PageShell>
  )
}
export default Education
