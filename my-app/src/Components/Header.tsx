import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

interface HeaderProps {
  onSlash: () => void;
  onMobileViewChange: (isMobile: boolean) => void;
  isSlashing: boolean;
}

export const Header = ({
  onSlash,
  onMobileViewChange,
  isSlashing,
}: HeaderProps) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const zoroQuotes = [
    {
      jp: "「己を信じぬ者に、努力の価値はない！」",
      en: "Those who don't believe in themselves don't deserve to strive!",
    },
    {
      jp: "「正義のために戦う者は、決して影に隠れない！」",
      en: "One who fights for justice never hides in the shadows!",
    },
    {
      jp: "「仮面の下にあるのは、恐れではなく信念だ！」",
      en: "Beneath the mask lies not fear, but conviction!",
    },
    {
      jp: "「剣は力ではない。信念こそが鋭さを与えるのだ！」",
      en: "The sword is not power — it's belief that gives it its edge!",
    },
    {
      jp: "「誰かのために立ち上がる、それが真の強さだ！」",
      en: "To rise for someone else — that is true strength!",
    },
    {
      jp: "「影は光があるから生まれる。私はその証だ！」",
      en: "A shadow is born from light — and I am the proof!",
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
      onMobileViewChange(isMobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [onMobileViewChange]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileView) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % zoroQuotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobileView]);

  const navLinks = [
    { jp: "斬撃", en: "Works", href: "#works" },
    { jp: "武士道", en: "About", href: "#about" },
    { jp: "戦い", en: "Contact", href: "#contact" },
  ];

  return (
    <header className="header-container">
      <div className="header-top">
        <motion.h1
          ref={titleRef}
          className="header-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          onClick={onSlash}
        >
          <Link to="/">
            三刀流 <span className="title-slash">|</span> Santoryu
          </Link>
          <AnimatePresence>
            {isSlashing && (
              <div className="blood-drip-container">
                <motion.div
                  className="blood-drip blood-drip-1"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "60%", opacity: 0.95 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    ease: [0.68, -0.55, 0.265, 1.55],
                  }}
                />
                <motion.div
                  className="blood-drip blood-drip-2"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "50%", opacity: 0.9 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{
                    duration: 2.2,
                    ease: [0.68, -0.55, 0.265, 1.55],
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="blood-drip blood-drip-3"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "55%", opacity: 0.85 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{
                    duration: 2.3,
                    ease: [0.68, -0.55, 0.265, 1.55],
                    delay: 0.4,
                  }}
                />
              </div>
            )}
          </AnimatePresence>
        </motion.h1>

        {isMobileView && (
          <button
            className="burger-button"
            onClick={() => {
              setMobileMenuOpen(!isMobileMenuOpen);
              onSlash();
            }}
            aria-label="Menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 5 },
              }}
              className="burger-line"
            />
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              className="burger-line"
            />
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -5 },
              }}
              className="burger-line"
            />
          </button>
        )}
        <div className="header-logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
      </div>

      <nav className={`header-nav ${isMobileView ? "mobile-nav" : ""}`}>
        {!isMobileView ? (
          navLinks.map((link) => (
            <motion.a
              key={link.en}
              href={link.href}
              className="nav-link"
              whileHover={{ scale: 1.05, color: "var(--zoro-blood)" }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={onSlash}
            >
              {link.jp} <span className="link-en">{link.en}</span>
            </motion.a>
          ))
        ) : (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.en}
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSlash();
                    }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {link.jp} <span>{link.en}</span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>

      {!isMobileView && (
        <motion.div
          className="quote-scroll"
          initial={{ opacity: 0, x: 50 }}
          animate={
            isScrolled ? { opacity: 0, y: -100 } : { opacity: 0.9, x: 0, y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="jp-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeIn" }}
              >
                {zoroQuotes[currentQuote].jp}
              </motion.p>
              <motion.p
                className="en-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1.5, delay: 0.9, ease: "easeIn" }}
              >
                {zoroQuotes[currentQuote].en}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className="scroll-ends"></div>
        </motion.div>
      )}
    </header>
  );
};
