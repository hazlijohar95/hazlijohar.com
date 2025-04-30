
/**
 * Common style patterns used throughout the application
 */

export const styles = {
  // Card patterns
  card: "rounded-xl bg-[#0F0F0F] border border-[#1A1A1A] shadow-sm overflow-hidden",
  cardContent: "p-6",
  cardHover: "transition-all duration-200 hover:shadow-md hover:border-[#333]",
  
  // Button patterns - standardized across the app to use shadcn button variants
  buttonPrimary: "bg-brand text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-dark transition-colors inline-flex items-center justify-center gap-2",
  buttonSecondary: "bg-[#1A1A1A] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#222] transition-colors inline-flex items-center justify-center gap-2",
  buttonOutline: "border border-brand text-white py-3 px-6 rounded-lg font-medium hover:bg-brand/10 transition-colors inline-flex items-center justify-center gap-2",
  buttonLink: "text-brand underline hover:text-brand-dark transition-colors inline-flex items-center justify-center gap-2",
  buttonIcon: "p-2 bg-[#1A1A1A] rounded-lg hover:bg-[#333] transition-colors inline-flex items-center justify-center",
  
  // Input patterns - standardized across the app
  input: "w-full px-4 py-3 bg-[#111] border border-[#333] rounded-lg focus:border-white outline-none transition-colors",
  
  // Section patterns
  sectionPadding: "py-16 px-6 md:px-8 lg:px-12",
  
  // Flex patterns
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  
  // Typography - using our new standardized system
  heading1: "text-3xl md:text-4xl font-bold tracking-tight",
  heading2: "text-2xl md:text-3xl font-semibold tracking-tight",
  heading3: "text-xl md:text-2xl font-medium tracking-tight",
  subheading: "font-mono text-sm uppercase text-[#999]",
  bodyLarge: "text-lg leading-relaxed",
  bodyText: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  mono: "font-mono",
  
  // Transitions
  transition: "transition-all duration-200 ease-in-out",
  
  // Special elements
  badge: "px-2 py-0.5 text-xs font-mono rounded-full",
  notification: "absolute top-0 right-0 w-4 h-4 rounded-full bg-brand text-white text-xs flex items-center justify-center",
  divider: "border-t border-[#1A1A1A] my-6",
  
  // Brand color specific elements
  brandText: "text-brand",
  brandBg: "bg-brand",
  brandBorder: "border-brand",
  brandHover: "hover:text-brand",
};

// Helper to easily combine styles with Tailwind classes
export const combineStyles = (...styleClasses: string[]) => {
  return styleClasses.join(' ');
};

/**
 * Design System Documentation
 * 
 * Colors:
 * - Background: #0F0F0F (cards), #000000 (page background)
 * - Borders: #1A1A1A (light), #333333 (medium)
 * - Text: #FFFFFF (primary), #999999 (secondary), #CCCCCC (tertiary)
 * - Primary: #FFFFFF (white for buttons)
 * - Brand: #9b87f5 (main purple), variants also available
 * 
 * Typography:
 * - Headings: Scaled sizes from text-xl to text-4xl with appropriate weights
 * - Body: Regular weight, with 3 sizes (bodyLarge, bodyText, bodySmall)
 * - Mono: Font-mono for labels, badges, and technical information
 * 
 * Components:
 * - Cards: Rounded corners (xl), dark background, subtle border
 * - Buttons: Consistent rounding (lg), padding, and hover states with brand colors
 * - Inputs: Matching the button rounding and padding for consistency
 * 
 * Usage Examples:
 * - Button: <button className={styles.buttonPrimary}>Click Me</button>
 * - Card: <div className={styles.card}><div className={styles.cardContent}>Content</div></div>
 * - Typography: <h1 className={styles.heading1}>Title</h1>
 */
