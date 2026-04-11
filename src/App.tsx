import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Activity,
  Shield,
  PenTool,
  Wrench,
  Zap,
  Layers,
  Waves, 
  Wind, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Phone,
  Mail,
  LucideIcon
} from "lucide-react";
import { useState, ReactNode } from "react";

declare global {
  interface Window {
    APP_CONFIG: {
      PHONE: string;
      PHONE_LINK: string;
      EMAIL: string;
    }
  }
}

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <a 
    href={href} 
    className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-tight"
  >
    {children}
  </a>
);

const StatCard = ({ value, label, index }: { value: string; label: string; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="bg-surface-container-lowest p-8 rounded-lg border border-neutral-100/50 hover:border-primary/30 transition-colors"
  >
    <div className="text-4xl font-extrabold tracking-tighter mb-2">{value}</div>
    <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">{label}</div>
  </motion.div>
);

const InfraItem = ({ icon: Icon, title, description, index }: { icon: LucideIcon; title: string; description: string; index: number }) => (
  <motion.li 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start gap-4 group"
  >
    <div className="text-orange-500 bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-xl font-bold tracking-tight group-hover:text-orange-500 transition-colors">{title}</div>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  </motion.li>
);

const FeatureCard = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
    <Icon size={32} className="text-orange-500" />
    <div className="text-xl font-bold tracking-tight">{title}</div>
  </div>
);

const TechItem = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-6 group"
  >
    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
      <Icon size={24} className="text-orange-500" />
    </div>
    <div className="text-xl font-medium leading-tight">{text}</div>
  </motion.div>
);

const photos = [
  {
    src: "/images/alu-links.webp",
    caption: "Фрезерованные линки подвески из цельного куска алюминия"
  },
  {
    src: "/images/welded-seam.webp",
    caption: "Сварные швы ручной работы, прошедшие термообработку"
  },
  {
    src: "/images/front-carbon-frame.webp",
    caption: "Карбоновый передний треугольник с индивидуальной укладкой слоев"
  },
  {
    src: "/images/painted-frame.webp",
    caption: "Кастомная покраска в любой цвет по каталогу RAL"
  },
  {
    src: "/images/bike-test-on-trails.webp",
    caption: "Готовый байк на нашей раме, покоряющий трейлы"
  }
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleDragEnd = (_: unknown, { offset }: { offset: { x: number } }) => {
    if (offset.x < -50) {
      next();
    } else if (offset.x > 50) {
      prev();
    }
  };

  return (
    <div className="flex flex-col gap-4 md:block">
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[700px] rounded-3xl overflow-hidden bg-surface-container shadow-xl md:shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <img 
              src={photos[currentIndex].src} 
              alt={`Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block absolute bottom-12 left-12 right-12 text-white"
            >
              <p className="text-2xl font-medium tracking-tight max-w-2xl leading-relaxed">
                {photos[currentIndex].caption}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold tracking-widest uppercase opacity-50">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Buttons */}
        <div className="md:hidden absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <button onClick={prev} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-90">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-90">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex absolute bottom-12 right-12 gap-4 z-10">
          <button onClick={prev} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Description */}
      <div className="md:hidden px-2 mt-2">
        <p className="text-lg font-medium tracking-tight text-neutral-900 leading-relaxed">
          {photos[currentIndex].caption}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative text-left shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors text-black">
              <X size={20} />
            </button>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-black">Политика конфиденциальности</h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p><strong>1. Общие положения</strong><br/>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.</p>
              <p><strong>2. Основные понятия, используемые в Политике</strong><br/>Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет.</p>
              <p><strong>3. Оператор может обрабатывать следующие персональные данные Пользователя:</strong><br/>• Имя<br/>• Номер телефона<br/>Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.</p>
              <p><strong>4. Цели обработки персональных данных</strong><br/>Цель обработки персональных данных Пользователя — информирование Пользователя посредством телефонных звонков; обсуждение параметров заказа и сроков производства; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.</p>
              <p><strong>5. Использование файлов cookie</strong><br/>Веб-сайт использует файлы cookie для улучшения пользовательского опыта, сбора анонимной статистики и оптимизации работы сайта. Оставаясь на сайте, вы соглашаетесь с использованием файлов cookie. Вы всегда можете отключить их сохранение в настройках вашего браузера.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PlanModal = ({ src, onClose }: { src: string | null; onClose: () => void }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClose = () => {
    setIsZoomed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {src && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
          <button onClick={handleClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] p-2 bg-neutral-800/50 hover:bg-neutral-800 backdrop-blur-md rounded-full transition-colors text-white">
            <X size={24} />
          </button>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-auto shadow-2xl relative"
          >
            <div className={`p-4 md:p-8 w-full min-h-[50vh] flex ${isZoomed ? 'items-start justify-start' : 'items-center justify-center'}`}>
              <img 
                src={src} 
                alt="Blueprint Preview" 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`h-auto object-contain transition-all duration-300 ${isZoomed ? 'w-[250%] md:w-[150%] max-w-none cursor-zoom-out' : 'w-full max-w-full cursor-zoom-in'}`} 
              />
            </div>
          </motion.div>
          <AnimatePresence>
            {!isZoomed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-white/90 text-black text-sm px-5 py-2.5 rounded-full pointer-events-none backdrop-blur-md shadow-lg font-medium whitespace-nowrap"
              >
                Нажмите на чертеж для увеличения
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Математика и Кинематика подвески ---
const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
const getAngle = (p1: { x: number; y: number }, p2: { x: number; y: number }) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

const initPts = {
  bb: { x: 0, y: 0 },       // Bottom Bracket (Каретка — базовая нулевая точка)
  mp: { x: 10, y: 60 },     // Main Pivot (Главный шарнир свингарма, крепится к раме)
  ra: { x: -435, y: 20 },   // Rear Axle (Ось заднего колеса)
  rfp: { x: -20, y: 240 },  // Rocker Frame Pivot (Главный шарнир рокера, крепится к раме)
  rsp: { x: -80, y: 260 },  // Rocker Seatstay Pivot (Соединение верхнего пера/толкателя и рокера)
  rshp: { x: 60, y: 240 },  // Rocker Shock Pivot (Верхнее ушко амортизатора на рокере)
  cs_sbm: { x: 60, y: 40 }  // Chainstay Shock Bottom Mount (Нижнее ушко амортизатора, крепится к нижнему перу)
};

const sw_ra_l = distance(initPts.mp, initPts.ra);
const sw_ra_a = getAngle(initPts.mp, initPts.ra);
const sw_sbm_l = distance(initPts.mp, initPts.cs_sbm);
const sw_sbm_a = getAngle(initPts.mp, initPts.cs_sbm);

const ss_l = distance(initPts.ra, initPts.rsp);

const rk_rsp_l = distance(initPts.rfp, initPts.rsp);
const rk_rsp_a = getAngle(initPts.rfp, initPts.rsp);
const rk_rshp_l = distance(initPts.rfp, initPts.rshp);
const rk_rshp_a = getAngle(initPts.rfp, initPts.rshp);

function intersectCircles(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.hypot(dx, dy);
  if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return null;

  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const cx = x1 + (a * dx) / d;
  const cy = y1 + (a * dy) / d;

  return [
    { x: cx + (h * dy) / d, y: cy - (h * dx) / d },
    { x: cx - (h * dy) / d, y: cy + (h * dx) / d }
  ];
}

function computeKinematics(compressionPct: number) {
  const maxRot = 20; // Максимальный угол вращения свингарма при полном ходе (около 160мм)
  const rotRad = -(compressionPct / 100) * maxRot * (Math.PI / 180);

  const n_ra_a = sw_ra_a + rotRad;
  const n_sbm_a = sw_sbm_a + rotRad;

  const ra = {
    x: initPts.mp.x + sw_ra_l * Math.cos(n_ra_a),
    y: initPts.mp.y + sw_ra_l * Math.sin(n_ra_a)
  };

  const cs_sbm = {
    x: initPts.mp.x + sw_sbm_l * Math.cos(n_sbm_a),
    y: initPts.mp.y + sw_sbm_l * Math.sin(n_sbm_a)
  };

  const ints = intersectCircles(ra.x, ra.y, ss_l, initPts.rfp.x, initPts.rfp.y, rk_rsp_l);
  if (!ints) return null;

  const rsp = ints.reduce((p, c) => (distance(c, initPts.rsp) < distance(p, initPts.rsp) ? c : p));

  const n_rk_a = getAngle(initPts.rfp, rsp);
  const rk_diff = n_rk_a - rk_rsp_a;

  const n_rshp_a = rk_rshp_a + rk_diff;
  const rshp = {
    x: initPts.rfp.x + rk_rshp_l * Math.cos(n_rshp_a),
    y: initPts.rfp.y + rk_rshp_l * Math.sin(n_rshp_a)
  };

  return { ra, cs_sbm, rsp, rshp };
}

const SuspensionSimulator = () => {
  const [compression, setCompression] = useState(0);

  const pts = computeKinematics(compression) || computeKinematics(0);
  if (!pts) return null;

  // Конвертация координат под отрисовку в SVG (переворачиваем Y)
  const m = (pt: { x: number; y: number }) => ({ x: pt.x, y: 400 - pt.y });

  const bb = m(initPts.bb);
  const mp = m(initPts.mp);
  const rfp = m(initPts.rfp);

  const ra = m(pts.ra);
  const cs_sbm = m(pts.cs_sbm);
  const rsp = m(pts.rsp);
  const rshp = m(pts.rshp);

  return (
    <div className="bg-surface-container border border-neutral-100/50 rounded-3xl p-6 md:p-12 relative overflow-hidden flex flex-col gap-8 min-h-[500px] shadow-sm">
      <div className="z-10 relative pointer-events-none">
        <h3 className="text-3xl font-bold tracking-tight mb-3">Интерактивная модель</h3>
        <p className="text-on-surface-variant max-w-lg text-sm md:text-base leading-relaxed">
          Подвигайте ползунок, чтобы протестировать работу геометрии: вращение линков, траекторию оси колеса и сжатие амортизатора.
        </p>
      </div>

      <div className="w-full max-w-sm z-10 relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-neutral-100">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-xs uppercase tracking-widest text-neutral-500">Ход подвески</span>
          <span className="font-extrabold text-orange-500 text-lg">{compression}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={compression} 
          onChange={(e) => setCompression(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-medium mt-2">
          <span>0 мм</span>
          <span>MAX</span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-end md:justify-center">
        {/* Фоновая картинка (поместите ваш чертеж или фото рамы в public/images/frame-bg.webp) */}
        <img 
          src="/images/bg-forest.webp" 
          alt="Frame Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <svg viewBox="-950 -80 950 650" className="w-full h-full object-contain relative">
          {/* Очертания заднего колеса (29") */}
          <g opacity="0.4">
            <circle cx={ra.x} cy={ra.y} r={370} fill="none" stroke="#f1f1f5" strokeWidth="16" />
            <circle cx={ra.x} cy={ra.y} r={350} fill="none" stroke="#e4e4e7" strokeWidth="3" strokeDasharray="12 12" />
          </g>
          
          {/* Группа элементов рамы с тенью */}
          <g className="drop-shadow-xl">
            {/* Передний треугольник (фиксированный) */}
            <polygon points={`${bb.x},${bb.y} ${mp.x},${mp.y} ${rfp.x},${rfp.y}`} fill="none" stroke="#d4d4d8" strokeWidth="10" strokeLinejoin="round" />
            
            {/* Свингарм (Chainstay) */}
            <polygon points={`${cs_sbm.x},${cs_sbm.y} ${mp.x},${mp.y} ${ra.x},${ra.y}`} fill="none" stroke="#f97316" strokeWidth="10" strokeLinejoin="round" />
            
            {/* Толкатель (Seatstay) */}
            <line x1={ra.x} y1={ra.y} x2={rsp.x} y2={rsp.y} stroke="#52525b" strokeWidth="10" strokeLinecap="round" />
            
            {/* Рокер (Rocker) */}
            <polygon points={`${rfp.x},${rfp.y} ${rsp.x},${rsp.y} ${rshp.x},${rshp.y}`} fill="none" stroke="#f97316" strokeWidth="10" strokeLinejoin="round" />
            
            {/* Амортизатор */}
            <line x1={rshp.x} y1={rshp.y} x2={cs_sbm.x} y2={cs_sbm.y} stroke="#a1a1aa" strokeWidth="8" strokeLinecap="round" />
            <line x1={cs_sbm.x} y1={cs_sbm.y} x2={cs_sbm.x + (rshp.x - cs_sbm.x)*0.55} y2={cs_sbm.y + (rshp.y - cs_sbm.y)*0.55} stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />

            {/* Шарниры */}
            {[bb, mp, rfp, ra, rsp, rshp, cs_sbm].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="6" fill="#ffffff" stroke="#27272a" strokeWidth="4" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
  const textY = useTransform(scrollY, [0, 1000], [0, 300]);
  const textOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  const config = window.APP_CONFIG || {
    PHONE: 'телефон',
    PHONE_LINK: 'tel:#',
    EMAIL: 'электронная почта'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <PlanModal src={selectedPlan} onClose={() => setSelectedPlan(null)} />

      <header className="fixed top-0 w-full z-50 glass border-b border-neutral-100/20">
        <nav className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto">
          <div className="flex items-center gap-1">
            <img src="/logo.svg" alt="Silent Customs" className="h-10 w-auto" />
            <div className="text-xl font-bold tracking-tighter uppercase">Silent Customs</div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <NavItem href="#about">О производстве</NavItem>
            <NavItem href="#infrastructure">Технологии</NavItem>
            <NavItem href="#characteristics">Характеристики</NavItem>
            <NavItem href="#location">Мастерская</NavItem>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium mr-2">
              <a href={config.PHONE_LINK} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} /> {config.PHONE}
              </a>
              <a href={`mailto:${config.EMAIL}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> {config.EMAIL}
              </a>
            </div>
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-b p-6 flex flex-col gap-4"
          >
            <NavItem href="#about">О производстве</NavItem>
            <NavItem href="#infrastructure">Технологии</NavItem>
            <NavItem href="#characteristics">Характеристики</NavItem>
            <NavItem href="#location">Мастерская</NavItem>
            <div className="md:hidden flex flex-col gap-4 mt-2 pt-4 border-t border-neutral-100">
              <a href={config.PHONE_LINK} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Phone size={16} /> {config.PHONE}
              </a>
              <a href={`mailto:${config.EMAIL}`} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Mail size={16} /> {config.EMAIL}
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-grow">
        <section className="relative h-[870px] flex items-center justify-start px-6 md:px-12 overflow-hidden">
          <motion.div 
            className="absolute -top-[20%] left-0 w-full h-[140%] z-0"
            style={{ y: backgroundY }}
          >
            <img 
              className="w-full h-full object-cover" 
              src="/images/mountain-bike-on-white-bg.webp" 
              alt="Custom Bike Frame"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <motion.div style={{ y: textY, opacity: textOpacity }}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <span className="inline-block bg-orange-500 text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-6">
                  Индивидуальный заказ
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] mb-6">
                Кастомные двухподвесные рамы под ваш стиль
                </h1>
                <p className="text-xl text-white/90 font-medium mb-4 max-w-xl leading-relaxed">
                  Проектирование геометрии, кинематики, ЧПУ фрезеровка и сварка.
                </p>
                <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-10">
                  от 150 000 ₽
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-surface" id="about">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value="140-180 мм" label="Ход подвески" index={0} />
            <StatCard value="29&quot; / 27.5&quot;" label="Размер колес" index={1} />
            <StatCard value="Alu / Carbon" label="Материалы" index={2} />
            <StatCard value="Lifetime" label="Гарантия на раму" index={3} />
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-white" id="infrastructure">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold tracking-tighter mb-12"
              >
                Технологии и Подвеска
              </motion.h2>
              <ul className="space-y-8">
                <InfraItem 
                  icon={Activity} 
                  title="Кинематика подвески" 
                  description="Настраиваемая анти-скват и прогрессия под ваш вес и стиль" 
                  index={0}
                />
                <InfraItem 
                  icon={Layers} 
                  title="Топовые материалы" 
                  description="Авиационный алюминий 7075-T6 и высокомодульный карбон" 
                  index={1}
                />
                <InfraItem 
                  icon={PenTool} 
                  title="Индивидуальная геометрия" 
                  description="Угол рулевой, рич, чейнстей — всё по вашим предпочтениям" 
                  index={2}
                />
                <InfraItem 
                  icon={Wrench} 
                  title="ЧПУ фрезеровка" 
                  description="Сложные линки и узлы создаются на высокоточных станках" 
                  index={3}
                />
              </ul>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-[400px] bg-surface-container rounded-2xl overflow-hidden relative"
            >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="/images/infrastructure.webp"
              className="w-full h-full object-cover"
            >
              <source src="/video/suspention-animation.webm" type="video/webm" />
              <img 
                className="w-full h-full object-cover" 
                src="/images/infrastructure.webp" 
                alt="Bike Frame Rendering"
              />
            </video>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-white" id="gallery">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Галерея работ</h2>
              <p className="text-on-surface-variant text-lg">Оцените качество сварных швов, фрезеровки и сборки</p>
            </motion.div>
            
            <GallerySlider />
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-12">Детали и Опции</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard icon={Wind} title="Внутренняя проводка" />
              <FeatureCard icon={Settings} title="UDH Петух" />
              <FeatureCard icon={Zap} title="Крепления ISCG05" />
              <FeatureCard icon={Shield} title="Защита рамы" />
            </div>
            
            <div className="mt-24">
              <SuspensionSimulator />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-primary text-white" id="characteristics">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-16">Особенности конструкции</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              <TechItem icon={Layers} text="Оптимизированная торсионная жесткость" />
              <TechItem icon={Activity} text="Промышленные подшипники MAX-типа" />
              <TechItem icon={Waves} text="Грязевые зазоры до 2.6 дюймов" />
              <TechItem icon={Wrench} text="Резьбовая каретка BSA и Boost 148" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <h2 className="text-4xl font-bold tracking-tighter">Чертежи и Кинематика</h2>
              <div className="text-on-surface-variant max-w-md text-right">
                Перед производством вы получаете полный 3D-проект и расчет работы подвески.
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div 
                  className="bg-surface-container rounded-2xl p-8 h-[500px] flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  onClick={() => setSelectedPlan('/images/plan-1.webp')}
                >
                  <img 
                    className="max-h-full w-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    src="/images/plan-1.webp" 
                    alt="Geometry Blueprint"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-5 py-2.5 rounded-full font-medium transition-opacity text-sm backdrop-blur-sm shadow-sm">
                      Увеличить чертеж
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Геометрия</h3>
                  <p className="text-on-surface-variant">Чертежи с указанием всех углов и длин труб</p>
                </div>
              </div>
              <div className="space-y-6">
                <div 
                  className="bg-surface-container rounded-2xl p-8 h-[500px] flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  onClick={() => setSelectedPlan('/images/plan-2.webp')}
                >
                  <img 
                    className="max-h-full w-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    src="/images/plan-2.webp" 
                    alt="Kinematics Blueprint"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-5 py-2.5 rounded-full font-medium transition-opacity text-sm backdrop-blur-sm shadow-sm">
                      Увеличить чертеж
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Кинематика</h3>
                  <p className="text-on-surface-variant">Графики Leverage Ratio, Anti-Squat и Anti-Rise</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-surface" id="location">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl overflow-hidden h-[500px] relative bg-neutral-200 group">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.616997,55.674987&z=16&pt=37.616997,55.674987,pm2rdm" 
                allowFullScreen={true}
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-xs">
                <h4 className="font-bold text-lg mb-1">Наше производство</h4>
                <p className="text-on-surface-variant leading-relaxed select-all cursor-text" title="Кликните, чтобы выделить">Москва, Электролитный проезд, 3 стр 2.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Silent Customs" className="h-10 w-auto" />
              <div className="text-2xl font-bold tracking-tighter uppercase">Silent Customs</div>
            </div>
            <p className="text-neutral-400 max-w-xs leading-relaxed">
              Кастомные велосипедные рамы для эндуро и даунхилла. Проектирование, сварка, ЧПУ фрезеровка и сборка под ключ.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Навигация</h4>
            <div className="flex flex-col gap-3">
              <a className="hover:text-orange-500 transition-colors" href="#about">О производстве</a>
              <a className="hover:text-orange-500 transition-colors" href="#infrastructure">Технологии</a>
              <a className="hover:text-orange-500 transition-colors" href="#characteristics">Характеристики</a>
              <a className="hover:text-orange-500 transition-colors" href="#gallery">Галерея</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Контакты</h4>
            <div className="space-y-4">
            <a href={config.PHONE_LINK} className="flex items-center gap-3 hover:text-orange-500 transition-colors">
              <Phone size={18} className="text-orange-500" /> {config.PHONE}
              </a>
            <a href={`mailto:${config.EMAIL}`} className="flex items-center gap-3 hover:text-orange-500 transition-colors">
              <Mail size={18} className="text-orange-500" /> {config.EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-500">
          <div>
            © 2024 Silent Customs. Все права защищены.
          </div>
          <div className="flex gap-8">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Политика конфиденциальности</button>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
