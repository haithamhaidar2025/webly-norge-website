import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  { href: '#tjenester', label: 'Tjenester' },
  { href: '#arbeid', label: 'Eksempler' },
  { href: '#pris', label: 'Pris' },
];

function Logo() {
  return (
    <a className="logo" href="#top" data-testid="link-logo">
      <span className="logo-mark" aria-hidden="true" />
      <span>WEBLY<span className="logo-soft">NORGE</span></span>
    </a>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={`reveal ${delay ? `delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav container-wide">
        <Logo />
        <nav className="desktop-nav" aria-label="Hovedmeny">
          {navItems.map((item) => <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</a>)}
          <a className="nav-cta" href="#kontakt" data-testid="link-nav-demo">Få gratis demo <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-label="Mobilmeny">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</a>)}
        <a href="#kontakt" onClick={closeMenu} data-testid="link-mobile-demo">Få gratis demo <ArrowUpRight size={14} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-wrap">
          <div className="hero-copy">
            <Reveal><span className="kicker">Nettsider for små bedrifter</span></Reveal>
            <Reveal delay={1}><h1 className="display hero-title">Nettsiden din skal gjøre mer enn å bare <em>se bra ut.</em></h1></Reveal>
            <Reveal delay={2}><p className="hero-lead">Jeg lager raske, moderne og profesjonelle nettsider som gjør det enkelt for kundene dine å finne informasjon, bestille og ta kontakt.</p></Reveal>
            <Reveal delay={3}>
              <div className="hero-actions">
                <a className="button button-primary" href="#kontakt" data-testid="link-hero-demo">Få gratis demo <ArrowUpRight size={16} /></a>
                <a className="button button-outline" href="#arbeid" data-testid="link-hero-work">Se hva jeg lager</a>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="hero-proof" aria-label="Fordeler">
                <div className="proof-item"><span className="proof-number">01</span><span className="proof-label">Mobiltilpasset</span></div>
                <div className="proof-item"><span className="proof-number">02</span><span className="proof-label">Rask levering</span></div>
                <div className="proof-item"><span className="proof-number">03</span><span className="proof-label">Enkel fast pris</span></div>
              </div>
            </Reveal>
          </div>
          <Reveal className="hero-visual" delay={2}>
            <div className="browser" aria-label="Eksempel på restaurant-nettside">
              <div className="browser-top">
                <div className="browser-dots"><span /><span /><span /></div>
                <div className="browser-address">dinbedrift.no</div>
                <div aria-hidden="true">···</div>
              </div>
              <div className="demo-site">
                <div className="demo-nav"><b>NORD.</b><span>MENY &nbsp; OM OSS &nbsp; KONTAKT</span></div>
                <div className="demo-content">
                  <span className="demo-label">ÅPENT I DAG · 10–22</span>
                  <h3>God mat.<br />Enkel bestilling.</h3>
                  <p>Bestill på nett og hent når det passer.</p>
                  <button type="button" data-testid="button-demo-menu">SE MENY</button>
                </div>
              </div>
            </div>
            <div className="floating-card floating-one"><strong><Check size={14} /></strong><div><b>Bestilling mottatt</b><small>Klar til henting 18:30</small></div></div>
            <div className="floating-card floating-two"><b>Mobilvennlig</b><small>Ser bra ut på alle skjermer</small></div>
          </Reveal>
        </div>
      </section>
      <section className="audience" aria-label="Hvem vi lager nettsider for">
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span className="audience-label">PASSER FOR</span>
          <span className="audience-separator" />
          <strong>FRISØRER</strong><span className="audience-separator" /><strong>RESTAURANTER</strong><span className="audience-separator" /><strong>KAFÉER</strong><span className="audience-separator" /><strong>SMÅ BEDRIFTER</strong>
        </div>
      </section>
    </>
  );
}

const services = [
  { num: '01', title: 'Bedriftsnettside', copy: 'En ren og profesjonell side med tjenester, priser, åpningstider, kontakt og kart.', tags: ['Mobil', 'PC', 'Nettbrett'], tone: 'large', symbol: '✦' },
  { num: '02', title: 'Restaurant & takeaway', copy: 'Digital meny med pizza, burger, drikke og andre varer. Kunden bestiller for henting og betaler i restauranten.', tags: ['Handlekurv', 'Henting', 'Meny'], tone: 'dark', symbol: '⌁' },
  { num: '03', title: 'Frisør & salong', copy: 'Vis behandlinger, prisliste, bilder, åpningstider og lenke til timebestilling.', tags: ['Priser', 'Booking', 'Galleri'], tone: '', symbol: '⌇' },
];

function Services() {
  return (
    <section id="tjenester" className="section-pad">
      <div className="container-wide">
        <Reveal className="section-heading"><span className="kicker">Tjenester</span><h2>En nettside bygget rundt bedriften din.</h2><p>Ikke en tilfeldig mal. Jeg tilpasser design, innhold og funksjoner etter det kundene dine faktisk trenger.</p></Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.num} delay={(index % 3) + 1} className={`service-card ${service.tone}`}>
              <span className="service-number">{service.num}</span>
              <span className="service-symbol" aria-hidden="true">{service.symbol}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </Reveal>
          ))}
          <Reveal className="service-card accent" delay={1}>
            <span className="service-number">04</span>
            <span className="service-symbol" aria-hidden="true"><ArrowUpRight size={22} /></span>
            <h3>Gratis demo først</h3>
            <p>Jeg kan lage et konkret forslag med bedriftens navn før kunden bestemmer seg.</p>
            <a className="service-link" href="#kontakt" data-testid="link-service-demo">Be om demo <ArrowUpRight size={14} /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="arbeid" className="work-section">
      <div className="container-wide">
        <Reveal className="dark-heading"><span className="kicker kicker-light">Eksempler</span><h2>Fra enkel infoside til komplett bestillingsside.</h2></Reveal>
        <div className="showcase-grid">
          <Reveal className="showcase-card restaurant-card" delay={1}>
            <div className="showcase-top"><span>RESTAURANT</span><i>01</i></div>
            <div className="fake-phone">
              <div className="phone-screen">
                <div className="phone-head"><b>HENT & SPIS</b><span>≡</span></div>
                <div className="food-copy"><small>FERSK · RASK · ENKEL</small><h4>Bestill favoritten din.</h4><button className="phone-button" type="button" data-testid="button-showcase-menu">SE MENY</button></div>
                <div className="food-items"><span>Pizza</span><span>Burger</span><span>Drikke</span></div>
              </div>
            </div>
          </Reveal>
          <Reveal className="showcase-card salon-card" delay={2}>
            <div className="showcase-top"><span>FRISØR</span><i>02</i></div>
            <div className="salon-design">
              <div className="salon-nav">STUDIO <b>K.</b><span>BOOK TIME</span></div>
              <div className="salon-center"><small>FRISØR · TRONDHEIM</small><h4>En bedre<br />salongopplevelse.</h4><p>Klipp · Fade · Skjegg</p></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function VisualPanels() {
  return (
    <section className="wallpaper-showcase" aria-label="Eksempler på nettsider">
      <div className="wallpaper-panel restaurant-bg">
        <div className="container-wide wallpaper-copy">
          <Reveal><span className="kicker kicker-light">Restaurant</span><h2>Bestilling som føles like enkel som å sende en melding.</h2><p>Meny, handlekurv, henting og tydelig kontakt — samlet i én moderne opplevelse.</p><a className="button glass-button" href="#kontakt" data-testid="link-restaurant-demo">Se restaurant-demo <ArrowUpRight size={16} /></a></Reveal>
        </div>
      </div>
      <div className="wallpaper-panel salon-bg">
        <div className="container-wide wallpaper-copy right">
          <Reveal><span className="kicker">Frisør & salong</span><h2>Et premium førsteinntrykk før kunden kommer inn døra.</h2><p>Tjenester, priser, galleri og booking presentert på en ryddig og eksklusiv måte.</p><a className="button glass-button" href="#kontakt" data-testid="link-salon-demo">Se salong-demo <ArrowUpRight size={16} /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const features = ['Profesjonelt og moderne design', 'Tilpasset mobil, nettbrett og PC', 'Publisering og teknisk oppsett', 'Kontakt, åpningstider og kart', 'Små endringer og vedlikehold', 'Hjelp dersom noe slutter å fungere'];
  return (
    <section id="pris" className="section-pad pricing">
      <div className="container-wide">
        <Reveal className="section-heading"><span className="kicker">Pris</span><h2>Enkel pris. Ingen unødvendig komplisering.</h2></Reveal>
        <div className="pricing-layout">
          <Reveal className="price-card" delay={1}>
            <span className="price-badge">MEST AKTUELT FOR SMÅ BEDRIFTER</span>
            <div className="price-head"><div><span>Nettsidepakke</span><h3>1 500 kr</h3><p>oppstart</p></div><div className="monthly"><b>399 kr</b><span>per måned</span></div></div>
            <div className="price-list">{features.map((feature) => <div key={feature}><Check size={15} style={{ display: 'inline', marginRight: '.55rem', color: 'var(--lime)', verticalAlign: 'text-bottom' }} />{feature}</div>)}</div>
            <a className="button price-button" href="#kontakt" data-testid="link-price-demo">Jeg vil ha en gratis demo <ArrowUpRight size={16} /></a>
            <small className="price-note">Ekstra funksjoner, bookingløsninger eller større nettbutikkløsninger kan prises separat.</small>
          </Reveal>
          <Reveal className="pricing-aside" delay={2}>
            <span className="kicker">Hvorfor Webly?</span><h3>Du trenger ikke kunne noe teknisk.</h3><p>Du forteller hva du vil ha. Jeg ordner designet, strukturen og oppsettet.</p>
            <div className="quote"><span className="quote-mark">“</span><p>Målet er at siden skal være enkel for kunden — ikke komplisert for eieren.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  ['01', 'Fortell om bedriften', 'Navn, tjenester, åpningstider og hva du ønsker.'],
  ['02', 'Se demoen', 'Du får se et visuelt forslag før du bestemmer deg.'],
  ['03', 'Vi tilpasser', 'Vi gjør endringer til siden passer bedriften din.'],
  ['04', 'Publisering', 'Nettsiden kobles til domenet og blir klar for kunder.'],
];

function Process() {
  return (
    <section className="process-section">
      <div className="container-wide">
        <Reveal className="section-heading"><span className="kicker">Prosessen</span><h2>Fra idé til publisert nettside.</h2></Reveal>
        <div className="process-grid">
          {processSteps.map((step, index) => <div key={step[0]} className="process-item"><b>{step[0]}</b><h3>{step[1]}</h3><p>{step[2]}</p>{index < processSteps.length - 1 && <div className="process-line" />}</div>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakt" className="cta-section">
      <div className="container-wide cta-inner">
        <Reveal className="cta-copy"><span className="kicker kicker-light">Kom i gang</span><h2>Vil du se hvordan nettsiden til bedriften din kan se ut?</h2><p>Send meg bedriftens navn. Jeg kan starte med en gratis demo.</p></Reveal>
        <Reveal delay={2}><a className="big-contact" href="mailto:kontakt@weblynorge.no" data-testid="link-contact-email"><span>kontakt@weblynorge.no</span><ArrowUpRight size={22} /></a></Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide footer-grid">
        <Logo />
        <p>Moderne nettsider for lokale og små bedrifter.</p>
        <nav className="footer-links" aria-label="Footer"><a href="#tjenester" data-testid="link-footer-services">Tjenester</a><a href="#pris" data-testid="link-footer-price">Pris</a><a href="#kontakt" data-testid="link-footer-contact">Kontakt</a></nav>
        <small>© {new Date().getFullYear()} Webly Norge</small>
      </div>
    </footer>
  );
}

function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => observerRef.current?.observe(element));
    return () => observerRef.current?.disconnect();
  }, []);
  return <div className="site-shell"><Header /><main><Hero /><Services /><Work /><VisualPanels /><Pricing /><Process /><Contact /></main><Footer /></div>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Home /></TooltipProvider></QueryClientProvider>;
}

export default App;