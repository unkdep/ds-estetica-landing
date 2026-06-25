import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Paintbrush2,
  ShieldCheck,
  Truck,
  Container,
  Sparkles,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Star,
  Clock,
  Award,
  CheckCircle2,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "5513999999999";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de solicitar um orçamento."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const LOGO_SRC = "/logoestetica.png";

const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

const SERVICES = [
  {
    icon: Sparkles,
    title: "Estética Automotiva",
    desc: "Polimento, cristalização e detalhamento completo para caminhões. Acabamento impecável que valoriza sua frota.",
    accent: "#1F5E8C",
  },
  {
    icon: Wrench,
    title: "Funilaria",
    desc: "Correção de amassados, reparos estruturais e restauração de carrocerias com precisão técnica e cuidado.",
    accent: "#1F5E8C",
  },
  {
    icon: Paintbrush2,
    title: "Pintura",
    desc: "Pintura automotiva em cabine pressurizada. Cor original, acabamento espelhado e durabilidade garantida.",
    accent: "#F4B400",
  },
  {
    icon: Truck,
    title: "Mecânica",
    desc: "Diagnóstico eletrônico avançado, manutenção preventiva e corretiva para sua frota operar com segurança.",
    accent: "#1F5E8C",
  },
  {
    icon: Container,
    title: "Porta Container",
    desc: "Fabricação, reparo e instalação de porta containers com alto padrão de resistência e acabamento.",
    accent: "#1F5E8C",
  },
  {
    icon: ShieldCheck,
    title: "Seguradoras",
    desc: "Parceria com as principais seguradoras do mercado. Orçamento rápido, laudo técnico e atendimento especializado.",
    accent: "#F4B400",
  },
];

const STATS = [
  { value: "15+", label: "Anos de Experiência" },
  { value: "2.000+", label: "Veículos Atendidos" },
  { value: "100%", label: "Satisfação Garantida" },
  { value: "30+", label: "Seguradoras Parceiras" },
];

const DIFFERENTIALS = [
  {
    icon: Award,
    title: "Padrão Premium",
    desc: "Utilizamos materiais de primeira linha e processos de alto nível, entregando resultado com acabamento de showroom.",
  },
  {
    icon: CheckCircle2,
    title: "Equipe Especializada",
    desc: "Profissionais treinados e certificados, com expertise específica em caminhões pesados e semipesados.",
  },
  {
    icon: ShieldCheck,
    title: "Aprovado por Seguradoras",
    desc: "Credenciados pelas principais seguradoras. Emitimos laudo técnico e garantimos todo o processo com agilidade.",
  },
  {
    icon: Clock,
    title: "Prazo Cumprido",
    desc: "Comprometimento real com prazos. Transparência em cada etapa e comunicação direta com o cliente.",
  },
  {
    icon: Star,
    title: "Experiência Comprovada",
    desc: "Mais de 15 anos atuando no mercado de São Vicente e região, com histórico sólido de clientes satisfeitos.",
  },
  {
    icon: Truck,
    title: "Especialistas em Caminhões",
    desc: "Foco exclusivo em veículos de carga. Conhecemos cada detalhe das principais marcas do mercado.",
  },
];

// ─── GALLERY PLACEHOLDER COLORS (substituir por imagens reais) ───────────────

const GALLERY_ITEMS = [
  { id: 1, label: "Funilaria & Pintura", span: "tall" },
  { id: 2, label: "Estética Premium", span: "wide" },
  { id: 3, label: "Mecânica Pesada", span: "normal" },
  { id: 4, label: "Porta Container", span: "normal" },
  { id: 5, label: "Pintura Cabine", span: "wide" },
  { id: 6, label: "Polimento Total", span: "normal" },
  { id: 7, label: "Atendimento Seguradora", span: "tall" },
  { id: 8, label: "Restauração Completa", span: "normal" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ─── ANIMATED SECTION ────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  const offsets = { up: [30, 0], left: [-30, 0], right: [30, 0], none: [0, 0] };
  const [y, x] = direction === "left" || direction === "right"
    ? [0, offsets[direction][0]]
    : [offsets[direction][0], 0];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>
            <img className="navbar__logo-img" src={LOGO_SRC} alt="DS Estética e Funilaria" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-primary">DS Estética</span>
              <span className="navbar__logo-secondary">& Funilaria</span>
            </div>
          </a>

          <ul className="navbar__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button className="navbar__link" onClick={() => scrollTo(item.href)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm navbar__cta">
            <FaWhatsapp />
            Orçamento
          </a>

          <button className="navbar__hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <button className="drawer__close" onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
              <div className="drawer__logo">
                <img className="navbar__logo-img" src={LOGO_SRC} alt="DS Estética e Funilaria" />
                <div className="navbar__logo-text">
                  <span className="navbar__logo-primary">DS Estética</span>
                  <span className="navbar__logo-secondary">& Funilaria</span>
                </div>
              </div>
              <ul className="drawer__links">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button className="drawer__link" onClick={() => scrollTo(item.href)}>
                      {item.label}
                      <ArrowRight size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn--primary drawer__cta">
                <FaWhatsapp />
                Solicitar Orçamento
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero">
      {/* Background grid */}
      <div className="hero__grid" />
      {/* Glow */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <motion.div className="hero__content" style={{ y, opacity }}>
        <div className="hero__left">
          <motion.div
            className="hero__eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero__eyebrow-dot" />
            São Vicente — SP
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Excelência em{" "}
            <span className="hero__title-highlight">Funilaria</span>{" "}
            e Estética para Caminhões
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            Padrão premium em pintura, mecânica, estética e porta container.
            Atendemos frotas, transportadoras e seguradoras em São Vicente e região.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              <FaWhatsapp size={20} />
              Solicitar Orçamento
            </a>
            <button className="btn btn--ghost btn--lg" onClick={() => scrollTo("#servicos")}>
              Nossos Serviços
              <ChevronDown size={18} />
            </button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero__right">
          {/* Truck visual placeholder — substituir por <img src="./assets/images/truck-hero.png" /> */}
          <motion.div
            className="hero__truck-wrap"
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Replace this div with your actual truck image */}
            <div className="hero__truck-placeholder">
              <img
                src="/dsesteticainicio.png"
                alt="DS Estética"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Floating cards */}
            <motion.div
              className="hero__float-card hero__float-card--tl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <CheckCircle2 size={16} className="float-card__icon" />
              <div>
                <p className="float-card__title">Aprovado</p>
                <p className="float-card__sub">30+ Seguradoras</p>
              </div>
            </motion.div>

            <motion.div
              className="hero__float-card hero__float-card--br"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <Star size={16} className="float-card__icon float-card__icon--gold" />
              <div>
                <p className="float-card__title">15+ Anos</p>
                <p className="float-card__sub">no mercado</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollTo("#servicos")}
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="servicos" className="section services">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-eyebrow">O que fazemos</span>
            <h2 className="section-title">
              Soluções completas para{" "}
              <span className="text-highlight">sua frota</span>
            </h2>
            <p className="section-desc">
              Atendimento especializado em caminhões pesados e semipesados com
              padrão de acabamento premium e equipe certificada.
            </p>
          </div>
        </FadeIn>

        <div className="services__grid">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <FadeIn key={svc.title} delay={i * 0.08} direction={i % 2 === 0 ? "up" : "up"}>
                <div className="service-card">
                  <div className="service-card__icon-wrap" style={{ "--accent": svc.accent } as React.CSSProperties}>
                    <Icon size={26} />
                  </div>
                  <h3 className="service-card__title">{svc.title}</h3>
                  <p className="service-card__desc">{svc.desc}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="service-card__cta">
                    Saiba mais <ArrowRight size={14} />
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  const [, setActive] = useState<number | null>(null);

  return (
    <section id="galeria" className="section gallery">
      <div className="gallery__bg-glow" />
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-eyebrow">Portfólio</span>
            <h2 className="section-title">
              Nossos <span className="text-highlight">trabalhos</span>
            </h2>
            <p className="section-desc">
              Cada projeto entregue com precisão técnica e acabamento que
              fala por si mesmo.
            </p>
          </div>
        </FadeIn>

        <div className="gallery__grid">
          {GALLERY_ITEMS.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.06}>
              <div
                className={`gallery__item gallery__item--${item.span}`}
                onClick={() => setActive(item.id)}
              >
                {/*
                  Substituir o conteúdo abaixo por:
                  <img src={`./assets/images/gallery-${item.id}.jpg`} alt={item.label} />
                */}
                <div className="gallery__placeholder">
                  <Truck size={40} strokeWidth={0.8} />
                </div>
                <div className="gallery__overlay">
                  <span className="gallery__label">{item.label}</span>
                  <ArrowRight size={18} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="gallery__cta">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              <FaWhatsapp size={18} />
              Ver mais no WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── DIFFERENTIALS ───────────────────────────────────────────────────────────

function Differentials() {
  return (
    <section id="diferenciais" className="section differentials">
      <div className="container">
        <div className="differentials__inner">
          <div className="differentials__left">
            <FadeIn direction="left">
              <span className="section-eyebrow">Por que escolher a DS</span>
              <h2 className="section-title">
                Referência em{" "}
                <span className="text-highlight">qualidade</span>{" "}
                no litoral paulista
              </h2>
              <p className="section-desc" style={{ textAlign: "left" }}>
                Mais de 15 anos atendendo frotas, transportadoras e seguradoras
                com responsabilidade, técnica e acabamento que nenhuma oficina
                comum entrega.
              </p>

              <div className="differentials__stats">
                {STATS.map((s) => (
                  <div key={s.label} className="diff-stat">
                    <span className="diff-stat__value">{s.value}</span>
                    <span className="diff-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="differentials__right">
            {DIFFERENTIALS.map((d, i) => {
              const Icon = d.icon;
              return (
                <FadeIn key={d.title} delay={i * 0.07} direction="right">
                  <div className="diff-card">
                    <div className="diff-card__icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="diff-card__title">{d.title}</h4>
                      <p className="diff-card__desc">{d.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ──────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner__glow" />
      <div className="container">
        <FadeIn>
          <div className="cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">
                Sua frota merece o melhor acabamento
              </h2>
              <p className="cta-banner__sub">
                Fale com nossa equipe agora e receba um orçamento sem compromisso.
              </p>
            </div>
            <div className="cta-banner__actions">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
                <FaWhatsapp size={20} />
                Falar no WhatsApp
              </a>
              <a href="tel:+551399999999" className="btn btn--ghost btn--lg">
                <Phone size={18} />
                Ligar agora
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contato" className="section contact">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <span className="section-eyebrow">Fale conosco</span>
            <h2 className="section-title">
              Entre em <span className="text-highlight">contato</span>
            </h2>
          </div>
        </FadeIn>

        <div className="contact__grid">
          <div className="contact__info">
            <FadeIn delay={0.1} direction="left">
              <div className="contact-item">
                <div className="contact-item__icon">
                  <FaWhatsapp size={22} />
                </div>
                <div>
                  <p className="contact-item__label">WhatsApp</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="contact-item__value">
                    (13) 9 9999-9999
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              <div className="contact-item">
                <div className="contact-item__icon">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="contact-item__label">Telefone</p>
                  <a href="tel:+551399999999" className="contact-item__value">
                    (13) 9 9999-9999
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="contact-item">
                <div className="contact-item__icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="contact-item__label">Endereço</p>
                  <p className="contact-item__value">
                    São Vicente — SP
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25} direction="left">
              <div className="contact-item">
                <div className="contact-item__icon">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="contact-item__label">Horário</p>
                  <p className="contact-item__value">
                    Seg – Sex: 08h às 18h<br />
                    Sáb: 08h às 13h
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} direction="right" className="contact__map-wrap">
            {/* Substituir por Google Maps embed real */}
            <div className="contact__map-placeholder">
              <MapPin size={36} />
              <p>Mapa — São Vicente, SP</p>
              <a
                href="https://maps.google.com/?q=São+Vicente+SP"
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost btn--sm"
                style={{ marginTop: "1rem" }}
              >
                Ver no Google Maps
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer__top-glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <img className="navbar__logo-img" src={LOGO_SRC} alt="DS Estética e Funilaria" />
              <div className="navbar__logo-text">
                <span className="navbar__logo-primary">DS Estética</span>
                <span className="navbar__logo-secondary">& Funilaria</span>
              </div>
            </div>
            <p className="footer__tagline">
              Referência em funilaria, pintura e estética automotiva para
              caminhões em São Vicente — SP.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram" className="social-link">
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="social-link">
                <FaFacebook size={18} />
              </a>
              <a href={WHATSAPP_LINK} aria-label="WhatsApp" target="_blank" rel="noreferrer" className="social-link social-link--wa">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Navegação</h5>
            <ul className="footer__nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button className="footer__nav-link" onClick={() => scrollTo(item.href)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Serviços</h5>
            <ul className="footer__nav">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <span className="footer__nav-link footer__nav-link--static">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Contato</h5>
            <ul className="footer__nav">
              <li className="footer__contact-item">
                <Phone size={14} />
                <span>(13) 9 9999-9999</span>
              </li>
              <li className="footer__contact-item">
                <FaWhatsapp size={14} />
                <span>(13) 9 9999-9999</span>
              </li>
              <li className="footer__contact-item">
                <MapPin size={14} />
                <span>São Vicente — SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} DS Estética e Funilaria. Todos os direitos reservados.</p>
          <p>Desenvolvido com excelência.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP FLOAT ──────────────────────────────────────────────────────────

function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="wa-float"
          aria-label="Falar no WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp size={28} />
          <span className="wa-float__pulse" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}


// ─── RESPONSIVE OVERRIDES ───────────────────────────────────────────────────

function GlobalResponsiveStyles() {
  return (
    <style>{`
      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }

      body {
        overflow-x: hidden;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      img, svg, video, canvas {
        max-width: 100%;
      }

      .container,
      .navbar__inner,
      .hero__content {
        width: min(100% - 2rem, 1180px);
        margin-inline: auto;
      }

      .navbar__logo {
        min-width: 0;
      }

      .navbar__inner {
        min-height: 96px;
      }

      .navbar__logo-img {
        width: 90px;
        height: 90px;
        object-fit: contain;
        display: block;
        flex: 0 0 auto;
        border-radius: 12px;
      }

      .drawer__logo .navbar__logo-img,
      .footer__logo .navbar__logo-img {
        width: 90px;
        height: 90px;
      }

      .hero {
        min-height: 100svh;
        padding-top: 96px;
      }

      .hero__content {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
        gap: clamp(2rem, 5vw, 5rem);
        align-items: center;
      }

      .hero__title {
        font-size: clamp(2.25rem, 6vw, 5rem);
        line-height: 0.98;
        word-break: normal;
      }

      .hero__subtitle {
        max-width: 680px;
      }

      .hero__actions,
      .cta-banner__actions {
        flex-wrap: wrap;
      }

      .services__grid,
      .gallery__grid,
      .contact__grid,
      .differentials__inner,
      .footer__grid {
        min-width: 0;
      }

      .drawer {
        width: min(86vw, 380px);
      }

      @media (max-width: 1024px) {
        .navbar__links,
        .navbar__cta {
          display: none !important;
        }

        .navbar__hamburger {
          display: inline-flex !important;
        }

        .hero__content {
          grid-template-columns: 1fr;
          text-align: center;
          padding-block: 3rem 4rem;
        }

        .hero__left,
        .hero__right {
          min-width: 0;
        }

        .hero__eyebrow,
        .hero__actions,
        .hero__stats {
          justify-content: center;
        }

        .hero__right {
          width: min(100%, 620px);
          margin-inline: auto;
        }

        .hero__truck-wrap {
          width: 100%;
        }

        .differentials__inner,
        .contact__grid,
        .cta-banner__inner,
        .footer__grid {
          grid-template-columns: 1fr !important;
        }

        .differentials__left .section-desc,
        .section-desc[style] {
          text-align: center !important;
        }
      }

      @media (max-width: 768px) {
        .container,
        .navbar__inner,
        .hero__content {
          width: min(100% - 1.25rem, 1180px);
        }

        .navbar {
          padding-inline: 0;
        }

        .navbar__inner {
          min-height: 90px;
        }

        .navbar__logo-img {
          width: 72px;
          height: 72px;
          border-radius: 10px;
        }

        .navbar__logo-primary,
        .navbar__logo-secondary {
          white-space: nowrap;
        }

        .navbar__logo-primary {
          font-size: 0.95rem;
        }

        .navbar__logo-secondary {
          font-size: 0.72rem;
        }

        .hero {
          padding-top: 82px;
        }

        .hero__content {
          padding-block: 2rem 3rem;
          gap: 2rem;
        }

        .hero__title {
          font-size: clamp(2rem, 12vw, 3.2rem);
          line-height: 1.02;
        }

        .hero__subtitle,
        .section-desc,
        .service-card__desc,
        .diff-card__desc,
        .cta-banner__sub,
        .footer__tagline {
          font-size: 0.95rem;
        }

        .hero__actions,
        .cta-banner__actions {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }

        .btn--lg,
        .hero__actions .btn,
        .cta-banner__actions .btn,
        .drawer__cta {
          width: 100%;
          justify-content: center;
        }

        .hero__stats,
        .differentials__stats {
          grid-template-columns: 1fr;
          gap: 0.75rem;
          width: 100%;
        }

        .hero__truck-placeholder {
          min-height: 260px;
        }

        .hero__float-card {
          transform: scale(0.88);
        }

        .hero__float-card--tl {
          left: 0.5rem;
          top: 0.75rem;
        }

        .hero__float-card--br {
          right: 0.5rem;
          bottom: 0.75rem;
        }

        .section {
          padding-block: 4rem;
        }

        .section-title,
        .cta-banner__title {
          font-size: clamp(1.8rem, 9vw, 2.5rem);
          line-height: 1.08;
        }

        .services__grid {
          grid-template-columns: 1fr !important;
        }

        .gallery__grid {
          display: grid;
          grid-template-columns: 1fr !important;
          grid-auto-rows: 240px;
        }

        .gallery__item--tall,
        .gallery__item--wide,
        .gallery__item--normal {
          grid-column: auto !important;
          grid-row: auto !important;
          min-height: 240px;
        }

        .diff-card,
        .contact-item,
        .service-card,
        .cta-banner__inner {
          padding: 1.25rem;
        }

        .contact__map-placeholder {
          min-height: 280px;
        }

        .footer__grid {
          gap: 2rem;
        }

        .footer__bottom {
          flex-direction: column;
          gap: 0.65rem;
          text-align: center;
        }

        .wa-float {
          right: 1rem;
          bottom: 1rem;
        }
      }

      @media (max-width: 420px) {
        .navbar__logo-text {
          max-width: 185px;
        }

        .hero__title {
          font-size: clamp(1.85rem, 12vw, 2.65rem);
        }

        .drawer {
          width: 92vw;
        }

        .hero__truck-placeholder {
          min-height: 220px;
        }
      }
    `}</style>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <GlobalResponsiveStyles />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Differentials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}