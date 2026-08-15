import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1500; // 1.5 seconds
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCounter(start);
      if (start === end) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 400); // Brief pause at 100%
      }
    }, incrementTime);

    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory text-ink"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink tracking-wide mb-6">
              Aye Sandar Tun
            </h1>
            <div className="font-sans text-sm text-muted tracking-widest uppercase">
              {counter}%
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute bottom-0 left-0 h-[3px] bg-raspberry origin-left w-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
