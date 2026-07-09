import React, { useEffect, useState } from 'react';

// إعدادات Contentful
const SPACE_ID = 'd9xxs32o7haw';
const ACCESS_TOKEN = 'J4OO0km2v4nYb3f4ZVp6zhmIIKmChH4ucBryZMezNz0';
const CONTENT_TYPE = 'project'; 

const API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}`;

const translations = {
  en: {
    home: "Home",
    projects: "Projects",
    contact: "Contact",
    badge: "🚀 Available for Freelance",
    title: "ABD ELFTAH EBRAHEM",
    subtitle: "Professional Front-End Developer",
    desc: "I craft interactive, fast, and user-centric web interfaces. Turning complex designs into clean, responsive, and robust code.",
    ctaPrimary: "Explore My Work",
    ctaSecondary: "Get in Touch",
    featuredProjects: "Featured Projects",
    notice: "Live data fetched directly from Contentful CMS via API",
    demoLink: "View Live Demo →",
    getInTouch: "Get In Touch",
    contactNotice: "Feel free to reach out for collaborations.",
    fullName: "Full Name",
    phone: "Phone / WhatsApp",
    email: "Official Email",
    rights: "All rights reserved."
  },
  ar: {
    home: "الرئيسية",
    projects: "المشاريع",
    contact: "تواصل معي",
    badge: "🚀 متاح للعمل الحر حالياً",
    title: "عبد الفتاح إبراهيم",
    subtitle: "مطور واجهات أمامية محترف (Front-End)",
    desc: "أقوم ببناء واجهات ويب تفاعلية وسريعة تركز على تجربة المستخدم. أحول التصاميم المعقدة إلى كود برمي نظيف، متجاوب، وقوي.",
    ctaPrimary: "عرض مشاريعى",
    ctaSecondary: "تواصل معي",
    featuredProjects: "مشاريعى",
    notice: "عرض مشاريعى من contentful عبر Api",
    demoLink: "عرض المشروع←",
    getInTouch: "تواصل معى",
    contactNotice: "لا تتردد في التواصل معي من أجل الشراكات أو المشاريع.",
    fullName: "الاسم ",
    phone: "الهاتف / واتساب",
    email: "البريد الإلكتروني الرسمي",
    rights: "جميع الحقوق محفوظة."
  }
};

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('ar'); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const toggleLanguage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLang(prevLang => prevLang === 'en' ? 'ar' : 'en');
      setIsTransitioning(false);
    }, 150); 
  };

  const t = translations[lang];

  // كود سحري لضبط الفيو بورت تلقائياً ليصبح الموقع قريباً وملموماً على التليفون
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch from Contentful');
        
        const json = await response.json();
        
        if (json.items && json.items.length > 0) {
          const formattedProjects = json.items.map(item => ({
            id: item.sys.id,
            name: item.fields.name || item.fields.title || 'Untitled Project',
            link: item.fields['project link'] || item.fields.projectLink || item.fields.link || item.fields.url || '#'
          }));
          setProjects(formattedProjects);
        } else {
          setProjects([
            { 
              id: 1, 
              name: lang === 'en' ? 'Connected.. but no items found' : 'تم الاتصال.. ولكن لا توجد عناصر حالياً', 
              link: '#' 
            }
          ]);
        }
      } catch (error) {
        console.error('Contentful Fetch Error:', error);
        setProjects([
          { 
            id: 1, 
            name: lang === 'en' ? 'Default Project 1 (Error)' : 'مشروع افتراضي 1 (خطأ في الاتصال)', 
            link: '#' 
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, [lang]);

  return (
    <div className={`portfolio-container ${isDarkMode ? 'dark-theme' : 'light-theme'} ${isTransitioning ? 'fade-out' : 'fade-in'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <style>{`
        html, body { 
          scroll-behavior: smooth; 
          margin: 0; 
          padding: 0; 
          width: 100%;
          overflow-x: hidden; 
          -webkit-font-smoothing: antialiased;
        }
        * { box-sizing: border-box; }
        
        .portfolio-container { 
          background-color: var(--bg-main); 
          color: var(--text-main); 
          min-height: 100vh;
          width: 100%;
          transition: background-color 0.4s ease, color 0.4s ease;
          overflow-x: hidden;
        }
        
        .fade-in { opacity: 1; transition: opacity 0.25s ease; }
        .fade-out { opacity: 0; transition: opacity 0.15s ease; }

        .light-theme { 
          --bg-main: #fafbfc; 
          --bg-card: #ffffff; 
          --bg-card-sub: #f1f5f9; 
          --text-main: #0f172a; 
          --text-sub: #64748b; 
          --border: #e2e8f0; 
          --nav-bg: rgba(255, 255, 255, 0.85); 
          --shadow-color: rgba(0, 0, 0, 0.05); 
          --card-hover-shadow: rgba(59, 130, 246, 0.12); 
        }
        .dark-theme { 
          --bg-main: #0f172a; 
          --bg-card: #1e293b; 
          --bg-card-sub: #0f172a; 
          --text-main: #f8fafc; 
          --text-sub: #94a3b8; 
          --border: #334155; 
          --nav-bg: rgba(15, 23, 42, 0.85); 
          --shadow-color: rgba(0, 0, 0, 0.3); 
          --card-hover-shadow: rgba(59, 130, 246, 0.25); 
        }

        /* Navbar */
        .navbar { 
          position: fixed !important; 
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 9999 !important;
          background-color: var(--nav-bg);
          backdrop-filter: blur(12px); 
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px; 
          gap: 12px; 
        }
        .nav-brand { font-size: 1.25rem; font-weight: 900; letter-spacing: 0.05em; color: var(--text-main); min-width: auto; white-space: nowrap; }
        .nav-brand span { color: #3b82f6; }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-links-desktop { display: flex; gap: 32px; }
        .nav-links-desktop a { text-decoration: none; font-size: 0.875rem; font-weight: 600; color: var(--text-sub); padding: 4px 0; transition: color 0.3s; }
        .nav-links-desktop a:hover { color: #3b82f6; }

        .interactive-btn { 
          background: var(--bg-card-sub); 
          border: 1px solid var(--border); 
          font-size: 0.85rem; 
          cursor: pointer; 
          padding: 8px 14px; 
          border-radius: 9999px; 
          display: flex; 
          align-items: center; 
          color: var(--text-main); 
          font-weight: 600;
          min-width: 75px;
          justify-content: center;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .interactive-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 4px 12px var(--shadow-color);
        }
        
        .theme-toggle-btn { border-radius: 50%; width: 36px; height: 36px; padding: 0; font-size: 1.1rem; min-width: 36px; }
        .menu-toggle { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-main); padding: 4px; display: flex; align-items: center; justify-content: center; }
        
        .nav-links-mobile { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: var(--bg-card); border-bottom: 1px solid var(--border); padding: 24px; flex-direction: column; gap: 16px; transform: translateY(-20px); opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 15px -3px var(--shadow-color); }
        .nav-links-mobile.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .nav-links-mobile a { text-decoration: none; color: var(--text-main); font-weight: 600; font-size: 1rem; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.02); }

        /* Hero Section */
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 20px 60px 20px;
          gap: 40px;
          max-width: 1140px;
          margin: 0 auto;
        }

        .hero-info { width: 100%; display: flex; flex-direction: column; gap: 20px; text-align: center; align-items: center; }
        .badge { display: inline-block; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 6px 14px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; animation: pulseGlow 2s infinite; width: fit-content; max-width: 100%; }
        @keyframes pulseGlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .hero-title { font-size: 2.2rem; font-weight: 900; color: var(--text-main); line-height: 1.2; letter-spacing: -0.02em; word-break: break-word; }
        .hero-subtitle { font-size: 1.1rem; font-weight: 700; background: linear-gradient(to right, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.3; }
        .hero-desc { color: var(--text-sub); font-size: 0.95rem; line-height: 1.6; max-width: 500px; }
        
        .hero-cta { display: flex; flex-direction: column; gap: 12px; justify-content: center; width: 100%; align-items: center; }
        .btn { display: inline-block; text-decoration: none; padding: 14px 24px; border-radius: 12px; font-weight: 600; transition: all 0.3s ease; text-align: center; width: 100%; max-width: 280px; font-size: 0.95rem; }
        .btn-primary { background: linear-gradient(to right, #3b82f6, #2563eb); color: white; box-shadow: 0 10px 20px -3px rgba(37, 99, 235, 0.3); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 25px -3px rgba(37, 99, 235, 0.4); }
        .btn-secondary { background: var(--bg-card); border: 2px solid var(--border); color: var(--text-main); }
        .btn-secondary:hover { border-color: #3b82f6; transform: translateY(-3px); }

        /* Hero Graphic */
        .hero-graphic-container { width: 100%; display: flex; justify-content: center; position: relative; max-width: 100%; }
        .interactive-blue-box { position: relative; width: 100%; max-width: 320px; height: 320px; background-color: #1a202c; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 25px 50px -12px var(--shadow-color); transition: all 0.3s ease; }
        .interactive-blue-box:hover { transform: scale(1.02) rotate(-0.5deg); }
        .blue-box-glow { position: absolute; inset: -4px; background: linear-gradient(to right, #3b82f6, #6366f1); border-radius: 20px; filter: blur(12px); opacity: 0.2; }
        .browser-dots { display: flex; gap: 6px; opacity: 0.7; margin-bottom: 12px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background-color: #ef4444; } .yellow { background-color: #eab308; } .green { background-color: #22c55e; }
        .box-content { display: flex; flex-direction: column; align-items: center; gap: 12px; flex-grow: 1; justify-content: center; width: 100%; }
        .box-icon { font-size: 2.2rem; animation: float 3s infinite ease-in-out; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .box-tag { font-family: monospace; font-size: 1rem; font-weight: 700; color: white; }
        .box-code { font-family: monospace; font-size: 0.75rem; color: #93c5fd; line-height: 1.5; text-align: left; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; width: 100%; direction: ltr; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }

        /* Projects Section */
        .projects-section { background-color: var(--bg-card-sub); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 60px 20px; }
        .section-header { max-width: 1140px; margin: 0 auto 40px auto; text-align: center; padding: 0 10px; }
        .section-header h2 { font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; letter-spacing: -0.02em; }
        .section-header p { color: var(--text-sub); font-size: 0.95rem; line-height: 1.5; }
        
        /* ضبط المسافات بين الكروت لتصبح ملمومة وبمحاذاة ممتازة */
        .projects-grid { 
          max-width: 1140px; 
          margin: 0 auto; 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 24px; 
        }
        
        /* Project Cards */
        .project-card { 
          background-color: var(--bg-card); 
          border: 1px solid var(--border); 
          border-radius: 20px; 
          padding: 20px; 
          display: flex; 
          flex-direction: column; 
          justify-content: space-between; 
          height: 100%; 
          text-align: start; 
          position: relative;
          box-shadow: 0 4px 6px -1px var(--shadow-color);
          transition: all 0.4s cubic-bezier(0.16,  1,  0.3,  1);
        }
        .project-card:hover { 
          transform: translateY(-6px); 
          border-color: #3b82f6;
          box-shadow: 0 20px 25px -5px var(--card-hover-shadow), 0 10px 10px -5px var(--shadow-color); 
        }
        
        .project-preview { 
          width: 100%; 
          height: 150px; 
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); 
          border: 1px solid var(--border);
          border-radius: 14px; 
          margin-bottom: 16px; 
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          color: #3b82f6; 
          font-family: monospace; 
          font-size: 0.85rem; 
          font-weight: bold;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .project-preview::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1));
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .project-card:hover .project-preview {
          color: #ffffff;
          border-color: rgba(59, 130, 246, 0.3);
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
        }
        .project-card:hover .project-preview::before { opacity: 1; }
        .preview-icon { font-size: 2.4rem; margin-bottom: 6px; transition: transform 0.3s ease; }
        .project-card:hover .preview-icon { transform: scale(1.1) rotate(5deg); }

        .project-info-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .project-body h3 { font-size: 1.3rem; color: var(--text-main); font-weight: 800; line-height: 1.3; word-break: break-word; }
        .project-body p { color: var(--text-sub); font-size: 0.9rem; line-height: 1.6; }
        
        .project-link { 
          text-decoration: none; 
          font-size: 0.85rem; 
          font-weight: 700; 
          color: #3b82f6; 
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          width: fit-content;
          padding: 8px 14px;
          background-color: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all 0.3s ease;
          margin-top: auto;
        }
        .project-card:hover .project-link {
          gap: 12px;
          color: #ffffff;
          background-color: #3b82f6;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        /* Loader */
        .loader-container { display: flex; justify-content: center; padding: 40px 0; width: 100%; grid-column: 1 / -1; }
        .spinner { width: 32px; height: 32px; border: 4px solid var(--border); border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Contact Section */
        .contact-section { max-width: 1140px; margin: 0 auto; padding: 60px 20px; }
        .center { text-align: center; }
        
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .contact-card { background-color: var(--bg-card); border: 1px solid var(--border); padding: 24px 16px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 6px -1px var(--shadow-color); text-align: center; transition: all 0.3s ease; word-break: break-word; }
        .contact-card:hover { box-shadow: 0 20px 25px -5px var(--shadow-color); transform: translateY(-4px); border-color: #3b82f6; }
        .card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; min-width: 48px; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 12px; flex-shrink: 0; }
        .blue { background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; }
        .green { background-color: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .purple { background-color: rgba(99, 102, 241, 0.15); color: #6366f1; }
        .contact-card h4 { font-size: 0.75rem; color: var(--text-sub); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.05em; }
        .contact-card p, .contact-card a { font-size: 0.95rem; font-weight: 800; color: var(--text-main); text-decoration: none; word-break: break-all; }
        
        .footer { text-align: center; padding: 24px; border-top: 1px solid var(--border); font-size: 0.8rem; font-weight: 500; color: var(--text-sub); background-color: var(--bg-card); line-height: 1.4; }

        /* Media Queries للشاشات المتوسطة والكبيرة */
        @media (min-width: 480px) {
          .hero-title { font-size: 2.6rem; }
          .hero-cta { flex-direction: row; }
        }
        
        @media (min-width: 768px) { 
          .menu-toggle { display: none; } 
          .hero-section { flex-direction: row; text-align: start; gap: 40px; padding: 140px 24px 80px 24px; } 
          .hero-info { width: 50%; text-align: inherit; align-items: flex-start; } 
          .hero-cta { justify-content: flex-start; }
          .btn { width: auto; }
          .hero-graphic-container { width: 50%; justify-content: flex-end; } 
          .interactive-blue-box { max-width: 360px; height: 360px; }
          .hero-title { font-size: 3.2rem; } 
          .section-header { text-align: start; }
          .section-header h2 { font-size: 2.4rem; }
        }
        
        @media (min-width: 1024px) { 
          .hero-title { font-size: 3.8rem; }
        }
        
        /* التعديل الجذري للموبايل: لجعل العناصر قريبة وملمومة 100% وبدون مسافات فارغة */
        @media (max-width: 767px) { 
          .nav-links-desktop { display: none; } 
          .menu-toggle { display: block; } 
          .nav-links-mobile { display: flex; } 
          
          .hero-section {
            padding: 100px 16px 40px 16px;
            gap: 32px;
          }
          
          .hero-title {
            font-size: 2rem !important;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .interactive-blue-box {
            max-width: 290px;
            height: 290px;
          }
        }
      `}</style>

      {/* Navigation */}
      <header className="navbar">
        <div className="nav-brand">
          {lang === 'en' ? <>ABD ELFTAH<span>.</span></> :  <>عبد الفتاح<span>.</span></>}
        </div>
        
        <div className="nav-right">
          <nav className="nav-links-desktop">
            <a href="#hero">{t.home}</a>
            <a href="#projects">{t.projects}</a>
            <a href="#contact">{t.contact}</a>
          </nav>

          <button onClick={toggleLanguage} className="interactive-btn">
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          <button onClick={toggleDarkMode} className="interactive-btn theme-toggle-btn">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-toggle">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`nav-links-mobile ${isMenuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setIsMenuOpen(false)}>{t.home}</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>{t.projects}</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.contact}</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-info">
          <div className="badge">{t.badge}</div>
          <h1 className="hero-title">{t.title}</h1>
          <h2 className="hero-subtitle">{t.subtitle}</h2>
          <p className="hero-desc">{t.desc}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">{t.ctaPrimary}</a>
            <a href="#contact" className="btn btn-secondary">{t.ctaSecondary}</a>
          </div>
        </div>

        <div className="hero-graphic-container">
          <div className="blue-box-glow"></div>
          <div className="interactive-blue-box">
            <div className="browser-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="box-content">
              <div className="box-icon">📦</div>
              <div className="box-tag">&lt;frontend/&gt;</div>
              <pre className="box-code">
{`// Contentful CDA Delivery
const space = '${SPACE_ID.substring(0,6)}...';
const environment = 'master';
const response = 'JSON Content';`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <h2>{t.featuredProjects}</h2>
          <p>{t.notice}</p>
        </div>

        <div className="projects-grid">
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id || Math.random()} className="project-card">
                <div className="project-info-wrapper">
                  <div className="project-preview">
                    <span className="preview-icon">💻</span>
                    <span>&lt; VIEW_PROJECT /&gt;</span>
                  </div>
                  <div className="project-body">
                    <h3>{project.name}</h3>
                    <p>{lang === 'en' ? 'Built with React and contentful CMS' : 'مشروع react متصل ب contentful لادارة المحتوى بسهوله'}</p>
                  </div>
                </div>
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                  {t.demoLink}
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-header center">
          <h2>{t.getInTouch}</h2>
          <p>{t.contactNotice}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="card-icon blue">👤</div>
            <h4>{t.fullName}</h4>
            <p>{lang === 'en' ? 'ABD ELFTAH EBRAHEM' : 'عبد الفتاح إبراهيم'}</p>
          </div>

          <div className="contact-card">
            <div className="card-icon green">📞</div>
            <h4>{t.phone}</h4>
            <p>+20 1037849789</p>
          </div>

          <div className="contact-card">
            <div className="card-icon purple">✉️</div>
            <h4>{t.email}</h4>
            <a href="mailto:abrahymbdh703@gmail.com">abrahymbdh703@gmail.com</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} {lang === 'en' ? 'ABD ELFTAH EBRAHEM' : 'عبد الفتاح إبراهيم'}. {t.rights}
      </footer>
    </div>
  );
}

export default Portfolio;
