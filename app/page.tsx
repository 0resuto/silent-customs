"use client";

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
  Menu,
  X,
  Phone,
  Mail,
  LucideIcon
} from "lucide-react";
import { useState, ReactNode } from "react";
import GallerySlider from "../components/GallerySlider";
import SuspensionSimulator from "../components/SuspensionSimulator";
import PrivacyModal from "../components/modals/PrivacyModal";
import PlanModal from "../components/modals/PlanModal";

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
    className="bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/20 shadow-xl"
  >
    <div className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-white mb-2">{value}</div>
    <div className="text-xs lg:text-sm font-medium text-white/80 uppercase tracking-wider">{label}</div>
  </motion.div>
);

const InfraItem = ({ icon: Icon, title, description, index }: { icon: LucideIcon; title: string; description: string; index: number }) => (
  <motion.li 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start gap-4"
  >
    <div className="text-orange-500 bg-primary p-2 rounded-lg">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-xl font-bold tracking-tight">{title}</div>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  </motion.li>
);

const FeatureCard = ({ icon: Icon, title }: { icon: LucideIcon; title: string }) => (
  <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-4 shadow-sm">
    <Icon size={32} className="text-orange-500" />
    <div className="text-xl font-bold tracking-tight">{title}</div>
  </div>
);

const TechItem = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-6"
  >
    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
      <Icon size={24} className="text-orange-500" />
    </div>
    <div className="text-xl font-medium leading-tight">{text}</div>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, (y: number) => y * 0.7);
  const textY = useTransform(scrollY, (y: number) => y * 0.5);
  const cardsY = useTransform(scrollY, (y: number) => y * 0.1);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Заменяем window.APP_CONFIG на переменные окружения Next.js
  const config = {
    PHONE: process.env.NEXT_PUBLIC_PHONE || 'телефон',
    PHONE_LINK: process.env.NEXT_PUBLIC_PHONE_LINK || 'tel:#',
    EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'электронная почта'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <PlanModal src={selectedPlan} onClose={() => setSelectedPlan(null)} />

      <header className="fixed top-0 w-full z-50 glass border-b border-neutral-100/20">
        <nav className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-24 pb-24 md:pb-34" id="about">
          <motion.div 
            className="absolute inset-0 w-full h-full z-0"
            style={{ y: backgroundY }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="w-full h-full object-cover" 
              src="/images/mountain-bike-on-white-bg.webp" 
              alt="Custom Bike Frame"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
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

          <motion.div 
            className="relative z-10 max-w-7xl mx-auto w-full mt-8"
            style={{ y: cardsY }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard value="140-180 мм" label="Ход подвески" index={0} />
              <StatCard value="29&quot; / 27.5&quot;" label="Размер колес" index={1} />
              <StatCard value="Alu / Carbon" label="Материалы" index={2} />
              <StatCard value="Lifetime" label="Гарантия на раму" index={3} />
            </div>
          </motion.div>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <div className="rounded-3xl overflow-hidden h-[500px] relative bg-neutral-200">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.616997,55.674987&z=16&pt=37.616997,55.674987,pm2rdm" 
                allowFullScreen={true}
                className="w-full h-full border-0"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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