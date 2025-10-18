'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, Glasses, Globe, Zap, Users, Sparkles, 
  ChevronLeft, ChevronRight, Maximize, X, Play, Pause, Volume2, VolumeX,
  Download, Github, Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// SLIDES DATA
// ============================================
const slidesData = [
  { id: 1, title: "EĞİTİM 2045", subtitle: "Geleceğin Öğrenme Deneyimi", text: "Yapay zeka, sanal gerçeklik ve kişiselleştirilmiş öğrenme ile eğitimde yeni bir çağ başlıyor", icon: Sparkles, gradient: "from-cyan-600 via-blue-600 to-purple-700", transitionType: "slide" },
  { id: 2, title: "Yapay Zeka Öğretmenler", subtitle: "Her Öğrenci İçin Kişisel Mentor", text: "24/7 erişilebilir, sınırsız sabırlı ve her öğrencinin öğrenme stiline uyum sağlayan AI öğretmenler", icon: Brain, gradient: "from-purple-600 via-pink-600 to-red-600", transitionType: "fade", features: ["Anlık geri bildirim ve adaptif müfredat","Duygusal zeka ile motivasyon desteği","50+ dilde eş zamanlı öğretim"] },
  { id: 3, title: "Sanal Gerçeklik Sınıfları", subtitle: "Sınırları Aşan Öğrenme", text: "Mars'ta yürüyün, antik Roma'yı keşfedin, atom içinde gezinin - öğrenme artık sınırsız", icon: Glasses, gradient: "from-blue-600 via-cyan-600 to-teal-600", transitionType: "flip", features: ["İmmersiv deneyimlerle %80 daha iyi öğrenme","Tehlikeli deneyleri güvenle gerçekleştirme","Tarihi olayları ilk elden yaşama"] },
  { id: 4, title: "Kişiselleştirilmiş Öğrenme", subtitle: "Herkes Kendi Hızında", text: "AI analizi ile her öğrencinin güçlü ve zayıf yönleri tespit edilir, özel öğrenme yolu oluşturulur", icon: Zap, gradient: "from-orange-600 via-amber-600 to-yellow-600", transitionType: "zoom", features: ["Gerçek zamanlı performans izleme","Dinamik zorluk ayarlaması","İlgi alanlarına özel içerik"] },
  { id: 5, title: "Küresel Eğitim Ağları", subtitle: "Dünya Vatandaşları Yetiştirme", text: "Farklı kültürlerden öğrenciler sanal sınıflarda buluşuyor, küresel projeler üretiyor", icon: Globe, gradient: "from-green-600 via-emerald-600 to-teal-600", transitionType: "slide", features: ["7 kıtadan öğrencilerle ortak projeler","Kültürler arası anlayış ve empati","Gerçek dünya problemlerine çözümler"] },
  { id: 6, title: "Artırılmış Gerçeklik Uygulamaları", subtitle: "Fiziksel ve Dijital Dünyaların Birleşimi", text: "AR gözlüklerle gerçek dünyaya dijital bilgi katmanları ekleniyor, öğrenme her yerde", icon: Users, gradient: "from-pink-600 via-rose-600 to-red-600", transitionType: "fade", features: ["Kitap sayfalarından 3D modeller fırlıyor","Müzelerde tarihi figürlerle konuşma","Sokakta yürürken dil öğrenme"] },
  { id: 7, title: "Geleceği Birlikte İnşa Ediyoruz", subtitle: "Eğitim Devrimi Başladı", text: "2045'te her çocuk, potansiyelini tam olarak gerçekleştirebileceği bir eğitim sistemine erişecek", icon: Sparkles, gradient: "from-indigo-600 via-purple-600 to-pink-600", transitionType: "zoom", isClosing: true }
];

// ============================================
// AUDIO HOOK
// ============================================
const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  useEffect(() => { if (typeof window !== 'undefined') setAudioContext(new (window.AudioContext||window.webkitAudioContext)()); }, []);
  const playWhoosh = useCallback((direction=1) => { if (isMuted||!audioContext) return; const osc=audioContext.createOscillator(); const gain=audioContext.createGain(); osc.connect(gain); gain.connect(audioContext.destination); osc.type='sine'; osc.frequency.setValueAtTime(direction>0?200:400,audioContext.currentTime); osc.frequency.exponentialRampToValueAtTime(direction>0?400:200,audioContext.currentTime+0.3); gain.gain.setValueAtTime(0.1,audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.01,audioContext.currentTime+0.3); osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime+0.3); }, [isMuted,audioContext]);
  const playClick = useCallback(() => { if (isMuted||!audioContext) return; const osc=audioContext.createOscillator(); const gain=audioContext.createGain(); osc.connect(gain); gain.connect(audioContext.destination); osc.type='sine'; osc.frequency.setValueAtTime(800,audioContext.currentTime); gain.gain.setValueAtTime(0.05,audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.01,audioContext.currentTime+0.05); osc.start(audioContext.currentTime); osc.stop(audioContext.currentTime+0.05); }, [isMuted,audioContext]);
  return { playWhoosh, playClick, isMuted, setIsMuted };
};

// ============================================
// TEXT REVEAL
// ============================================
const TextReveal = ({ text, delay=0 }) => { const [displayed,setDisplayed]=useState(''); useEffect(()=>{let i=0; const timeout=setTimeout(()=>{const interval=setInterval(()=>{setDisplayed(text.slice(0,i+1)); i++; if(i>=text.length) clearInterval(interval);},30)},delay); return()=>clearTimeout(timeout);},[text,delay]); return <span>{displayed}<span className="animate-pulse">|</span></span> };

// ============================================
// SLIDE COMPONENT
// ============================================
const slideVariants={ slide:{initial:{x:'100%',opacity:0},animate:{x:0,opacity:1},exit:{x:'-100%',opacity:0}}, fade:{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}}, flip:{initial:{rotateY:90,opacity:0},animate:{rotateY:0,opacity:1},exit:{rotateY:-90,opacity:0}}, zoom:{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},exit:{scale:0,opacity:0}} };

const Slide=({slide})=>{ const Icon=slide.icon; return (
<motion.div key={slide.id} initial={slideVariants[slide.transitionType].initial} animate={slideVariants[slide.transitionType].animate} exit={slideVariants[slide.transitionType].exit} transition={{duration:0.7}} className={`absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br ${slide.gradient} overflow-hidden`}>
<div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
<div className="mb-8 flex justify-center">
<div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
<Icon className="w-24 h-24 text-white" strokeWidth={1.5}/>
</div></div>
<h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 text-white leading-tight"><TextReveal text={slide.title} delay={100}/></h1>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white/90"><TextReveal text={slide.subtitle} delay={400}/></h2>
<p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">{slide.text}</p>
{slide.features && (<div className="grid md:grid-cols-3 gap-6 mt-12">{slide.features.map((f,i)=>(<div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105"><div className="w-3 h-3 bg-white rounded-full mx-auto mb-4"/><p className="text-white text-lg font-medium">{f}</p></div>))}</div>)}
{slide.isClosing && (<div className="mt-12"><div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-full text-2xl font-bold shadow-2xl animate-pulse"><Sparkles className="w-8 h-8"/><span>Geleceğe Hazır Mısınız?</span></div></div>)}
</div>
</motion.div>
)};

// ============================================
// CODE MODAL
// ============================================
const CodeModal=({isOpen,onClose,fileName})=>{ if(!isOpen) return null; const codes={ 'package.json':`{...}`, 'next.config.js':`module.exports = { output:'export', images:{unoptimized:true}, basePath:'/education-2045', assetPrefix:'/education-2045', }`, 'tailwind.config.js':`module.exports={content:['./pages/**/*.{js,jsx,ts,tsx}'],theme:{extend:{}},plugins:[]}`, 'styles/globals.css':`@tailwind base; @tailwind components; @tailwind utilities; html,body{overflow:hidden}`, 'deploy.yml':'name: Deploy to GitHub Pages...'}; return (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
<div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col border border-cyan-500/30">
<div className="flex items-center justify-between p-6 border-b border-slate-700">
<h3 className="text-2xl font-bold text-white flex items-center gap-3"><Code className="w-6 h-6 text-cyan-400"/>{fileName}</h3>
<button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-6 h-6 text-white"/></button></div>
<pre className="flex-1 overflow-auto p-6 text-sm text-green-400 font-mono">{codes[fileName]||'// Dosya bulunamadı'}</pre>
<div className="p-4 border-t border-slate-700 flex justify-end gap-3">
<button onClick={()=>{navigator.clipboard.writeText(codes[fileName]);alert('✅ Kod kopyalandı!');}} className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg">Kopyala</button>
</div></div></div>
)};

// ============================================
// MAIN COMPONENT
// ============================================
const Education2045=()=>{ 
const [currentSlide,setCurrentSlide]=useState(0);
const [direction,setDirection]=useState(0);
const [isFullscreen,setIsFullscreen]=useState(false);
const [isAutoPlay,setIsAutoPlay]=useState(false);
const [showStart,setShowStart]=useState(true);
const [showModal,setShowModal]=useState(false);
const [selectedFile,setSelectedFile]=useState('');
const [mounted,setMounted]=useState(false);
const {playWhoosh,playClick,isMuted,setIsMuted}=useSoundEffects();

useEffect(()=>{setMounted(true);},[]);

const nextSlide=useCallback(()=>{ if(currentSlide<slidesData.length-1){ setDirection(1); setCurrentSlide(prev=>prev+1); playWhoosh(1); }},[currentSlide,playWhoosh]);
const prevSlide=useCallback(()=>{ if(currentSlide>0){ setDirection(-1); setCurrentSlide(prev=>prev-1); playWhoosh(-1); }},[currentSlide,playWhoosh]);
const goToSlide=(i)=>{ setDirection(i>currentSlide?1:-1); setCurrentSlide(i); playClick();};

useEffect(()=>{ const handleKey=(e)=>{ if(showStart||showModal) return; if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();nextSlide();} else if(e.key==='ArrowLeft'){e.preventDefault();prevSlide();} else if(e.key==='Escape') setIsFullscreen(false);}; window.addEventListener('keydown',handleKey); return ()=>window.removeEventListener('keydown',handleKey);},[nextSlide,prevSlide,showStart,showModal]);

useEffect(()=>{ if(!isAutoPlay||showStart) return; const timer=setInterval(()=>{ if(currentSlide<slidesData.length-1) nextSlide(); else setIsAutoPlay(false);},5000); return()=>clearInterval(timer);},[isAutoPlay,currentSlide,nextSlide,showStart]);

const toggleFullscreen=()=>{ if(!document.fullscreenElement){ document.documentElement.requestFullscreen(); setIsFullscreen(true); } else { document.exitFullscreen(); setIsFullscreen(false);} playClick();};

if(showStart){ return (
<div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 opacity-20">
{[...Array(50)].map((_,i)=>(<div key={i} className="absolute w-2 h-2 bg-white rounded-full" style={{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`}}/>))}
</div>
<div className="relative z-10 text-center px-6 max-w-5xl">
<h1 className="text-7xl md:text-9xl font-black text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">EĞİTİM 2045</h1>
<p className="text-3xl md:text-4xl text-white/80 mb-12">Geleceğin Öğrenme Deneyimi</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
<button onClick={()=>{setShowStart(false);playClick();}} className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:scale-110 transition-all"><Play className="w-8 h-8"/>Sunumu Başlat</button>
<button onClick={()=>window.open('https://github.com','_blank')} className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white text-xl font-semibold rounded-full hover:scale-105 transition-all"><Github className="w-6 h-6"/>GitHub</button>
</div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
{['package.json','next.config.js','tailwind.config.js','styles/globals.css','deploy.yml'].map((file,i)=>(<button key={file} onClick={()=>{setSelectedFile(file);setShowModal(true);playClick();}} className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-cyan-500/30 rounded-lg text-sm text-white hover:scale-105 transition-all">{file.replace('.yml','')}</button>))}
</div>
<p className="text-white/60 text-lg">← → Ok tuşları | Space: İleri | ESC: Çıkış</p>
</div></div>);}

return (
<div className="fixed inset-0 bg-black overflow-hidden">
<AnimatePresence mode="wait"><Slide slide={slidesData[currentSlide]} key={slidesData[currentSlide].id}/></AnimatePresence>
<div className="fixed bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm p-6 flex justify-between items-center max-w-7xl mx-auto">
<div className="flex items-center gap-4">
<button onClick={prevSlide} disabled={currentSlide===0} className="p-3 bg-white/10 hover:bg-white/20 rounded-full"><ChevronLeft className="w-6 h-6 text-white"/></button>
<button onClick={nextSlide} disabled={currentSlide===slidesData.length-1} className="p-3 bg-white/10 hover:bg-white/20 rounded-full"><ChevronRight className="w-6 h-6 text-white"/></button>
<button onClick={()=>setIsAutoPlay(!isAutoPlay)} className={`p-3 rounded-full hover:scale-110 transition-all ${isAutoPlay?'bg-cyan-500':'bg-white/10'}`}>{isAutoPlay?<Pause className="w-6 h-6 text-white"/>:<Play className="w-6 h-6 text-white"/>}</button>
<button onClick={()=>{setIsMuted(!isMuted);playClick();}} className="p-3 bg-white/10 hover:bg-white/20 rounded-full hover:scale-110 transition-all">{isMuted?<VolumeX className="w-6 h-6 text-white"/>:<Volume2 className="w-6 h-6 text-white"/>}</button>
</div>
<div className="flex items-center gap-3">{currentSlide+1}/{slidesData.length}</div>
<div className="flex items-center gap-4"><button onClick={toggleFullscreen} className="p-3 bg-white/10 hover:bg-white/20 rounded-full hover:scale-110 transition-all">{isFullscreen?<X className="w-6 h-6 text-white"/>:<Maximize className="w-6 h-6 text-white"/>}</button></div>
</div>
<CodeModal isOpen={showModal} onClose={()=>setShowModal(false)} fileName={selectedFile}/>
</div>);}

export default function Home(){ return <Education2045/> }
