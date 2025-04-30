
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    handleResize()
    
    // Add event listener
    window.addEventListener("resize", handleResize)
    mql.addEventListener("change", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      mql.removeEventListener("change", handleResize)
    }
  }, [])

  // Return false as default until we can determine true mobile state
  return isMobile === null ? false : isMobile
}
