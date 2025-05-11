
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)
  const mqlRef = React.useRef<MediaQueryList | null>(null)

  React.useEffect(() => {
    // Use MediaQueryList for better performance
    mqlRef.current = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(mqlRef.current?.matches ?? false)
    }
    
    // Set initial value
    handleResize()
    
    // Use the more efficient listener for MediaQueryList
    const currentMql = mqlRef.current
    currentMql.addEventListener("change", handleResize)
    
    return () => {
      currentMql.removeEventListener("change", handleResize)
    }
  }, [])

  // Return false as default until we can determine true mobile state
  return isMobile === null ? false : isMobile
}

// This hook detects iOS devices specifically
export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    
    setIsIOS(checkIOS())
  }, [])
  
  return isIOS
}

// This hook helps with handling scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = React.useState(0)
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return scrollY
}
