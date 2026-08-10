'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Crown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface Chapter {
  id: string;
  videoPath: string;
  text: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "01",
    videoPath: "/videos/01.mp4",
    text: "Every unforgettable gift begins with understanding.",
  },
  {
    id: "02",
    videoPath: "/videos/02.mp4",
    text: "CHARIS remembers the people who matter most.",
  },
  {
    id: "03",
    videoPath: "/videos/03.mp4",
    text: "Luxury curated with meaning.",
  },
  {
    id: "04",
    videoPath: "/videos/04.mp4",
    text: "Luxury.\nIntelligence.\nEmotion.",
  },
];

/*
 * DESIGN DECISION: Theme Scoping for CinematicScroll
 * The pre-rendered frame canvas is visually graded in a dark, atmospheric palette.
 * To maintain maximum visual contrast and cinematic depth, CinematicScroll is intentionally
 * scoped to remain dark (#050505) across all selected luxury themes.
 */

const FRAME_CONFIG: Record<string, { frameCount: number; pattern: string }> = {
  "01": { frameCount: 75, pattern: "/videos/frames/01/frame_%04d.webp" },
  "02": { frameCount: 75, pattern: "/videos/frames/02/frame_%04d.webp" },
  "03": { frameCount: 75, pattern: "/videos/frames/03/frame_%04d.webp" },
  "04": { frameCount: 75, pattern: "/videos/frames/04/frame_%04d.webp" },
};

const LOADING_MESSAGES = [
  "Preparing your concierge...",
  "Curating luxury...",
  "Loading cinematic experience...",
];

export const CinematicScroll: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Fallbacks & Checks
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [useVideoFallback, setUseVideoFallback] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Embedded build-time frame counts to eliminate metadata race conditions
  const frameCounts: Record<string, number> = {
    "01": FRAME_CONFIG["01"].frameCount,
    "02": FRAME_CONFIG["02"].frameCount,
    "03": FRAME_CONFIG["03"].frameCount,
    "04": FRAME_CONFIG["04"].frameCount,
  };
  const totalFrames = Object.values(frameCounts).reduce((a, b) => a + b, 0);

  // Preloading & Loading state
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  // Mobile Autoplay Video Sequence States
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileVideoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  // Image Cache: record of chapterId -> frameIndex -> Image object
  const loadedImagesRef = useRef<Record<string, Record<number, HTMLImageElement>>>({
    "01": {},
    "02": {},
    "03": {},
    "04": {},
  });
  const currentGlobalFrameRef = useRef<number>(0);
  const errorCountRef = useRef<number>(0);

  // Check prefers-reduced-motion and screen size (mobile fallback)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // Check mobile screens (under 600px width)
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setUseVideoFallback(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // run initially

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cleanup image cache on unmount to release memory and cancel network requests
  useEffect(() => {
    return () => {
      for (const ch of CHAPTERS) {
        const chapterCache = loadedImagesRef.current[ch.id];
        if (chapterCache) {
          for (const key of Object.keys(chapterCache)) {
            const img = chapterCache[Number(key)];
            if (img) {
              img.src = '';
            }
          }
          loadedImagesRef.current[ch.id] = {};
        }
      }
    };
  }, []);

  // Loading messages loop
  useEffect(() => {
    if (initialLoadComplete) return;
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [initialLoadComplete]);

  // Preload initial frames (first 25 frames of chapter 1)
  useEffect(() => {
    if (useVideoFallback || prefersReducedMotion) return;

    const framesToPreload = 25;
    let loadedCount = 0;

    const checkComplete = () => {
      loadedCount++;
      const percent = Math.min(100, Math.round((loadedCount / framesToPreload) * 100));
      setPreloadProgress(percent);

      if (loadedCount >= framesToPreload) {
        setTimeout(() => {
          setInitialLoadComplete(true);
          // Initial draw of the first frame
          const firstImg = loadedImagesRef.current["01"]?.[0];
          if (firstImg && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) drawImageCover(ctx, firstImg, canvasRef.current.width, canvasRef.current.height);
          }
        }, 400);
      }
    };

    for (let i = 0; i < framesToPreload; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(4, '0');
      img.src = FRAME_CONFIG["01"].pattern.replace("%04d", frameNum);
      img.onload = checkComplete;
      img.onerror = () => {
        errorCountRef.current++;
        if (errorCountRef.current > 5) {
          setUseVideoFallback(true);
        }
        checkComplete();
      };
      loadedImagesRef.current["01"][i] = img;
    }
  }, [useVideoFallback, prefersReducedMotion]);

  // Center Crop Image drawing (mimicking object-fit: cover)
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (canvasWidth <= 0 || canvasHeight <= 0) return;
    const imgWidth = img.width;
    const imgHeight = img.height;
    if (imgWidth === 0 || imgHeight === 0) return;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let sx = 0;
    let sy = 0;
    let sWidth = imgWidth;
    let sHeight = imgHeight;

    if (canvasRatio > imgRatio) {
      sHeight = imgWidth / canvasRatio;
      sy = (imgHeight - sHeight) / 2;
    } else {
      sWidth = imgHeight * canvasRatio;
      sx = (imgWidth - sWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  };

  // Convert global frame index into Chapter ID and Local Index
  const getChapterAndLocalFrame = (globalIndex: number) => {
    let acc = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      const ch = CHAPTERS[i];
      const count = frameCounts[ch.id];
      if (globalIndex < acc + count) {
        return {
          chapterId: ch.id,
          localIndex: globalIndex - acc,
          chapterIndex: i,
        };
      }
      acc += count;
    }
    const lastCh = CHAPTERS[3];
    return {
      chapterId: lastCh.id,
      localIndex: frameCounts[lastCh.id] - 1,
      chapterIndex: 3,
    };
  };

  // Convert Chapter ID and Local Index back to Global Index
  const getGlobalIndex = (chapterId: string, localIndex: number) => {
    let acc = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      const ch = CHAPTERS[i];
      if (ch.id === chapterId) {
        return acc + localIndex;
      }
      acc += frameCounts[ch.id];
    }
    return localIndex;
  };

  // Fetch or cache frame image
  const preloadFrame = (chapterId: string, localIndex: number) => {
    const chapterCache = loadedImagesRef.current[chapterId];
    if (!chapterCache) return;

    if (!chapterCache[localIndex]) {
      const img = new Image();
      const frameNum = String(localIndex + 1).padStart(4, '0');
      img.src = FRAME_CONFIG[chapterId].pattern.replace("%04d", frameNum);
      img.onerror = () => {
        errorCountRef.current++;
        if (errorCountRef.current > 15) {
          setUseVideoFallback(true);
        }
      };
      chapterCache[localIndex] = img;
    }
  };

  const getOrLoadFrame = (chapterId: string, localIndex: number): HTMLImageElement | null => {
    const chapterCache = loadedImagesRef.current[chapterId];
    if (!chapterCache) return null;

    if (!chapterCache[localIndex]) {
      preloadFrame(chapterId, localIndex);
    }
    return chapterCache[localIndex] || null;
  };

  // Search outward for the closest loaded frame to prevent black frame flashes
  const findNearestCachedFrame = (chapterId: string, localIndex: number): HTMLImageElement | null => {
    const chapterCache = loadedImagesRef.current[chapterId];
    if (!chapterCache) return null;

    const maxOffset = 15;
    for (let offset = 1; offset <= maxOffset; offset++) {
      if (localIndex - offset >= 0) {
        const img = chapterCache[localIndex - offset];
        if (img && img.complete && img.naturalWidth !== 0) return img;
      }
      if (localIndex + offset < frameCounts[chapterId]) {
        const img = chapterCache[localIndex + offset];
        if (img && img.complete && img.naturalWidth !== 0) return img;
      }
    }
    return null;
  };

  // Preload sliding window & garbage collect distant frames
  const manageCacheWindow = (currentGlobalIndex: number) => {
    const PRELOAD_AHEAD = 25;
    const PRELOAD_BEHIND = 10;

    const minGlobal = Math.max(0, currentGlobalIndex - PRELOAD_BEHIND);
    const maxGlobal = Math.min(totalFrames - 1, currentGlobalIndex + PRELOAD_AHEAD);

    // Preload window
    for (let idx = minGlobal; idx <= maxGlobal; idx++) {
      const { chapterId, localIndex } = getChapterAndLocalFrame(idx);
      preloadFrame(chapterId, localIndex);
    }

    // Unload out-of-bounds frames (always preserve the initial frame of Chapter 1)
    for (const ch of CHAPTERS) {
      const chapterCache = loadedImagesRef.current[ch.id];
      if (!chapterCache) continue;

      const keys = Object.keys(chapterCache).map(Number);
      for (const localIdx of keys) {
        const globalIdx = getGlobalIndex(ch.id, localIdx);
        if (globalIdx < minGlobal || globalIdx > maxGlobal) {
          if (ch.id === "01" && localIdx === 0) continue; // keep first frame loaded

          const img = chapterCache[localIdx];
          if (img) {
            img.src = ""; // Cancel network requests / free image memory
            delete chapterCache[localIdx];
          }
        }
      }
    }
  };

  // Canvas Resize Handler
  useEffect(() => {
    if (useVideoFallback || prefersReducedMotion || !canvasRef.current) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const { chapterId, localIndex } = getChapterAndLocalFrame(currentGlobalFrameRef.current);
      const img = loadedImagesRef.current[chapterId]?.[localIndex];
      if (img && img.complete) {
        const ctx = canvas.getContext('2d');
        if (ctx) drawImageCover(ctx, img, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [useVideoFallback, prefersReducedMotion]);

  // Global Lenis Smooth Scrolling Setup
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    // Initialize Lenis Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // GSAP ScrollTrigger timeline sync
  useEffect(() => {
    if (!initialLoadComplete || useVideoFallback || prefersReducedMotion || !triggerRef.current || !canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Single pinned master timeline with scrub: true (Lenis handles smooth scroll interpolation)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const activeGlobalFrame = Math.floor(self.progress * (totalFrames - 1));
          currentGlobalFrameRef.current = activeGlobalFrame;

          const { chapterId, localIndex } = getChapterAndLocalFrame(activeGlobalFrame);
          const img = getOrLoadFrame(chapterId, localIndex);
          if (img && img.complete && img.naturalWidth !== 0) {
            if (ctx) drawImageCover(ctx, img, canvas.width, canvas.height);
          } else {
            const nearest = findNearestCachedFrame(chapterId, localIndex);
            if (nearest && ctx) drawImageCover(ctx, nearest, canvas.width, canvas.height);
          }

          manageCacheWindow(activeGlobalFrame);
        },
      },
    });

    // Caption timeline normalized strictly to explicit fractions of 1.0 total duration
    // Chapter 1 (0% to 22%)
    tl.fromTo("#text-ch-01",
      { opacity: 0, scale: 0.85, y: 50, z: -150, rotateX: 15, filter: "blur(12px)" },
      { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
      0.02
    ).to("#text-ch-01",
      { opacity: 0, scale: 1.15, y: -50, z: 150, rotateX: -15, filter: "blur(12px)", duration: 0.05, ease: "power2.in" },
      0.18
    );

    // Chapter 2 (25% to 47%)
    tl.fromTo("#text-ch-02",
      { opacity: 0, scale: 0.85, y: 50, z: -150, rotateX: 15, filter: "blur(12px)" },
      { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
      0.26
    ).to("#text-ch-02",
      { opacity: 0, scale: 1.15, y: -50, z: 150, rotateX: -15, filter: "blur(12px)", duration: 0.05, ease: "power2.in" },
      0.42
    );

    // Chapter 3 (50% to 71%)
    tl.fromTo("#text-ch-03",
      { opacity: 0, scale: 0.85, y: 50, z: -150, rotateX: 15, filter: "blur(12px)" },
      { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
      0.50
    ).to("#text-ch-03",
      { opacity: 0, scale: 1.15, y: -50, z: 150, rotateX: -15, filter: "blur(12px)", duration: 0.05, ease: "power2.in" },
      0.66
    );

    // Chapter 4 (74% to 90%)
    tl.fromTo("#text-ch-04",
      { opacity: 0, scale: 0.85, y: 50, z: -150, rotateX: 15, filter: "blur(12px)" },
      { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, filter: "blur(0px)", duration: 0.05, ease: "power2.out" },
      0.74
    ).to("#text-ch-04",
      { opacity: 0, scale: 1.15, y: -50, z: 150, rotateX: -15, filter: "blur(12px)", duration: 0.04, ease: "power2.in" },
      0.86
    );

    // Final CTA button (91% to 1.00)
    tl.fromTo("#text-cta",
      { opacity: 0, scale: 0.88, y: 40, z: -100, rotateX: 10 },
      { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, duration: 0.07, ease: "power2.out" },
      0.91
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill(true));
    };
  }, [initialLoadComplete, useVideoFallback, prefersReducedMotion]);

  // Mobile Autoplay Video sequence triggers
  useEffect(() => {
    if (!useVideoFallback || prefersReducedMotion) return;

    const activeVideo = mobileVideoRefs[mobileIndex].current;
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch((err) => console.warn("Mobile autoplay failed or blocked:", err));
    }

    mobileVideoRefs.forEach((ref, idx) => {
      if (idx !== mobileIndex && ref.current) {
        ref.current.pause();
      }
    });
  }, [mobileIndex, useVideoFallback, prefersReducedMotion]);

  // --- RENDERING ---

  // 1. Accessibility Fallback: Static Premium Hero
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-screen w-full bg-[#0B0B0E] flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-16">
        <div className="absolute inset-0 bg-burgundy-900/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-burgundy-800 border border-gold-400/40 flex items-center justify-center shadow-gold-glow">
              <Crown className="h-8 w-8 text-gold-400" />
            </div>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-silk-100">
            Luxury. <br />
            Intelligence. <br />
            Emotion.
          </h1>
          <p className="text-silk-300/70 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            CHARIS remembers the people who matter most. Explore vaulted gift curations and private AI concierge services.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              href="/consult"
              className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all duration-300 flex items-center justify-center space-x-3 shadow-gold-glow"
            >
              <span>Begin Your Consultation</span>
              <ArrowRight className="h-4 w-4 text-obsidian-950" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // 2. Normal Viewport (Stable tree for both desktop canvas & mobile fallback)
  return (
    <div className="relative w-full">
      {/* Loading Overlay (Maintained in DOM to prevent React removeChild reconciliation issues) */}
      <div 
        className={`fixed inset-0 bg-obsidian-950 z-50 flex flex-col items-center justify-center select-none transition-all duration-1000 ${
          initialLoadComplete || useVideoFallback ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="relative flex flex-col items-center max-w-md w-full px-8 text-center">
          {/* Elegant Spinning Crown */}
          <div className="relative mb-8 h-16 w-16 rounded-full bg-burgundy-900 border border-gold-400/40 flex items-center justify-center shadow-gold-glow animate-pulse-subtle">
            <Crown className="h-8 w-8 text-gold-400" />
          </div>

          {/* Cycling Luxury loading phrases */}
          <div className="h-8 overflow-hidden relative w-full mb-6">
            <span className="font-serif-luxury text-gold-200 text-sm tracking-wide transition-all duration-500 absolute w-full left-0">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </span>
          </div>

          {/* Custom Gold Progress Bar */}
          <div className="w-48 h-[2px] bg-obsidian-850 rounded-full overflow-hidden border border-gold-400/10">
            <div
              className="h-full bg-gold-gradient transition-all duration-300 ease-out"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-gold-400/60 tracking-widest mt-2">
            {preloadProgress}% READY
          </span>
        </div>
      </div>

      {/* Mobile / Autoplay Video Fallback Section (Toggled via CSS display class) */}
      <div className={useVideoFallback ? "block" : "hidden"}>
        <section className="relative h-screen w-full bg-[#0B0B0E] overflow-hidden">
          {/* Background videos stacked */}
          {CHAPTERS.map((ch, idx) => (
            <video
              key={ch.id}
              ref={mobileVideoRefs[idx]}
              src={ch.videoPath}
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                mobileIndex === idx ? "opacity-40" : "opacity-0 pointer-events-none"
              }`}
              onEnded={() => {
                if (mobileIndex < 3) {
                  setMobileIndex((prev) => prev + 1);
                }
              }}
            />
          ))}

          {/* Ambient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-obsidian-950/40 pointer-events-none z-10" />

          {/* Animated Text Layers */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                className={`absolute flex flex-col items-center transition-all duration-1000 transform ${
                  mobileIndex === idx
                    ? "opacity-100 translate-y-0 scale-100 blur-none"
                    : "opacity-0 translate-y-10 scale-95 blur-md pointer-events-none"
                }`}
              >
                <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-silk-100 max-w-2xl leading-tight font-bold whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {ch.text}
                </h2>
              </div>
            ))}

            {/* Persistent/End CTA visible when on the final chapter */}
            <div
              className={`absolute bottom-24 z-30 transition-all duration-1000 transform ${
                mobileIndex === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              <Link
                href="/consult"
                className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all duration-300 flex items-center justify-center space-x-3 shadow-gold-glow"
              >
                <span>Begin Your Consultation</span>
                <ArrowRight className="h-4 w-4 text-obsidian-950" />
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[10px] text-gold-300/50 font-mono tracking-widest uppercase flex flex-col items-center animate-pulse-subtle">
            <span>Scroll down to enter</span>
            <span className="mt-1">↓</span>
          </div>
        </section>
      </div>

      {/* Desktop / Tablet: Premium Pinned Scroll-Scrub Canvas (Toggled via CSS display class) */}
      <div
        ref={triggerRef}
        id="cinematic-scroll-trigger"
        className={useVideoFallback ? "hidden" : "relative w-full h-screen overflow-hidden bg-[#050505]"}
        style={{ transformStyle: "preserve-3d" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-100 block"
        />

        {/* Ambient Dark Gradients & Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10" 
          style={{ 
            background: "radial-gradient(circle, rgba(7,7,9,0.1) 0%, rgba(7,7,9,0.45) 65%, rgba(7,7,9,0.85) 100%)" 
          }}
        />

        {/* Synced Text Layers overlay with 3D Perspective */}
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none px-6"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          <div id="text-ch-01" className="absolute opacity-0 flex flex-col items-center">
            <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-silk-100 max-w-4xl leading-tight font-bold drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              Every unforgettable gift begins with understanding.
            </h2>
          </div>
          <div id="text-ch-02" className="absolute opacity-0 flex flex-col items-center">
            <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-silk-100 max-w-4xl leading-tight font-bold drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              CHARIS remembers the people who matter most.
            </h2>
          </div>
          <div id="text-ch-03" className="absolute opacity-0 flex flex-col items-center">
            <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-silk-100 max-w-4xl leading-tight font-bold drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              Luxury curated with meaning.
            </h2>
          </div>
          <div id="text-ch-04" className="absolute opacity-0 flex flex-col items-center">
            <h2 className="font-serif-luxury text-3xl md:text-5xl lg:text-6xl text-silk-100 max-w-4xl leading-tight font-bold whitespace-pre-line drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
              {`Luxury.
Intelligence.
Emotion.`}
            </h2>
          </div>
          <div id="text-cta" className="absolute opacity-0 flex flex-col items-center pointer-events-auto">
            <Link
              href="/consult"
              className="px-10 py-5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all duration-300 flex items-center justify-center space-x-3 shadow-gold-glow group"
            >
              <span>Begin Your Consultation</span>
              <ArrowRight className="h-4 w-4 text-obsidian-950 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
      {/* Dev Mode Debugger Indicator (Visible only in development to assist layout testing) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/85 text-[10px] text-gold-300 font-mono p-3.5 rounded-xl border border-gold-400/20 z-50 pointer-events-none space-y-1 backdrop-blur-md">
          <div className="font-bold border-b border-gold-400/10 pb-1 mb-1 text-[11px]">CHARIS CINEMATIC DEBUGGER</div>
          <div>MODE: <span className={useVideoFallback ? "text-red-400 font-bold" : "text-green-400 font-bold"}>{useVideoFallback ? "AUTOPLAY VIDEO FALLBACK" : "SCROLL-SCRUB CANVAS"}</span></div>
          <div>REDUCED MOTION: {prefersReducedMotion ? "YES" : "NO"}</div>
          <div>VIEWPORT WIDTH: {windowWidth}px</div>
          <div>INITIAL LOAD: {initialLoadComplete ? "COMPLETE" : `${preloadProgress}%`}</div>
          <div>FRAME ERRORS: {errorCountRef.current}</div>
          {useVideoFallback && errorCountRef.current > 5 && (
            <div className="text-red-400/80 mt-1 text-[9px] leading-relaxed">
              * Fallen back due to frame load errors.<br />
              Please restart your dev server!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
