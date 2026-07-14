import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import BentoCard from './BentoCard'
import AnimatedCounter from './AnimatedCounter'
import Modal from './Modal'

export default function BentoGrid() {
  const [activeModal, setActiveModal] = useState(null)
  const [activeVideoIdx, setActiveVideoIdx] = useState(0)
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)
  
  const modalVideoRef = useRef(null)
  const serviceScrollRef = useRef(null)

  // Drag-to-scroll state for desktop/laptop mouse users
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const videos = [
    {
      title: "Modest Outfit Inspiration",
      category: "Fashion Haul",
      desc: "Padu padan warna bumi (earth tone) minimalis yang memberikan kesan anggun namun tetap kasual untuk aktivitas sehari-hari.",
      src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-modeling-in-front-of-mirror-51584-large.mp4",
      poster: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Soft Glam Makeup Tutorial",
      category: "Beauty Tips",
      desc: "Langkah-langkah riasan wajah natural yang segar dan tahan lama, diformulasikan khusus untuk tipe kulit sensitif.",
      src: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-applying-makeup-eyeshadow-40782-large.mp4",
      poster: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Honest Skincare Review (UGC)",
      category: "Skincare Review",
      desc: "Kupas tuntas tekstur, kelembapan, dan hasil nyata pemakaian produk lokal moisturizer selama 7 hari berturut-turut.",
      src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-face-cream-smiling-41716-large.mp4",
      poster: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  const services = [
    {
      title: "Video UGC",
      desc: "Video promosi kreatif 15-30 detik untuk TikTok & Reels.",
      tags: ["Ads", "UGC", "Review"]
    },
    {
      title: "Instagram Post",
      desc: "Konten estetis feed, carousel & story untuk jangkauan organik.",
      tags: ["Reels", "Post", "Story"]
    },
    {
      title: "Product Styling",
      desc: "Styling visual foto & video produk modest fashion estetik.",
      tags: ["Styling", "Photo", "Aesthetic"]
    }
  ]

  // Play video automatically when playlist changes inside the modal
  useEffect(() => {
    if (activeModal === 'showreel' && modalVideoRef.current) {
      modalVideoRef.current.load()
      modalVideoRef.current.play().catch(() => {
        // Autoplay policy blocker handling
      })
    }
  }, [activeVideoIdx, activeModal])

  // Track horizontal scroll position of services list
  const handleServiceScroll = () => {
    if (serviceScrollRef.current) {
      const containerRect = serviceScrollRef.current.getBoundingClientRect()
      const children = serviceScrollRef.current.children
      let closestIdx = 0
      let minDiff = Infinity
      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect()
        const diff = Math.abs(childRect.left - containerRect.left)
        if (diff < minDiff) {
          minDiff = diff
          closestIdx = i
        }
      }
      setActiveServiceIdx(closestIdx)
    }
  }

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    if (!serviceScrollRef.current) return
    setIsDragging(true)
    e.preventDefault()
    startX.current = e.pageX - serviceScrollRef.current.offsetLeft
    scrollLeftStart.current = serviceScrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !serviceScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - serviceScrollRef.current.offsetLeft
    // walk represents the distance multiplied by a scaling factor
    const walk = (x - startX.current) * 1.5
    serviceScrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 auto-rows-[225px] sm:auto-rows-[250px] md:auto-rows-[280px]">

      {/* ═══ 1. TENTANG / ABOUT ═══ */}
      <BentoCard
        delay={0}
        enableTilt
        className="!bg-brand-card p-6 sm:p-8 flex flex-col col-span-2 md:order-1"
      >
        <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit mb-4 sm:mb-5">
          Tentang
        </span>
        <p className="text-base sm:text-lg md:text-[20px] leading-[1.65] sm:leading-[1.7] font-medium text-brand-text mt-1 pr-2 sm:pr-4">
          Kreator{' '}
          <span className="font-bold bg-gradient-to-r from-brand-accent to-brand-peach bg-clip-text text-transparent">
            Modest Fashion & Beauty
          </span>{' '}
          dari Malang. Menciptakan visual estetis dan strategi konten yang meningkatkan konversi brand.
        </p>
        <div className="absolute -bottom-16 -right-16 w-36 sm:w-48 h-36 sm:h-48 bg-brand-accent-light rounded-full opacity-40 blur-3xl pointer-events-none blob-animate" />
      </BentoCard>

      {/* ═══ 2. AVATAR + SPINNING TEXT ═══ */}
      <BentoCard 
        delay={0.1} 
        className="!bg-brand-card p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center col-span-1 md:order-2"
      >
        {/* Spinning Text */}
        <div className="absolute inset-0 p-4 sm:p-5 spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <path id="circle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text fontSize="8.5" fontWeight="600" fill="#D4838F" style={{ letterSpacing: '2.5px' }}>
              <textPath href="#circle">AVAILABLE FOR WORK • AVAILABLE FOR WORK • </textPath>
            </text>
          </svg>
        </div>
        {/* Profile Photo */}
        <div className="w-[64px] h-[64px] xs:w-[76px] xs:h-[76px] sm:w-[95px] sm:h-[95px] rounded-full overflow-hidden z-10 border-[3px] border-white shadow-lg ring-4 ring-brand-accent-light float-gentle">
          <img
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Aesthetic Creator"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </BentoCard>

      {/* ═══ 3. INSTAGRAM HERO (Side-by-side with Avatar on mobile) ═══ */}
      <BentoCard
        direction="left"
        delay={0.15}
        className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center group col-span-1 md:order-4"
        style={{ background: 'linear-gradient(135deg, #F0A8B6 0%, #C96B7A 100%)' }}
      >
        <motion.svg
          className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 text-white/90"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </motion.svg>
        <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium mt-2">@yourusername</p>
        <motion.a
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="w-7 h-7 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer absolute bottom-3 right-3 sm:bottom-5 sm:right-5 hover:shadow-lg transition-shadow duration-300"
        >
          <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C96B7A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7,7 17,7 17,17" />
          </svg>
        </motion.a>
      </BentoCard>

      {/* ═══ 4. VIDEO SHOWREEL (Below Avatar+IG on mobile, spanning 2 rows) ═══ */}
      <BentoCard
        direction="right"
        delay={0.2}
        onClick={() => setActiveModal('showreel')}
        className="!bg-brand-card-alt col-span-2 row-span-2 md:col-span-1 md:row-span-2 md:order-3 group cursor-pointer"
      >
        {/* Video Autoplay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          poster="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-modeling-in-front-of-mirror-51584-large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0 z-10 pointer-events-none" />
        <div className="relative z-20 p-5 sm:p-7 flex flex-col h-full">
          <span className="bg-white/95 backdrop-blur-sm text-brand-badge-text text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit">
            Showreel
          </span>
          <div className="mt-auto">
            <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white drop-shadow-lg flex items-center gap-1.5">
              Beauty Campaign
            </h3>
            <p className="text-white/85 text-[11px] sm:text-xs md:text-sm mt-1 flex items-center gap-1.5">
              <span>TikTok & Reels</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
            </p>
          </div>
        </div>
        {/* floating play label */}
        <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:bg-brand-accent transition-all duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>
        {/* Play hover effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </motion.div>
      </BentoCard>

      {/* ═══ 5. CONTENT PERFORMANCE ═══ */}
      <BentoCard 
        delay={0.25} 
        enableTilt 
        onClick={() => setActiveModal('performance')}
        className="!bg-brand-card p-6 sm:p-8 flex flex-col col-span-2 md:order-5 cursor-pointer group"
      >
        <div className="flex justify-between items-start mb-4 sm:mb-5">
          <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit">
            Performa
          </span>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="border border-brand-accent-light rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold hover:bg-brand-accent-light/50 flex items-center gap-1.5 sm:gap-2 transition-all duration-300 text-brand-accent group-hover:border-brand-accent group-hover:text-brand-badge-text"
          >
            Media Kit
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7,7 17,7 17,17" />
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-col flex-grow justify-between">
          <div className="flex justify-between items-center py-1.5 sm:py-3 border-b border-brand-accent-light/50 border-dashed">
            <div>
              <h4 className="font-semibold text-xs sm:text-sm md:text-base text-brand-text">Engagement Rate</h4>
              <p className="text-[10px] sm:text-[13px] text-brand-muted mt-0.5">TikTok Analytics</p>
            </div>
            <AnimatedCounter target={7.71} suffix="%" className="font-display font-bold text-lg sm:text-xl md:text-2xl text-brand-accent" />
          </div>
          <div className="flex justify-between items-center py-1.5 sm:py-3 border-b border-brand-accent-light/50 border-dashed">
            <div>
              <h4 className="font-semibold text-xs sm:text-sm md:text-base text-brand-text">Total Audience</h4>
              <p className="text-[10px] sm:text-[13px] text-brand-muted mt-0.5">Instagram & TikTok</p>
            </div>
            <AnimatedCounter target={2900} suffix="+" className="font-display font-bold text-lg sm:text-xl md:text-2xl text-brand-accent" />
          </div>
          <div className="flex justify-between items-center py-1.5 sm:py-3">
            <div>
              <h4 className="font-semibold text-xs sm:text-sm md:text-base text-brand-text">Primary Niche</h4>
            </div>
            <span className="bg-brand-accent-light text-brand-badge-text text-[10px] sm:text-xs md:text-sm font-semibold px-2.5 sm:px-4 py-1 rounded-full group-hover:bg-brand-badge-bg transition-colors duration-300">
              Modest Fashion
            </span>
          </div>
        </div>
      </BentoCard>

      {/* ═══ 6. LAYANAN / SERVICES (Horizontal Scrollable Carousel - No Popup - Full Descriptions) ═══ */}
      <BentoCard 
        direction="left" 
        delay={0.3} 
        className="!bg-brand-card px-5 pt-5 pb-3 sm:p-6 md:p-8 flex flex-col col-span-2 md:col-span-1 md:order-6 group select-none relative"
      >
        <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full absolute top-5 left-5 z-20">
          Layanan
        </span>
        
        {/* Scrollable Container with vertically centered slides & reduced top margin */}
        <div 
          ref={serviceScrollRef}
          onScroll={handleServiceScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex-1 flex overflow-x-auto scrollbar-none gap-4 mt-4 w-full cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            scrollBehavior: isDragging ? 'auto' : 'smooth'
          }}
        >
          {services.map((srv, idx) => (
            <div 
              key={idx} 
              className="w-[86%] sm:w-[88%] md:w-[92%] shrink-0 snap-start flex flex-col justify-center pb-1 h-full"
            >
              <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-brand-text">
                {srv.title}
              </h3>
              <p className="text-[10px] sm:text-[13px] md:text-[14px] text-brand-muted leading-relaxed mt-0.5">
                {srv.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {srv.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-[10px] md:text-[11px] font-medium bg-brand-bg text-brand-muted px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Page Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-2 shrink-0">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation()
                if (serviceScrollRef.current) {
                  const children = serviceScrollRef.current.children
                  if (children[idx]) {
                    children[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
                  }
                }
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeServiceIdx === idx ? 'bg-brand-accent w-4' : 'bg-brand-accent-light hover:bg-brand-accent/40'
              }`}
              aria-label={`Go to service ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute -top-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-brand-accent-light/30 rounded-full blur-2xl pointer-events-none blob-animate" />
      </BentoCard>

      {/* ═══ 7. CASE STUDY — FASHION HAUL ═══ */}
      <BentoCard 
        direction="scale" 
        delay={0.35} 
        onClick={() => setActiveModal('casestudy')}
        className="!bg-brand-card-alt col-span-2 md:order-7 group cursor-pointer"
      >
        <div className="relative z-20 p-5 sm:p-8">
          <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit">
            Case Study
          </span>
        </div>
        <h3 className="font-display font-bold text-base sm:text-lg md:text-xl absolute bottom-5 left-5 sm:bottom-8 sm:left-8 z-20 group-hover:text-brand-accent transition-colors duration-300">
          Fashion Haul
        </h3>
        {/* Phone Mockup */}
        <div
          className="absolute border-[5px] sm:border-[7px] border-gray-900 bg-white rounded-t-[20px] sm:rounded-t-[32px] border-b-0 shadow-[var(--shadow-device)] overflow-hidden phone-notch transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3"
          style={{ width: 'clamp(120px, 18vw, 220px)', height: 'clamp(140px, 24vw, 270px)', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
        >
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fashion Haul" className="w-full h-full object-cover mt-4 sm:mt-5" loading="lazy" />
        </div>
        <div className="absolute top-8 right-8 w-24 sm:w-32 h-24 sm:h-32 bg-brand-peach/20 rounded-full blur-3xl pointer-events-none blob-animate" />
      </BentoCard>

      {/* ═══ 8. GALLERY / STYLING ═══ */}
      <BentoCard direction="right" delay={0.4} className="!bg-brand-card-alt group col-span-2 md:col-span-1 md:order-8">
        <div className="relative z-20 p-5 sm:p-7">
          <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit">
            Gallery
          </span>
        </div>
        <h3 className="font-display font-bold text-sm sm:text-base md:text-lg absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-20">
          Styling
        </h3>
        {/* Phone Mockup Angled */}
        <div
          className="absolute border-[5px] sm:border-[6px] border-gray-900 bg-white rounded-[20px] sm:rounded-[24px] shadow-[var(--shadow-device)] overflow-hidden phone-notch transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-8deg] group-hover:scale-105"
          style={{ width: 'clamp(110px, 16vw, 190px)', height: 'clamp(220px, 32vw, 380px)', right: '15px', bottom: '-75px', transform: 'rotate(-12deg)' }}
        >
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Makeup Styling" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </BentoCard>

      {/* ════════════════════════════════════════════════ */}
      {/* ═══ DETAIL MODALS ═══ */}
      {/* ════════════════════════════════════════════════ */}

      {/* 🎥 SHOWREEL MODAL */}
      <Modal
        isOpen={activeModal === 'showreel'}
        onClose={() => setActiveModal(null)}
        title="Video Showreel & Portfolio"
      >
        <div className="flex flex-col md:grid md:grid-cols-5 gap-6">
          {/* Left: Video Player */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="relative aspect-[9/16] max-h-[480px] w-full rounded-2xl overflow-hidden border border-brand-accent-light bg-black shadow-lg">
              <video
                ref={modalVideoRef}
                controls
                src={videos[activeVideoIdx].src}
                poster={videos[activeVideoIdx].poster}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-badge-text bg-brand-badge-bg px-3 py-1 rounded-full">
                {videos[activeVideoIdx].category}
              </span>
              <h4 className="font-display font-bold text-lg text-brand-text mt-2">
                {videos[activeVideoIdx].title}
              </h4>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                {videos[activeVideoIdx].desc}
              </p>
            </div>
          </div>

          {/* Right: Playlist */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h5 className="font-semibold text-xs text-brand-muted uppercase tracking-wider">
              Pilih Video Lainnya
            </h5>
            <div className="flex flex-col gap-3">
              {videos.map((vid, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideoIdx(idx)}
                  className={`flex gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    activeVideoIdx === idx
                      ? 'border-brand-accent bg-brand-accent-light/40 shadow-sm'
                      : 'border-brand-accent-light/60 hover:bg-white/50 hover:border-brand-accent/50'
                  }`}
                >
                  <div className="w-12 h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-100 relative">
                    <img src={vid.poster} alt={vid.title} className="w-full h-full object-cover" />
                    {activeVideoIdx === idx && (
                      <div className="absolute inset-0 bg-brand-accent/30 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[9px] font-semibold text-brand-badge-text uppercase">
                      {vid.category}
                    </span>
                    <h6 className="font-bold text-xs text-brand-text truncate mt-1">
                      {vid.title}
                    </h6>
                    <p className="text-[10px] text-brand-muted line-clamp-2 mt-0.5">
                      {vid.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* 📊 CONTENT PERFORMANCE (MEDIA KIT) MODAL */}
      <Modal
        isOpen={activeModal === 'performance'}
        onClose={() => setActiveModal(null)}
        title="Analisis Kinerja Konten"
      >
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Statistik keterlibatan (engagement) dan jangkauan audiens Kreator yang diverifikasi melalui analitik platform resmi (TikTok & Instagram). Cocok untuk kampanye bertarget di segmen wanita muda.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-brand-accent-light/50 text-center shadow-sm">
              <h5 className="text-[11px] sm:text-xs text-brand-muted font-medium uppercase tracking-wider">Engagement Rate</h5>
              <p className="font-display font-extrabold text-2xl sm:text-3xl text-brand-accent mt-1">7.71%</p>
              <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-2">
                Rata-rata Industri: 3.2%
              </span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-brand-accent-light/50 text-center shadow-sm">
              <h5 className="text-[11px] sm:text-xs text-brand-muted font-medium uppercase tracking-wider">Total Audiens</h5>
              <p className="font-display font-extrabold text-2xl sm:text-3xl text-brand-accent mt-1">2.9K+</p>
              <span className="text-[10px] text-brand-badge-text font-semibold bg-brand-accent-light px-2 py-0.5 rounded-full inline-block mt-2">
                Instagram + TikTok
              </span>
            </div>
          </div>

          {/* Demografi Audien */}
          <div className="space-y-4 pt-2">
            <h4 className="font-display font-bold text-base text-brand-text">Demografi Audien</h4>

            {/* Gender */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-brand-text">
                <span>Perempuan (92.3%)</span>
                <span className="text-brand-muted">Laki-laki (7.7%)</span>
              </div>
              <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '92.3%' }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  className="h-full bg-gradient-to-r from-brand-accent to-[#ECA0AA]"
                />
                <div className="h-full bg-neutral-300 flex-1" />
              </div>
            </div>

            {/* Rentang Usia */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold text-brand-muted tracking-wider uppercase">Rentang Usia</h5>
              {[
                { label: '18 - 24 Tahun', pct: 45 },
                { label: '25 - 34 Tahun', pct: 38 },
                { label: '13 - 17 Tahun', pct: 10 },
                { label: '35+ Tahun', pct: 7 }
              ].map((age, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-brand-text">
                    <span>{age.label}</span>
                    <span className="font-semibold text-brand-accent">{age.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${age.pct}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                      className="h-full bg-brand-accent/80"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Kota Teratas */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold text-brand-muted tracking-wider uppercase">Kota Utama Audien</h5>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { city: '1. Malang (32%)', bar: 'w-[85%]' },
                  { city: '2. Jakarta (28%)', bar: 'w-[75%]' },
                  { city: '3. Surabaya (22%)', bar: 'w-[60%]' },
                  { city: '4. Bandung (18%)', bar: 'w-[48%]' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-xl border border-brand-accent-light/30">
                    <span className="text-xs font-medium text-brand-text block">{item.city}</span>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full bg-brand-peach ${item.bar}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Modal>

      {/* 💼 SERVICES & RATES MODAL */}
      <Modal
        isOpen={activeModal === 'services'}
        onClose={() => setActiveModal(null)}
        title="Paket Layanan & Kerjasama"
      >
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Pilihan paket konten terstruktur untuk meningkatkan performa digital brand Anda. Semua konten diproduksi dengan peralatan profesional dan diarahkan secara estetik sesuai arahan kreatif.
          </p>

          <div className="space-y-4">
            {[
              {
                title: 'Paket UGC Video Tunggal',
                price: 'Rp 1.200.000',
                popular: false,
                features: ['1x Video (TikTok/Reels, 15-30 detik)', 'Riset konsep & penulisan naskah', 'Hak lisensi iklan selama 3 bulan', 'Maksimal 2x revisi minor']
              },
              {
                title: 'UGC Video Bundle (3 Video)',
                price: 'Rp 3.000.000',
                popular: true,
                features: ['3x Video kreatif yang berbeda', 'Cocok untuk variasi A/B Testing iklan', 'Hak lisensi iklan selama 6 bulan', 'Prioritas pengerjaan (3-5 hari)']
              },
              {
                title: 'Sponsorship Feed + Story',
                price: 'Rp 800.000',
                popular: false,
                features: ['1x Reels di Instagram @yourusername', '2x Stories dengan stiker link langsung', 'Sertakan tag partner kolaborasi', 'Analitik laporan performa setelah 7 hari']
              }
            ].map((pkg, i) => (
              <div
                key={i}
                className={`relative p-5 rounded-2xl border transition-all duration-300 ${
                  pkg.popular
                    ? 'border-brand-accent bg-brand-accent-light/15 shadow-md'
                    : 'border-brand-accent-light/60 bg-white'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-5 text-[9px] uppercase font-extrabold tracking-wider bg-brand-accent text-white px-3 py-1 rounded-full shadow-sm">
                    Paling Diminati
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-display font-bold text-base text-brand-text">{pkg.title}</h5>
                    <p className="font-display font-extrabold text-brand-accent text-base sm:text-lg mt-1">{pkg.price}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-brand-muted flex items-start gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4838F" strokeWidth="3" className="mt-0.5 shrink-0">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Workflow */}
          <div className="pt-2">
            <h4 className="font-display font-bold text-base text-brand-text mb-4">Alur Kerja (Workflow)</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { step: '1. Briefing & DP', desc: 'Brand mengisi brief kreatif & pembayaran uang muka 50%.' },
                { step: '2. Naskah Konten', desc: 'Kreator menyusun konsep video & naskah untuk disetujui.' },
                { step: '3. Produksi (3-5 Hari)', desc: 'Pengambilan gambar & pengeditan video profesional.' },
                { step: '4. Peluncuran', desc: 'Revisi minor (jika ada), pelunasan, lalu file dikirim/diposting.' }
              ].map((flow, idx) => (
                <div key={idx} className="bg-white/60 p-3 rounded-xl border border-brand-accent-light/30">
                  <span className="text-xs font-bold text-brand-badge-text">{flow.step}</span>
                  <p className="text-[10px] sm:text-xs text-brand-muted mt-1 leading-relaxed">{flow.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center">
            <motion.a
              href="https://wa.me/628123456789?text=Halo%20Kak,%20saya%20tertarik%20untuk%20bekerja%20sama%20menggunakan%20layanan%20UGC%20Anda."
              target="_blank"
              rel="noopener"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center bg-brand-cta text-white font-semibold py-3 rounded-xl hover:bg-brand-cta-hover transition-all duration-300 text-sm shadow-md"
            >
              Hubungi via WhatsApp
            </motion.a>
          </div>
        </div>
      </Modal>

      {/* 📖 CASE STUDY MODAL */}
      <Modal
        isOpen={activeModal === 'casestudy'}
        onClose={() => setActiveModal(null)}
        title="Studi Kasus: Fashion Haul"
      >
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-brand-accent-light/50 shadow-sm bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Fashion Haul Kampanye"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <div>
                <span className="bg-brand-accent text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  UMKM Hijab Malang
                </span>
                <h4 className="font-display font-bold text-lg text-white mt-1.5 drop-shadow-md">
                  Kampanye Ramadhan Koleksi Lebaran
                </h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { num: '45.2K+', label: 'Total Views' },
              { num: '7.71%', label: 'Engagement Rate' },
              { num: '120+', label: 'Kode Voucher' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-3 rounded-xl border border-brand-accent-light/50 text-center">
                <span className="font-display font-extrabold text-base sm:text-lg text-brand-accent block">{stat.num}</span>
                <span className="text-[10px] text-brand-muted font-medium mt-0.5 block">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-brand-text uppercase tracking-wider">Tantangan Klien</h5>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                Brand lokal hijab di Malang meluncurkan koleksi pashmina sutra baru untuk menyambut Idul Fitri. Namun, mereka kesulitan mendapatkan traksi di media sosial dan mengarahkan lalu lintas ke toko online (Shopee).
              </p>
            </div>

            <div>
              <h5 className="font-bold text-xs sm:text-sm text-brand-text uppercase tracking-wider">Strategi Konten Kreator</h5>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                Kreator membuat video transisi kreatif tipe "Outfit Check" berdurasi 25 detik dengan gaya penyuntingan yang cepat namun estetik. Kreator menunjukkan padu padan 4 gaya hijab untuk 4 agenda Lebaran berbeda, menonjolkan fitur kain pashmina yang anti-lecek, mudah dibentuk, dan adem.
              </p>
            </div>

            <div className="bg-brand-accent-light/20 p-4 rounded-xl border border-brand-accent-light/50 border-dashed">
              <h6 className="font-bold text-xs text-brand-badge-text">Testimoni Klien:</h6>
              <p className="text-xs text-brand-text italic mt-1.5 leading-relaxed">
                "Kerjasama dengan Kreator melampaui harapan kami! Videonya sangat organik, estetik, dan audiens kami sangat menyukainya. Penjualan pashmina kami meningkat signifikan selama periode voucher Kreator aktif."
              </p>
              <span className="text-[10px] font-semibold text-brand-muted block mt-2">
                — Owner Hijab Nusantara Malang
              </span>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}
