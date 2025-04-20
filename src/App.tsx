import Header from './components/design/Header.tsx'
import Card from './components/design/Card.tsx'
import { useResponsive } from './context/ResponsiveContext.tsx'

const categories = {
  frontend: `🖥️ Frontend Enchantments`,
  backend: `⚙️  Backend Conjurations`,
  devops: `🔧 DevOps Rituals`,
  tools: `🛠️ Development Tools`,
  securaty: `🔐 Security Wards`,
  algorithms : `🧠 Algorithms & Data Structures`
}

const Section: FC<{
  description: string
  title?: string
  isMobile: boolean
}> = ({ description, title, isMobile }) => {
  const responsive = isMobile ? (
    <h3 className="section-title" style={{ color: 'var(--color-secondary)' }}>
      {title}
    </h3>
  ) : (
    <h2 className="section-title">{title}</h2>
  )
  return (
    <div className="section">
      {title && responsive}
      <p className="section-description">{description}</p>
    </div>
  )
}

export const App: FC = () => {
  const { isMobile, isTablet } = useResponsive()

  return (
    <div className="app">
      <Header title="Code Grimoire" />
      <main
        style={{
          maxWidth: '100rem',
          width: '100%',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Section
          isMobile={isMobile || isTablet}
          description="Welcome to Code Grimoire, my digital sanctuary of technical knowledge.
          This site serves as both my personal notebook for technical
          discoveries and a public resource for fellow developers and tech
          enthusiasts."
          title="Personal Knowledge Base & Technical Documentation"
        />

        <Section
          isMobile={isMobile || isTablet}
          description={`The term "grimoire" traditionally refers to a book of magic spells and invocations. Similarly, this Code Grimoire is my collection of technical "spells" - solutions, patterns, configurations, and insights I've gathered throughout my journey in software development.`}
          title="About This Site"
        />

        <p style={{ marginBottom: '10px' }}>Here you'll find:</p>
        <ul>
          <li>Detailed documentation of technologies I've worked with</li>
          <li>Problem-solving approaches and solutions</li>
          <li>Code snippets and examples</li>
          <li>Best practices and lessons learned</li>
          <li>Technical deep dives and explorations</li>
        </ul>

        <Section
          isMobile={isMobile || isTablet}
          title="Why Public?"
          description={`While this site primarily serves as my personal knowledge base, I've made it public for several reasons:`}
        />

        <ul>
          <li>To give back to the tech community</li>
          <li>
            To share knowledge that might help others facing similar challenges
          </li>
          <li>To connect with like-minded individuals</li>
        </ul>

        <div>
          <h2>🔮 Some Spells</h2>
          <div
            style={{
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
              gap: '20px',
            }}
          >
            <Card
              title="🧪 Container Binding Ritual (TO COME)"
              description={`A reliable workflow for connecting containerized services with
                minimal configuration.`}
              redirect="/"
              categories={{
                devops: `🔧 DevOps Rituals`,
                backend: `⚙️  Backend Conjurations`,
                tools: `🛠️ Development Tools`,
              }}
            />
            <Card
              title="🔐 The Authentication Guardian Spell (TO COME)"
              description={`A robust authentication system is the gatekeeper of your application. This spell provides a secure, scalable authentication implementation for backend services, covering user registration, login flows, password management.`}
              redirect="/"
              categories={{
                backend: `⚙️  Backend Conjurations`,
                frontend: `🖥️ Frontend Enchantments`,
                securaty: `🔐 Security Wards`,
                algorithms : `🧠 Algorithms & Data Structures`
              }}
            />
            <Card
              title="📜 Codemirror framework (TO COME)"
              description={`State management across React and Codemirror.`}
              redirect="/"
              categories={{
                algorithms : `🧠 Algorithms & Data Structures`,
                frontend: `🖥️ Frontend Enchantments`,
              }}
            />
            <Card
              title="🧙 How to use git command (TO COME)"
              description={`Common and daily use of git commands.`}
              redirect="/"
              categories={{tools: `🛠️ Development Tools`}}
            />
           </div>
        </div>
      </main>
    </div>
  )
}
