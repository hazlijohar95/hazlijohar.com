
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouteLoading } from '@/hooks/useRouteLoading';

export const GlobalLoadingIndicator = () => {
  const { isLoading } = useRouteLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
          style={{ transformOrigin: "0% 50%" }}
        />
      )}
    </AnimatePresence>
  );
};
