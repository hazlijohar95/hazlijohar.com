
/**
 * Common style patterns used throughout the application
 */

export const styles = {
  // Card patterns
  card: "rounded-lg bg-white border border-gray-200 shadow-sm overflow-hidden",
  cardHover: "transition-all duration-200 hover:shadow-md hover:border-gray-300",
  
  // Button patterns
  buttonPrimary: "bg-white text-black py-3 font-medium hover:bg-[#f2f2f2] transition-colors",
  buttonSecondary: "bg-black text-white py-3 font-medium hover:bg-[#222] transition-colors",
  buttonOutline: "bg-transparent border border-current py-3 font-medium transition-colors",
  
  // Input patterns
  input: "w-full px-4 py-3 bg-[#111] border border-[#333] focus:border-white outline-none transition-colors",
  
  // Section patterns
  sectionPadding: "py-24 px-6 md:px-20",
  
  // Flex patterns
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  
  // Typography
  heading: "font-medium leading-tight tracking-tight",
  subheading: "font-mono text-sm uppercase",
  bodyText: "text-base leading-relaxed",
  
  // Transitions
  transition: "transition-all duration-200 ease-in-out",
};

// Helper to easily combine styles with Tailwind classes
export const combineStyles = (...styleClasses: string[]) => {
  return styleClasses.join(' ');
};
