
import { useState, useEffect } from 'react';

export function useScrollObserver(
  sectionIds: string[],
  options = { threshold: 0.2 }
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (elements.length) {
      elements.forEach((element) => {
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setIsIntersecting(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
            
            // Update active section when it becomes visible
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }, options);

        observer.observe(element);
        observers.push(observer);
      });
    }

    // Cleanup
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, options.threshold]);

  return { activeSection, isIntersecting };
}
