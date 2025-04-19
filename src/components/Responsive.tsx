import { useResponsive } from '../context/ResponsiveContext.tsx'
import type { ReactNode } from 'react'

type ResponsiveProps = {
  children: ReactNode
}

export const Desktop: FC<ResponsiveProps> = ({ children }) => {
  const { isMobile, isTablet } = useResponsive()
  return !isMobile && !isTablet && <>{children}</>
}

export const Mobile: FC<ResponsiveProps> = ({ children }) => {
  const { isMobile } = useResponsive()
  return isMobile && <>{children}</>
}

export const Tablet: FC<ResponsiveProps> = ({ children }) => {
  const { isTablet } = useResponsive()
  return isTablet && <>{children}</>
}

export const TabletOrMobile: FC<ResponsiveProps> = ({ children }) => {
  const { isMobile, isTablet } = useResponsive()
  return (isMobile || isTablet) && <>{children}</>
}

export const DesktopOrTablet: FC<ResponsiveProps> = ({ children }) => {
  const { isMobile } = useResponsive()
  return !isMobile && <>{children}</>
}
