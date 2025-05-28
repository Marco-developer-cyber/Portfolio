import { motion, AnimatePresence } from "framer-motion";
import "./Loader.css";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="loader-swords"
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="sword sword-1" />
            <div className="sword sword-2" />
            <div className="sword sword-3" />
            <motion.div
              className="slash-effect"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
          <motion.div
            className="loader-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeIn" }}
          >
            <p className="jp-text">三刀流</p>
            <p className="en-text">Santoryu</p>
          </motion.div>
          <motion.div
            className="blood-drip"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "20%", opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};