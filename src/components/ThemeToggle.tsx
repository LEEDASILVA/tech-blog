import { useTheme } from '../context/ThemeContext.tsx'
import Switch from '../components/design/Switch.tsx'

const ThemeToggle: FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  return (
    <Switch
      initial={isDarkMode}
      onChange={toggleTheme}
      label={isDarkMode ? '🌙 Dark' : '☀️ Light'}
    />
  )
}

export default ThemeToggle
