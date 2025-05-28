// import React from "react";
import { motion } from "framer-motion";
import "../Styles/Header.css";

export const Header = () => {
  // Анимация для "кровавых капель" (появляются случайно)
  const bloodDrops = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 30,
    delay: Math.random() * 2
  }));

  return (
    <header className="header-container">
      {/* Кровавые капли (анимированные) */}
      {bloodDrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="blood-drop"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: drop.delay, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
        />
      ))}

      {/* Заголовок с эффектом "вспышки" */}
      <motion.h1
        className="header-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        三刀流 <span className="title-slash">|</span> Santoryu
      </motion.h1>

      {/* Навигация с эффектом "рассечения" */}
      <nav className="header-nav">
        <motion.a
          href="#works"
          className="nav-link"
          whileHover={{ scale: 1.05, color: "#8B0000" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          斬撃 <span className="link-en">Works</span>
        </motion.a>
        <motion.a
          href="#about"
          className="nav-link"
          whileHover={{ scale: 1.05, color: "#8B0000" }}
        >
          武士道 <span className="link-en">About</span>
        </motion.a>
        <motion.a
          href="#contact"
          className="nav-link"
          whileHover={{ scale: 1.05, color: "#8B0000" }}
        >
          戦い <span className="link-en">Contact</span>
        </motion.a>
      </nav>
    </header>
  );
};