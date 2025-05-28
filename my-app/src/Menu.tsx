import './App.css';
import { Header } from './Components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { useState, useRef } from 'react';
// import SwordModel from './Components/SwordModel';

// Хук для звуков меча
const useSwordSound = () => {
  const sounds = useRef([
    new Howl({ src: ['https://assets.codepen.io/21542/sword-slash-1.mp3'] }),
    new Howl({ src: ['https://assets.codepen.io/21542/sword-slash-2.mp3'] }),
  ]);

  const play = () => {
    const sound = sounds.current[Math.floor(Math.random() * sounds.current.length)];
    sound.play();
  };

  return play;
};

function Menu() {
  const [isSlashing, setIsSlashing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const playSwordSound = useSwordSound();

  // Обработчик анимации рассечения
  const handleSlash = () => {
    setIsSlashing(true);
    playSwordSound();
    setTimeout(() => setIsSlashing(false), 500);
  };

  // Кровавые капли по всему экрану
  const bloodDrops = Array.from({ length: isMobileView ? 0 : 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
  }));

  return (
      <div className="app-container">
        {/* Эффект "рассечения" */}
        <AnimatePresence>
          {isSlashing && (
            <motion.div
              className="slash-effect"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Кровавые капли по всему экрану */}
        <AnimatePresence>
          {isSlashing &&
            bloodDrops.map((drop) => (
              <motion.div
                key={drop.id}
                className="blood-drop"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: drop.delay, duration: 0.8 }}
                style={{ left: `${drop.x}%`, top: `${drop.y}%`, position: "absolute" }}
              />
            ))}
        </AnimatePresence>

        <Header onSlash={handleSlash} onMobileViewChange={setIsMobileView} isSlashing={isSlashing} />
        {/* <SwordModel isSlashing={isSlashing} /> */}

        {/* Фон с анимацией */}
      </div>
  );
}

export default Menu