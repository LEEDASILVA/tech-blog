import { createContext, useContext, useState, useEffect } from 'react'

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
}

type ResponsiveContextType = {
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  windowWidth: number
}

const ResponsiveContext = createContext<ResponsiveContextType>({
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: true,
  windowWidth: 1200,
})

export const ResponsiveProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : breakpoints.desktop,
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const value = {
    isMobile: windowWidth < breakpoints.tablet,
    isTablet:
      windowWidth >= breakpoints.tablet && windowWidth < breakpoints.laptop,
    isLaptop:
      windowWidth >= breakpoints.laptop && windowWidth < breakpoints.desktop,
    isDesktop: windowWidth >= breakpoints.desktop,
    windowWidth,
  }

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export const useResponsive = () => useContext(ResponsiveContext)
