import { useTheme } from '../context/ThemeContext.tsx'

const ThemeToggle: FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-bg)',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

export default ThemeToggle
