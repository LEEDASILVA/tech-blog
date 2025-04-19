export const App: FC = () => {
  return (
    <div className="app">
      <main style={{ padding: '20px' }}>
        <h2 style={{ color: 'var(--color-secondary)' }}>Welcome</h2>
        <p>This is an example of using CSS variables for theming.</p>

        <div
          style={{
            backgroundColor: 'var(--color-gray)',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '4px',
          }}
        >
          <h3>Featured Article</h3>
          <p>Some components that adapts to the theme.</p>
          <button
            type="button"
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
      </main>
    </div>
  )
}
