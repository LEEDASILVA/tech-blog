interface HeaderPropsType {
  title?: string
}

const Header: FC<HeaderPropsType> = ({ title }) => {
  return (
    <header
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-bg)',
        padding: '20px',
      }}
    >
      <h1>{title}</h1>
    </header>
  )
}

export default Header
