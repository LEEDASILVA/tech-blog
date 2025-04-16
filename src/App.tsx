import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Counter from './components/Counter.tsx'

export const App: FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <header
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-bg)',
            padding: '20px',
          }}
        >
          <h1>Blog</h1>
          <ThemeToggle />
        </header>

        <main style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-secondary)' }}>Welcome</h2>
          <p>This is an example of using CSS variables for theming.</p>

          <div
            style={{
              backgroundColor: 'var(--color-light-gray)',
              padding: '20px',
              marginTop: '20px',
              borderRadius: '4px',
            }}
          >
            <h3>Featured Article</h3>
            <p>Some components that adapts to the theme.</p>
            <button
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-bg)',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Read More
            </button>
          </div>
          <Counter label="Counter" />
        </main>
      </div>
    </ThemeProvider>
  )
}
