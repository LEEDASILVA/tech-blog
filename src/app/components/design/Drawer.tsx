import { useEffect, useState, useRef } from 'react'

interface AnimatedDrawerProps {
  isOpen: boolean
  onClose: () => void
  position?: 'left' | 'right' | 'top' | 'bottom'
  children: React.ReactNode
  size?: string
  overlayColor?: string
  drawerColor?: string
  animationDuration?: number
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const Drawer: FC<AnimatedDrawerProps> = ({
  isOpen,
  onClose,
  position = 'left',
  children,
  size = '300px',
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  drawerColor,
  animationDuration = 300,
  closeOnOutsideClick = true,
  showCloseButton = true,
  header,
  footer,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // handle animations and visibility states
  useEffect(() => {
    if (isOpen && !isVisible) {
      setIsVisible(true)
      // small delay to ensure the drawer is in the DOM before animating
      setTimeout(() => setIsAnimating(true), 10)
    } else if (!isOpen && isVisible) {
      setIsAnimating(false)
      // wait for animation to complete before removing from DOM
      const timer = setTimeout(() => setIsVisible(false), animationDuration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, animationDuration, isVisible])

  // handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      // prevent scrolling when drawer is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = ''
    }
  }, [isVisible, onClose, closeOnOutsideClick])

  if (!isVisible) {
    return null
  }

  // calculate transform and dimension styles based on position
  const getPositionStyles = () => {
    let positionStyles: CSSProperties = {
      position: 'fixed',
      backgroundColor: drawerColor || 'var(--color-bg)',
      transition: `transform ${animationDuration}ms ease`,
      zIndex: 1001,
      overflowY: 'auto',
    }

    switch (position) {
      case 'left':
        positionStyles = {
          ...positionStyles,
          top: 0,
          left: 0,
          height: '100%',
          width: size,
          transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        }
        break
      case 'right':
        positionStyles = {
          ...positionStyles,
          top: 0,
          right: 0,
          height: '100%',
          width: size,
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
        }
        break
      case 'top':
        positionStyles = {
          ...positionStyles,
          top: 0,
          left: 0,
          width: '100%',
          height: size,
          transform: isAnimating ? 'translateY(0)' : 'translateY(-100%)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }
        break
      case 'bottom':
        positionStyles = {
          ...positionStyles,
          bottom: 0,
          left: 0,
          width: '100%',
          height: size,
          transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
        }
        break
    }
    return positionStyles
  }

  const getCloseButtonPosition = (): React.CSSProperties => {
    switch (position) {
      case 'left':
        return { top: '1rem', right: '1rem' }
      case 'right':
        return { top: '1rem', left: '1rem' }
      case 'top':
        return { bottom: '1rem', right: '1rem' }
      case 'bottom':
        return { top: '1rem', right: '1rem' }
      default:
        return { top: '1rem', right: '1rem' }
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: overlayColor,
        zIndex: 1000,
        transition: `opacity ${animationDuration}ms ease`,
        opacity: isAnimating ? 1 : 0,
        pointerEvents: isAnimating ? 'auto' : 'none',
      }}
    >
      <div
        ref={drawerRef}
        style={getPositionStyles()}
        role="dialog"
        aria-modal="true"
      >
        {header && (
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--color-accent)',
            }}
          >
            {header}
          </div>
        )}

        <div
          style={{
            padding: '1rem',
            height: header || footer ? 'calc(100% - 80px)' : '100%',
            overflowY: 'auto',
          }}
        >
          {showCloseButton && !header && (
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute',
                ...getCloseButtonPosition(),
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem',
                color: 'var(--color-text)',
                zIndex: 1,
              }}
              aria-label="Close drawer"
            >
              ✕
            </button>
          )}
          {children}
        </div>

        {footer && (
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid var(--color-accent)',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: drawerColor || 'var(--color-bg)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
