
import React from 'react';
import { motion } from 'framer-motion';
import { useRouteLoading } from '@/hooks/useRouteLoading';

export const GlobalLoadingIndicator = () => {
  const { isLoading } = useRouteLoading();

  return (
    <>
      {isLoading && (
        <>
          {/* Top progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-white/80 to-white z-[60] origin-left"
            style={{ transformOrigin: "0% 50%" }}
          />

          {/* Subtle overlay to prevent clicks during transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 z-40 pointer-events-none"
          />
        </>
      )}
    </>
  );
};
