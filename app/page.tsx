'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Key, Shield, Fingerprint, Cpu, Home as HomeIcon, Eye, Brain, 
  Sparkles, ChevronLeft, ChevronRight, Maximize, X, Play, Pause, Volume2, VolumeX,
  Github, Code, Database, Settings, BarChart3,
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
  stats?: { label: string; value: string; change?: string }[];
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
    title: "EV ANAHTARI 2045",
    subtitle: "Geleceğin Güvenlik Deneyimi",
    text: "Biyometrik kimlik doğrulama, çip tabanlı erişim sistemleri ve yapay zeka ile ev güvenliğinde yeni bir çağ başlıyor. Günümüzde %15 olan akıllı ev penetrasyonu, 2045'te %95'e ulaşacak.",
    icon: Key,
    gradient: "from-slate-600 via-blue-600 to-indigo-700",
    transitionType: "slide"
  },
  {
    id: 2,
    title: "Biyometrik Kimlik Doğrulama",
    subtitle: "Vücudunuz Anahtarınız",
    text: "Parmak izi, yüz tanıma, iris tarama ve ses tanıma ile %99.9 doğruluk oranında güvenli erişim. Apple Face ID'den 1000 kat daha hızlı ve güvenli.",
    icon: Fingerprint,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    transitionType: "fade",
    features: [
      "0.3 saniyede anında tanıma (günümüz: 2-3 saniye)",
      "Çok faktörlü biyometrik doğrulama",
      "Sahte parmak izi tespiti ve koruması",
      "Dünya çapında 2.5 milyar kullanıcı (2024: 500 milyon)"
    ],
    stats: [
      { label: "Doğruluk Oranı", value: "%99.9", change: "+0.4%" },
      { label: "Tanıma Hızı", value: "0.3s", change: "-85%" },
      { label: "Kullanıcı Sayısı", value: "2.5B", change: "+400%" }
    ]
  },
  {
    id: 3,
    title: "Çip Tabanlı Erişim Sistemleri",
    subtitle: "Teknoloji Cebinizde",
    text: "NFC, RFID ve implante edilebilir çiplerle temassız, güvenli ve pratik ev erişimi. 2024'te 50 milyon olan çip kullanıcı sayısı, 2045'te 1.2 milyara ulaşacak.",
    icon: Cpu,
    gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
    transitionType: "flip",
    features: [
      "256-bit şifreleme ile maksimum güvenlik",
      "10 yıl pil ömrü ve kurcalamaya karşı koruma",
      "Akıllı telefon entegrasyonu",
      "Implante edilebilir çipler: 2mm x 2mm boyutunda"
    ]
  },
  {
    id: 4,
    title: "Yapay Zeka Destekli Güvenlik",
    subtitle: "Öğrenen ve Adapte Olan Sistem",
    text: "Davranış analizi, anomali tespiti ve öngörülü güvenlik ile 7/24 koruma. GPT-5 tabanlı güvenlik asistanları ve kuantum hesaplama destekli tehdit analizi",
    icon: Brain,
    gradient: "from-orange-600 via-amber-600 to-yellow-600",
    transitionType: "zoom",
    features: [
      "Kullanıcı kalıplarını öğrenen algoritma (99.7% doğruluk)",
      "Gerçek zamanlı tehdit tespiti (0.1ms yanıt süresi)",
      "Otomatik acil durum protokolleri",
      "Kuantum şifreleme ile hacklenemez güvenlik"
    ],
    stats: [
      { label: "AI Doğruluk", value: "%99.7", change: "+2.1%" },
      { label: "Yanıt Süresi", value: "0.1ms", change: "-95%" },
      { label: "Tehdit Tespiti", value: "99.9%", change: "+0.3%" }
    ]
  },
  {
    id: 5,
    title: "Akıllı Ev Entegrasyonu",
    subtitle: "Tek Dokunuşla Her Şey",
    text: "Eve girdiğinizde ışıklar yanar, müzik başlar, sıcaklık ayarlanır - kişiselleştirilmiş deneyim. 500+ IoT cihaz desteği ve Matter 3.0 protokolü",
    icon: HomeIcon,
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    transitionType: "slide",
    features: [
      "500+ IoT cihazlarla tam entegrasyon",
      "Kişiye özel ev ayarları (AI öğrenme)",
      "Enerji verimliliği optimizasyonu (%40 tasarruf)",
      "Matter 3.0 protokolü ile evrensel uyumluluk"
    ],
    stats: [
      { label: "Cihaz Desteği", value: "500+", change: "+200%" },
      { label: "Enerji Tasarrufu", value: "%40", change: "+15%" },
      { label: "Yanıt Süresi", value: "50ms", change: "-80%" }
    ]
  },
  {
    id: 6,
    title: "Gizlilik ve Veri Güvenliği",
    subtitle: "Bilgileriniz Sadece Sizde",
    text: "Yerel işleme, sıfır-bilgi mimarisi ve blockchain teknolojisi ile maksimum gizlilik. Kuantum şifreleme ve homomorfik şifreleme ile veri güvenliği",
    icon: Shield,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    transitionType: "fade",
    features: [
      "GDPR+ ve KVKK+ uyumlu veri koruma",
      "Edge computing ile yerel işleme (%100 offline)",
      "Blockchain tabanlı erişim kayıtları",
      "Kuantum şifreleme (AES-512 eşdeğeri)"
    ],
    stats: [
      { label: "Veri Güvenliği", value: "%100", change: "+25%" },
      { label: "Offline Çalışma", value: "%100", change: "+40%" },
      { label: "Şifreleme Gücü", value: "512-bit", change: "+100%" }
    ]
  },
  {
    id: 7,
    title: "Güvenlik Zorlukları ve Çözümler",
    subtitle: "Geleceğin Sorunlarına Geleceğin Çözümleri",
    text: "Siber saldırılar, gizlilik endişeleri ve teknoloji bağımlılığı gibi zorluklara karşı gelişmiş güvenlik protokolleri ve etik standartlar",
    icon: Shield,
    gradient: "from-red-600 via-orange-600 to-yellow-600",
    transitionType: "slide",
    features: [
      "Kuantum şifreleme ile hacklenemez güvenlik",
      "GDPR+ uyumlu veri koruma protokolleri",
      "Offline çalışabilen yedek sistemler",
      "Etik AI kullanımı ve şeffaflık"
    ]
  },
  {
    id: 8,
    title: "Uygulama Yol Haritası",
    subtitle: "2024'ten 2045'e Yolculuk",
    text: "Akıllı ev güvenliğinin evrimi: Mevcut teknolojilerden geleceğin devrimci sistemlerine kadar olan yolculuk",
    icon: Eye,
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    transitionType: "fade",
    features: [
      "2024-2027: Biyometrik sistemlerin yaygınlaşması",
      "2028-2035: Çip teknolojisinin standart hale gelmesi",
      "2036-2042: AI entegrasyonu ve öğrenen sistemler",
      "2043-2045: Tam otonom güvenlik ekosistemi"
    ]
  },
  {
    id: 9,
    title: "Küresel Etki ve Pazar Analizi",
    subtitle: "Dünya Çapında Güvenlik Devrimi",
    text: "2045'te akıllı ev güvenlik pazarı 2.8 trilyon dolar değerinde olacak. Her kıtada farklı adaptasyonlar ve kültürel entegrasyonlar. CAGR %23.5 ile en hızlı büyüyen teknoloji sektörü",
    icon: Database,
    gradient: "from-green-600 via-emerald-600 to-teal-600",
    transitionType: "zoom",
    features: [
      "Kuzey Amerika: %98 penetrasyon oranı ($1.2T pazar)",
      "Avrupa: GDPR+ uyumlu sistemler ($800B pazar)",
      "Asya: Çip teknolojisinde liderlik ($600B pazar)",
      "Afrika: Güneş enerjili sistemler ($200B pazar)"
    ],
    stats: [
      { label: "Toplam Pazar", value: "$2.8T", change: "+1,200%" },
      { label: "CAGR", value: "%23.5", change: "+8.2%" },
      { label: "Küresel Penetrasyon", value: "%87", change: "+72%" }
    ]
  },
  {
    id: 10,
    title: "Geleceği Birlikte İnşa Ediyoruz",
    subtitle: "Güvenlik Devrimi Başladı",
    text: "2045'te her ev, sahiplerini tanıyan, koruyan ve onlara hizmet eden akıllı bir sistem olacak",
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
// ANALYTICS AND TRACKING
// ============================================
const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    slideViews: {} as Record<number, number>,
    timeSpent: {} as Record<number, number>,
    interactions: 0,
    startTime: Date.now()
  });

  const trackSlideView = useCallback((slideId: number) => {
    setAnalytics(prev => ({
      ...prev,
      slideViews: {
        ...prev.slideViews,
        [slideId]: (prev.slideViews[slideId] || 0) + 1
      }
    }));
  }, []);

  const trackTimeSpent = useCallback((slideId: number, timeSpent: number) => {
    setAnalytics(prev => ({
      ...prev,
      timeSpent: {
        ...prev.timeSpent,
        [slideId]: (prev.timeSpent[slideId] || 0) + timeSpent
      }
    }));
  }, []);

  const trackInteraction = useCallback(() => {
    setAnalytics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
  }, []);

  const getAnalyticsSummary = useCallback(() => {
    const totalTime = Date.now() - analytics.startTime;
    const totalViews = Object.values(analytics.slideViews).reduce((sum, views) => sum + views, 0);
    const avgTimePerSlide = Object.values(analytics.timeSpent).reduce((sum, time) => sum + time, 0) / slidesData.length;
    
    return {
      totalTime,
      totalViews,
      avgTimePerSlide,
      interactions: analytics.interactions,
      engagement: analytics.interactions / (totalTime / 1000 / 60) // interactions per minute
    };
  }, [analytics]);

  return { trackSlideView, trackTimeSpent, trackInteraction, getAnalyticsSummary };
};

// ============================================
// AI-POWERED FEATURES
// ============================================
const useAIFeatures = () => {
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInsights = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const insights = [
      "Bu slayt en çok ilgi çeken içeriklerden biri",
      "Kullanıcılar bu teknoloji hakkında daha fazla bilgi istiyor",
      "Bu özellik gelecekteki projeler için önemli olabilir"
    ];
    
    setAiInsights(insights);
    setIsGenerating(false);
  }, []);

  return { aiInsights, isGenerating, generateInsights };
};


// ============================================
// STATS DISPLAY COMPONENT
// ============================================
const StatsDisplay: React.FC<{ stats: { label: string; value: string; change?: string }[] }> = ({ stats }) => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => ({ value: "0", change: "+0%" })));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats.map(stat => ({ value: stat.value, change: stat.change || "+0%" })));
    }, 500);
    return () => clearTimeout(timer);
  }, [stats]);

  return (
    <div className="stats-grid">
      {animatedStats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stats[index].label}</div>
          {stat.change && (
            <div className="stat-change">{stat.change}</div>
          )}
        </div>
      ))}
    </div>
  );
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
    "from-slate-600 via-blue-600 to-indigo-700": "linear-gradient(to bottom right, #475569, #2563eb, #4338ca)",
    "from-emerald-600 via-teal-600 to-cyan-600": "linear-gradient(to bottom right, #059669, #0d9488, #0891b2)",
    "from-violet-600 via-purple-600 to-fuchsia-600": "linear-gradient(to bottom right, #7c3aed, #9333ea, #c026d3)",
    "from-orange-600 via-amber-600 to-yellow-600": "linear-gradient(to bottom right, #ea580c, #d97706, #ca8a04)",
    "from-green-600 via-emerald-600 to-teal-600": "linear-gradient(to bottom right, #16a34a, #059669, #0d9488)",
    "from-blue-600 via-indigo-600 to-purple-600": "linear-gradient(to bottom right, #2563eb, #4f46e5, #9333ea)",
    "from-indigo-600 via-purple-600 to-pink-600": "linear-gradient(to bottom right, #4f46e5, #9333ea, #db2777)"
  };

  return (
    <div 
      className="slide-container"
      style={{
        background: gradientStyles[slide.gradient] || gradientStyles["from-slate-600 via-blue-600 to-indigo-700"]
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

        {slide.stats && (
          <div 
            className="stats-container"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.5s ease-out 0.6s'
            }}
          >
            <StatsDisplay stats={slide.stats} />
          </div>
        )}

        {slide.features && (
          <div className="features-grid">
            {slide.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease-out ${0.8 + i * 0.1}s`
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
              <Shield className="w-8 h-8" />
              <span>Güvenliğe Hazır Mısınız?</span>
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
  mounted 
}: { 
  onStart: () => void; 
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
          <Key className="w-32 h-32 text-blue-400 mx-auto mb-8" />
        </div>

        <h1 
          className="main-title"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out 0.3s'
          }}
        >
          EV ANAHTARI 2045
        </h1>

        <p 
          className="main-subtitle"
          style={{ 
            opacity: mounted ? 1 : 0, 
            transition: 'opacity 0.8s ease-out 0.6s' 
          }}
        >
          Geleceğin Güvenlik Deneyimi
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
            onClick={() => window.open('https://github.com/iWeslax83/things-in-2045', '_blank')}
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
  "name": "ev-anahtari-2045",
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
  basePath: '/ev-anahtari-2045',
  assetPrefix: '/ev-anahtari-2045',
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
    'deploy.yml': `name: Deploy Ev Anahtarı 2045 to GitHub Pages

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
// ACCESSIBILITY HOOKS
// ============================================
const useAccessibility = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isHighContrast, setIsHighContrast, fontSize, setFontSize, isReducedMotion };
};

// ============================================
// TOUCH GESTURES HOOK
// ============================================
const useTouchGestures = () => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    return { isLeftSwipe, isRightSwipe, isUpSwipe, isDownSwipe };
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
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
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const { playWhoosh, playClick, isMuted, setIsMuted } = useSoundEffects();
  const { isHighContrast, setIsHighContrast, fontSize, setFontSize, isReducedMotion } = useAccessibility();
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures();
  const { trackSlideView, trackTimeSpent, trackInteraction, getAnalyticsSummary } = useAnalytics();
  const { aiInsights, isGenerating, generateInsights } = useAIFeatures();

  useEffect(() => { 
    setMounted(true); 
  }, []);

  // Track slide views and time spent
  useEffect(() => {
    trackSlideView(currentSlide);
    (window as { slideStartTime?: number }).slideStartTime = Date.now();
    
    // Generate AI insights for current slide
    generateInsights();
  }, [currentSlide, trackSlideView, generateInsights]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slidesData.length - 1) {
      const slideStartTime = (window as { slideStartTime?: number }).slideStartTime || Date.now();
      trackTimeSpent(currentSlide, Date.now() - slideStartTime);
      setCurrentSlide(prev => prev + 1);
      playWhoosh(1);
      trackInteraction();
    }
  }, [currentSlide, playWhoosh, trackTimeSpent, trackInteraction]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      const slideStartTime = (window as { slideStartTime?: number }).slideStartTime || Date.now();
      trackTimeSpent(currentSlide, Date.now() - slideStartTime);
      setCurrentSlide(prev => prev - 1);
      playWhoosh(-1);
      trackInteraction();
    }
  }, [currentSlide, playWhoosh, trackTimeSpent, trackInteraction]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i);
    playClick();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showStart || showModal) return;
      
      // Enhanced keyboard navigation
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
          } else if (showSettings) {
            setShowSettings(false);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          setIsMuted(!isMuted);
          break;
        case 'a':
        case 'A':
          e.preventDefault();
          setIsAutoPlay(!isAutoPlay);
          break;
        case 's':
        case 'S':
          e.preventDefault();
          setShowSettings(!showSettings);
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(slidesData.length - 1);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
          e.preventDefault();
          const slideIndex = parseInt(e.key) - 1;
          if (slideIndex < slidesData.length) {
            setCurrentSlide(slideIndex);
          }
          break;
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide, prevSlide, showStart, showModal, isFullscreen, showSettings, isMuted, isAutoPlay]);

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
        mounted={mounted}
      />
    );
  }

  // Handle touch gestures
  const handleTouchEnd = () => {
    const gesture = onTouchEnd();
    if (gesture?.isLeftSwipe) nextSlide();
    if (gesture?.isRightSwipe) prevSlide();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        overflow: 'hidden'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`${isHighContrast ? 'high-contrast' : ''} ${fontSize} ${isReducedMotion ? 'reduced-motion' : ''}`}
    >
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
              title="Ses Aç/Kapat (M)"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => {
                setShowSettings(!showSettings);
                playClick();
              }}
              className="nav-button"
              title="Ayarlar (S)"
            >
              <Settings className="w-6 h-6 text-white" />
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
        fileName="package.json" 
      />

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-content">
            <div className="settings-header">
              <h3>Ayarlar</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="settings-close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="settings-section">
              <h4>Erişilebilirlik</h4>
              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={isHighContrast}
                    onChange={(e) => setIsHighContrast(e.target.checked)}
                  />
                  Yüksek Kontrast
                </label>
              </div>
              
              <div className="setting-item">
                <label>
                  Font Boyutu:
                  <select 
                    value={fontSize} 
                    onChange={(e) => setFontSize(e.target.value)}
                  >
                    <option value="small">Küçük</option>
                    <option value="normal">Normal</option>
                    <option value="large">Büyük</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="settings-section">
              <h4>Analitik Veriler</h4>
              <div className="analytics-dashboard">
                {(() => {
                  const summary = getAnalyticsSummary();
                  return (
                    <>
                      <div className="analytics-item">
                        <span className="analytics-label">Toplam Süre:</span>
                        <span className="analytics-value">{Math.round(summary.totalTime / 1000)}s</span>
                      </div>
                      <div className="analytics-item">
                        <span className="analytics-label">Etkileşim:</span>
                        <span className="analytics-value">{summary.interactions}</span>
                      </div>
                      <div className="analytics-item">
                        <span className="analytics-label">Katılım Oranı:</span>
                        <span className="analytics-value">{summary.engagement.toFixed(2)}/dk</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="settings-section">
              <h4>AI İçgörüleri</h4>
              <div className="ai-insights">
                {isGenerating ? (
                  <div className="ai-loading">AI analiz ediyor...</div>
                ) : (
                  <div className="insights-list">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="insight-item">
                        <BarChart3 className="w-4 h-4 text-cyan-400" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="settings-section">
              <h4>Klavye Kısayolları</h4>
              <div className="shortcuts-list">
                <div className="shortcut-item">
                  <kbd>←</kbd> <kbd>→</kbd> <span>Slayt değiştir</span>
                </div>
                <div className="shortcut-item">
                  <kbd>Space</kbd> <span>İleri git</span>
                </div>
                <div className="shortcut-item">
                  <kbd>F</kbd> <span>Tam ekran</span>
                </div>
                <div className="shortcut-item">
                  <kbd>M</kbd> <span>Ses aç/kapat</span>
                </div>
                <div className="shortcut-item">
                  <kbd>A</kbd> <span>Otomatik oynat</span>
                </div>
                <div className="shortcut-item">
                  <kbd>1-9</kbd> <span>Slayta git</span>
                </div>
                <div className="shortcut-item">
                  <kbd>ESC</kbd> <span>Çıkış</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
