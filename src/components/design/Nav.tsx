import { useState } from 'react'
import ThemeToggle from '../ThemeToggle.tsx'
import Logo from '../design/Logo.tsx'
import { Menu, X } from '../design/Icons.tsx'
import { TabletOrMobile, Desktop } from '../Responsive.tsx'
import { Drawer } from '../design/Drawer.tsx'
import { useNavigate } from 'react-router-dom'

const pages = [
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
const Nav: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  return (
    <nav
      style={{
        width: '100%',
        backgroundColor: 'var(--color-light-gray)',
        color: 'var(--color-text)',
      }}
    >
      <div
        style={{
          maxWidth: '100rem',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
            background: 'none',
            border: 'none',
          }}
        >
          <Logo />
        </button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Desktop>
            <div
              style={{
                marginLeft: '2.5rem',
                marginRight: '2.5rem',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
              }}
            >
              {pages.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    color: 'var(--color-secondary)',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </Desktop>
          <TabletOrMobile>
            <button
              type="button"
              onClick={toggleMobileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10%',
                background: 'none',
                border: 'none',
              }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <Drawer
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              position="bottom"
              width="80%"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {pages.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      padding: '0.75rem',
                      color: 'var(--color-secondary)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--color-accent)',
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Drawer>
          </TabletOrMobile>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Nav
