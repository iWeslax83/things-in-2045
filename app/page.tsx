'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, Glasses, Globe, Zap, Users, Sparkles, 
  ChevronLeft, ChevronRight, Maximize, X, Play, Pause, Volume2, VolumeX,
  Download, Github, Code,
  LucideIcon
} from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  icon: LucideIcon;
  gradient: string;
  transitionType: string;
  features?: string[];
  isClosing?: boolean;
}

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

interface TextRevealProps {
  text: string;
  delay?: number;
}

interface SlideProps {
  slide: SlideData;
}

// ============================================
// SLIDES DATA
// ============================================
const slidesData: SlideData[] = [
  {
    id: 1,
    title: "EĞİTİM 2045",
    subtitle: "Geleceğin Öğrenme Deneyimi",
    text: "Yapay zeka, sanal gerçeklik ve kişiselleştirilmiş öğrenme ile eğitimde yeni bir çağ başlıyor",
    icon: Sparkles,
    gradient: "from-cyan-600 via-blue-600 to-purple-700",
    transitionType: "slide"
  },
  {
    id: 2,
    title: "Yapay Zeka Öğretmenler",
    subtitle: "Her Öğrenci İçin Kişisel Mentor",
    text: "24/7 erişilebilir, sınırsız sabırlı ve her öğrencinin öğrenme stiline uyum sağlayan AI öğretmenler",
    icon: Brain,
    gradient: "from-purple-600 via-pink-600 to-red-600",
    transitionType: "fade",
    features: [
      "Anlık geri bildirim ve adaptif müfredat",
      "Duygusal zeka ile motivasyon desteği",
      "50+ dilde eş zamanlı öğretim"
    ]
  },
  {
    id: 3,
    title: "Sanal Gerçeklik Sınıfları",
    subtitle: "Sınırları Aşan Öğrenme",
    text: "Mars'ta yürüyün, antik Roma'yı keşfedin, atom içinde gezinin - öğrenme artık sınırsız",
    icon: Glasses,
    gradient: "from-blue-600 via-cyan-600 to-teal-600",
    transitionType: "flip",
    features: [
      "İmmersiv deneyimlerle %80 daha iyi öğrenme",
      "Tehlikeli deneyleri güvenle gerçekleştirme",
      "Tarihi olayları ilk elden yaşama"
    ]
  },
  {
    id: 4,
    title: "Kişiselleştirilmiş Öğrenme",
    subtitle: "Herkes Kendi Hızında",
    text: "AI analizi ile her öğrencinin güçlü ve zayıf yönleri tespit edilir, özel öğrenme yolu oluşturulur",
    icon: Zap,
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    transitionType: "zoom",
    features: [
      "Gerçek zamanlı performans izleme",
      "Dinamik zorluk ayarlaması",
      "İlgi alanlarına özel içerik"
    ]
  },
  {
    id: 5,
    title: "Küresel Eğitim Ağları",
    subtitle: "Dünya Vatandaşları Yetiştirme",
    text: "Farklı kültürlerden öğrenciler sanal sınıflarda buluşuyor, küresel projeler üretiyor",
    icon: Globe,
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    transitionType: "slide",
    features: [
      "7 kıtadan öğrencilerle ortak projeler",
      "Kültürler arası anlayış ve empati",
      "Gerçek dünya problemlerine çözümler"
    ]
  },
  {
    id: 6,
    title: "Artırılmış Gerçeklik Uygulamaları",
    subtitle: "Fiziksel ve Dijital Dünyaların Birleşimi",
    text: "AR gözlüklerle gerçek dünyaya dijital bilgi katmanları ekleniyor, öğrenme her yerde",
    icon: Users,
    gradient: "from-pink-600 via-rose-600 to-red-600",
    transitionType: "fade",
    features: [
      "Kitap sayfalarından 3D modeller fırlıyor",
      "Müzelerde tarihi figürlerle konuşma",
      "Sokakta yürürken dil öğrenme"
    ]
  },
  {
    id: 7,
    title: "Geleceği Birlikte İnşa Ediyoruz",
    subtitle: "Eğitim Devrimi Başladı",
    text: "2045'te her çocuk, potansiyelini tam olarak gerçekleştirebileceği bir eğitim sistemine erişecek",
    icon: Sparkles,
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    transitionType: "zoom",
    isClosing: true
  }
];
// ============================================
// WEB AUDIO API - SES SİSTEMİ
// ============================================
const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 'any' yerine type assertion kullan
      const AudioContextClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const context = new AudioContextClass();
        setAudioContext(context);
      }
    }
  }, []);

  const playWhoosh = useCallback((direction: number = 1) => {
    if (isMuted || !audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = 'sine';
      const startFreq = direction > 0 ? 200 : 400;
      const endFreq = direction > 0 ? 400 : 200;
      oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Ses hatası:', e);
    }
  }, [isMuted, audioContext]);

  const playClick = useCallback(() => {
    if (isMuted || !audioContext) return;
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
      console.log('Ses hatası:', e);
    }
  }, [isMuted, audioContext]);

  return { playWhoosh, playClick, isMuted, setIsMuted };
};

// ============================================
// TEXT REVEAL - TYPEWRITER EFFECT
// ============================================
const TextReveal: React.FC<TextRevealProps> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setIndex(prev => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    setDisplayedText(text.slice(0, index));
  }, [index, text]);

  return (
    <span>
      {displayedText}
      {index < text.length && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

// ============================================
// SLIDE COMPONENT
// ============================================
const Slide: React.FC<SlideProps> = ({ slide }) => {
  const Icon = slide.icon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gradient renkleri manuel olarak tanımla
  const gradientStyles: { [key: string]: string } = {
    "from-cyan-600 via-blue-600 to-purple-700": "linear-gradient(to bottom right, #0891b2, #2563eb, #7c3aed)",
    "from-purple-600 via-pink-600 to-red-600": "linear-gradient(to bottom right, #9333ea, #db2777, #dc2626)",
    "from-blue-600 via-cyan-600 to-teal-600": "linear-gradient(to bottom right, #2563eb, #0891b2, #0d9488)",
    "from-orange-600 via-amber-600 to-yellow-600": "linear-gradient(to bottom right, #ea580c, #d97706, #ca8a04)",
    "from-green-600 via-emerald-600 to-teal-600": "linear-gradient(to bottom right, #16a34a, #059669, #0d9488)",
    "from-pink-600 via-rose-600 to-red-600": "linear-gradient(to bottom right, #db2777, #e11d48, #dc2626)",
    "from-indigo-600 via-purple-600 to-pink-600": "linear-gradient(to bottom right, #4f46e5, #9333ea, #db2777)"
  };

  return (
    <div 
      className="slide-container"
      style={{
        background: gradientStyles[slide.gradient] || gradientStyles["from-cyan-600 via-blue-600 to-purple-700"]
      }}
    >
      <div className="slide-background">
        <div className="slide-radial-gradient" />
        <div 
          className="slide-pattern"
          style={{ 
            animation: mounted ? 'slidePattern 20s linear infinite' : 'none',
          }}
        />
      </div>

      <div className="slide-content">
        <div className="icon-container">
          <div 
            className="icon-wrapper float-animation"
            style={{ 
              animation: mounted ? 'float 3s ease-in-out infinite' : 'none',
            }}
          >
            <Icon className="w-24 h-24 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 
          className="slide-title"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.5s ease-out 0.1s'
          }}
        >
          <TextReveal text={slide.title} delay={100} />
        </h1>

        <h2 
          className="slide-subtitle"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease-out 0.4s'
          }}
        >
          <TextReveal text={slide.subtitle} delay={400} />
        </h2>

        <p 
          className="slide-text"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.7s'
          }}
        >
          {slide.text}
        </p>

        {slide.features && (
          <div className="features-grid">
            {slide.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease-out ${0.6 + i * 0.1}s`
                }}
              >
                <div className="feature-dot" />
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
        )}

        {slide.isClosing && (
          <div 
            className="cta-container"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0.5)',
              transition: 'all 0.7s ease-out 0.8s'
            }}
          >
            <div 
              className="cta-button pulse-animation"
            >
              <Sparkles className="w-8 h-8" />
              <span>Geleceğe Hazır Mısınız?</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// START SCREEN
// ============================================
const StartScreen = ({ 
  onStart, 
  onShowModal, 
  mounted 
}: { 
  onStart: () => void; 
  onShowModal: (file: string) => void;
  mounted: boolean;
}) => {
  return (
    <div className="start-screen">
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="start-content">
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1) rotate(0)' : 'scale(0) rotate(-180deg)',
          transition: 'all 1s ease-out'
        }}>
          <Sparkles className="w-32 h-32 text-cyan-400 mx-auto mb-8" />
        </div>

        <h1 
          className="main-title"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out 0.3s'
          }}
        >
          EĞİTİM 2045
        </h1>

        <p 
          className="main-subtitle"
          style={{ 
            opacity: mounted ? 1 : 0, 
            transition: 'opacity 0.8s ease-out 0.6s' 
          }}
        >
          Geleceğin Öğrenme Deneyimi
        </p>
        
        <div className="buttons-container">
          <button
            onClick={onStart}
            className="start-button"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1)' : 'scale(0.5)',
              transition: 'all 0.5s ease-out 0.9s'
            }}
          >
            <Play className="w-8 h-8" />
            Sunumu Başlat
          </button>

          <button
            onClick={() => window.open('https://github.com', '_blank')}
            className="github-button"
            style={{ 
              opacity: mounted ? 1 : 0, 
              transition: 'opacity 0.5s ease-out 1.1s' 
            }}
          >
            <Github className="w-6 h-6" />
            GitHub
          </button>
        </div>
        <p 
          className="instructions"
          style={{ 
            opacity: mounted ? 1 : 0, 
            transition: 'opacity 0.8s ease-out 1.8s' 
          }}
        >
          ← → Ok tuşları | Space: İleri | ESC: Çıkış
        </p>

        <p 
          className="credits"
          style={{ 
            opacity: mounted ? 1 : 0, 
            transition: 'opacity 0.8s ease-out 2.0s',
            fontSize: '0.9rem',
            color: '#94a3b8',
            marginTop: '1rem',
            textAlign: 'center'
          }}
        >
          Emir Sakarya ve Hasan Onur Kar tarafından yapılmıştır
        </p>
      </div>
    </div>
  );
};

// ============================================
// CODE VIEWER MODAL
// ============================================
const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, fileName }) => {
  if (!isOpen) return null;

  const codes: { [key: string]: string } = {
    'package.json': `{
  "name": "education-2045",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}`,
    'next.config.js': `/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/education-2045',
  assetPrefix: '/education-2045',
}`,
    'tailwind.config.js': `module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`,
    'styles/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`,
    'deploy.yml': `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: touch out/.nojekyll
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out`
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">
            <Code className="w-6 h-6 text-cyan-400" />
            {fileName}
          </h3>
          <button 
            onClick={onClose} 
            className="modal-close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <pre className="modal-content">
          {codes[fileName] || '// Dosya bulunamadı'}
        </pre>
        <div className="modal-footer">
          <button
            onClick={() => {
              navigator.clipboard.writeText(codes[fileName] || '');
              alert('✅ Kod kopyalandı!');
            }}
            className="copy-button"
          >
            Kopyala
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const { playWhoosh, playClick, isMuted, setIsMuted } = useSoundEffects();

  useEffect(() => { 
    setMounted(true); 
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(prev => prev + 1);
      playWhoosh(1);
    }
  }, [currentSlide, playWhoosh]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      playWhoosh(-1);
    }
  }, [currentSlide, playWhoosh]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i);
    playClick();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showStart || showModal) return;
      if (e.key === 'ArrowRight' || e.key === ' ') { 
        e.preventDefault(); 
        nextSlide(); 
      }
      else if (e.key === 'ArrowLeft') { 
        e.preventDefault(); 
        prevSlide(); 
      }
      else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide, showStart, showModal, isFullscreen]);

  useEffect(() => {
    if (!isAutoPlay || showStart || showModal) return;
    const timer = setInterval(() => {
      if (currentSlide < slidesData.length - 1) {
        nextSlide();
      } else {
        setIsAutoPlay(false);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, currentSlide, nextSlide, showStart, showModal]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err: Error) => {
        console.log('Fullscreen hatası:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    playClick();
  };

  if (showStart) {
    return (
      <StartScreen 
        onStart={() => {
          setShowStart(false);
          playClick();
        }}
        onShowModal={(file: string) => {
          setSelectedFile(file);
          setShowModal(true);
          playClick();
        }}
        mounted={mounted}
      />
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      overflow: 'hidden'
    }}>
      <div style={{ opacity: 1 }}>
        <Slide slide={slidesData[currentSlide]} />
      </div>

      <div 
        className="navigation-controls"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(100px)',
          transition: 'all 0.5s ease-out 0.5s'
        }}
      >
        <div className="nav-container">
          <div className="nav-buttons">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="nav-button"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slidesData.length - 1}
              className="nav-button"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`play-button ${isAutoPlay ? 'auto-play-active' : 'auto-play-inactive'}`}
            >
              {isAutoPlay ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => { 
                setIsMuted(!isMuted); 
                playClick(); 
              }}
              className="nav-button"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          <div className="slide-indicators">
            {slidesData.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`slide-indicator ${i === currentSlide ? 'indicator-active' : 'indicator-inactive'}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="slide-counter">
              {currentSlide + 1} / {slidesData.length}
            </div>
            <button
              onClick={toggleFullscreen}
              className="nav-button"
            >
              {isFullscreen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Maximize className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <CodeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        fileName={selectedFile} 
      />
    </div>
  );
}
