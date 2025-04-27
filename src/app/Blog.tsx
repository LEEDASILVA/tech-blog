import Header from './components/design/Header.tsx'
import Card from './components/design/Card.tsx'
import { useResponsive } from './context/ResponsiveContext.tsx'

const Blog = () => {
  const { isMobile } = useResponsive()
  return (
    <div>
      <Header title="🔮 Some Spells" />
      <div
        style={{
          margin: '10px',
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
            backend: `⚙  Backend Conjurations`,
            tools: `🛠 Development Tools`,
          }}
        />
        <Card
          title="🔐 The Authentication Guardian Spell (TO COME)"
          description={`A robust authentication system is the gatekeeper of your application. This spell provides a secure, scalable authentication implementation for backend services, covering user registration, login flows, password management.`}
          redirect="/"
          categories={{
            backend: `⚙  Backend Conjurations`,
            frontend: `🖥 Frontend Enchantments`,
            securaty: `🔐 Security Wards`,
            algorithms: `🧠 Algorithms & Data Structures`,
          }}
        />
        <Card
          title="📜 Codemirror framework (TO COME)"
          description={`State management across React and Codemirror.`}
          redirect="/blog/codemirror"
          categories={{
            algorithms: `🧠 Algorithms & Data Structures`,
            frontend: `🖥 Frontend Enchantments`,
          }}
        />
        <Card
          title="🧙 How to use git command (TO COME)"
          description={`Common and daily use of git commands.`}
          redirect="/"
          categories={{ tools: `🛠 Development Tools` }}
        />
        <Card
          title="🧙 Animation Sorcery (TO COME)"
          description={`A powerful incantation for bringing web elements to life through the mystical arts of Anime.js. This spell enables the practitioner to craft smooth, sophisticated animations with minimal effort, transforming static web pages into dynamic, engaging experiences.`}
          redirect="/"
          categories={{
            frontend: `🖥 Frontend Enchantments`,
            tools: `🛠 Development Tools`,
          }}
        />
      </div>
    </div>
  )
}

export default Blog
