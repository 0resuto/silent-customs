import React, { useState } from 'react';
import './App.css';

const KinematicsSimulator = () => {
  const [compression, setCompression] = useState(0); // 0 до 100%

  // Математика кинематики
  const pivot = { x: 150, y: 250 }; // Главный шарнир
  const wheelTravelMax = 160; // Максимальный ход в мм
  const angle = -(compression / 100) * 22; // Вращение маятника (до -22 градусов)
  
  // Позиции для расчета сжатия амортизатора (шок-маунт)
  const shockMountSwingarm = { x: 230, y: 180 };
  const shockMountFrame = { x: 130, y: 100 };

  // Вычисляем новую позицию крепления амортизатора на маятнике при вращении
  const angleRad = angle * (Math.PI / 180);
  const dx = shockMountSwingarm.x - pivot.x;
  const dy = shockMountSwingarm.y - pivot.y;
  const rotatedShockX = pivot.x + (dx * Math.cos(angleRad) - dy * Math.sin(angleRad));
  const rotatedShockY = pivot.y + (dx * Math.sin(angleRad) + dy * Math.cos(angleRad));

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h3>Интерактивная схема кинематики</h3>
        <div className="tech-stats">
          <span>Ход оси: {Math.round((compression / 100) * wheelTravelMax)} мм</span>
          <span>Сжатие аморта: {Math.round(compression * 0.55)} мм</span>
          <span>Leverage Ratio: {(2.8 - (compression / 100) * 0.4).toFixed(2)}</span>
        </div>
      </div>
      <div className="blueprint-wrapper">
        <svg viewBox="0 0 500 350" className="blueprint-svg">
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(52, 152, 219, 0.15)" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Передний треугольник рамы (схематично) */}
          <polygon points="150,250 130,100 280,100 330,220" fill="none" stroke="#2c3e50" strokeWidth="4" strokeLinejoin="round" />
          
          {/* Амортизатор */}
          <line x1={shockMountFrame.x} y1={shockMountFrame.y} x2={rotatedShockX} y2={rotatedShockY} stroke="#bdc3c7" strokeWidth="8" strokeLinecap="round" />
          <line x1={shockMountFrame.x} y1={shockMountFrame.y} x2={shockMountFrame.x + (rotatedShockX - shockMountFrame.x) * 0.6} y2={shockMountFrame.y + (rotatedShockY - shockMountFrame.y) * 0.6} stroke="#e74c3c" strokeWidth="14" strokeLinecap="round" />
          <circle cx={shockMountFrame.x} cy={shockMountFrame.y} r="5" fill="#ecf0f1" stroke="#2c3e50" strokeWidth="2" />

          {/* Маятник (Вращающаяся группа) */}
          <g transform={`rotate(${angle}, ${pivot.x}, ${pivot.y})`}>
            <path d={`M ${pivot.x} ${pivot.y} L ${shockMountSwingarm.x} ${shockMountSwingarm.y} L 430 250 Z`} fill="rgba(52, 152, 219, 0.1)" stroke="#3498db" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="430" cy="250" r="6" fill="#ecf0f1" stroke="#3498db" strokeWidth="3" />
            <circle cx={shockMountSwingarm.x} cy={shockMountSwingarm.y} r="5" fill="#ecf0f1" stroke="#2c3e50" strokeWidth="2" />
          </g>

          {/* Главный шарнир (Каретка) */}
          <circle cx={pivot.x} cy={pivot.y} r="8" fill="#ecf0f1" stroke="#e74c3c" strokeWidth="3" />
        </svg>
      </div>
      <div className="slider-controls">
        <label>Симуляция нагрузки на подвеску (Сэш / Дроп)</label>
        <input type="range" min="0" max="100" value={compression} onChange={(e) => setCompression(e.target.value)} className="tech-slider" />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="landing-container">
      {/* Шапка */}
      <header className="header">
        <div className="logo">Silent Customs</div>
        <nav>
          <a href="#manifesto">Философия</a>
          <a href="#kinematics">Кинематика</a>
          <a href="#geometry">Геометрия</a>
          <a href="#production">Производство</a>
        </nav>
        <a href="#waitlist" className="cta-button-small">Встать в очередь</a>
      </header>

      <main>
        {/* 1. Главный экран (Hero Section) */}
        <section className="hero">
          <div className="hero-content">
            <h1>Эстетика и точность</h1>
            <div className="hero-facts tech-font">
              <p>Кастомные рамы для двухподвесов.</p>
              <p>Разработано и собрано вручную.</p>
              <p className="highlight">Выпуск ограничен: 2 рамы в месяц.</p>
            </div>
            <a href="#manifesto" className="cta-button">Изучить технологию</a>
          </div>
        </section>

        {/* 2. Блок «Манифест» */}
        <section id="manifesto" className="manifesto">
          <h2>Почему мы это делаем</h2>
          <div className="manifesto-text">
            <p>
              Мы устали от компромиссов серийных рам. Наша философия проста: велосипед должен быть идеальным продолжением райдера, а не усредненным продуктом конвейера.
            </p>
            <p>
              Малый объем производства позволяет нам контролировать каждый микрон, тестировать радикальные идеи в кинематике и не оглядываться на маркетинговые ограничения масс-маркета.
            </p>
          </div>
        </section>

        {/* 3. Интерактивная лаборатория кинематики */}
        <section id="kinematics" className="engineering">
          <h2>Лаборатория кинематики</h2>
          <p className="section-subtitle">Визуализация работы подвески: прогрессия, антисквот (anti-squat) и траектория оси заднего колеса.</p>
          <KinematicsSimulator />
        </section>

        {/* 4. Геометрия: Цифры, которые имеют смысл */}
        <section id="geometry" className="geometry">
          <h2>Цифры, которые имеют смысл</h2>
          <p className="section-subtitle">За каждым градусом стоит исследование и часы тестов на трейлах.</p>
          <div className="geo-container">
            <div className="geo-explanation">
              <div className="geo-fact">
                <h3>Угол рулевой (64°)</h3>
                <p>Идеальный баланс между стабильностью на крутых каменистых спусках и отзывчивостью в узких свитчбеках.</p>
              </div>
              <div className="geo-fact">
                <h3>Длина перьев (Chainstay)</h3>
                <p>Пропорционально меняется в зависимости от размера рамы (Reach) для сохранения идеальной центровки веса райдера.</p>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="geo-table tech-font">
                <thead>
                  <tr>
                    <th>Параметр</th>
                    <th>Размер M</th>
                    <th>Размер L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Reach (мм)</td><td>460</td><td>485</td></tr>
                  <tr><td>Stack (мм)</td><td>625</td><td>635</td></tr>
                  <tr><td>Head Tube Angle</td><td>64°</td><td>64°</td></tr>
                  <tr><td>Seat Tube Angle</td><td>78°</td><td>78°</td></tr>
                  <tr><td>Chainstay (мм)</td><td>435</td><td>445</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Материалы и производство */}
        <section id="production" className="production">
          <h2>За кулисами производства</h2>
          <p className="section-subtitle">Ручная работа. Авиационный сплав. Безупречные швы.</p>
          <div className="production-grid">
            <div className="prod-card">
              <div className="prod-image"><span>[ Фото: TIG-сварка на стапеле ]</span></div>
              <h3>Сварка и стапель</h3>
              <p>Используем трубы из сплава 7005-T6. Ручная TIG-сварка в среде аргона обеспечивает максимальную прочность и эстетику чешуи шва.</p>
            </div>
            <div className="prod-card">
              <div className="prod-image"><span>[ Фото: ЧПУ станок ]</span></div>
              <h3>Фрезеровка узлов</h3>
              <p>Все линки и дропауты вытачиваются на 5-осевом ЧПУ из цельных кусков Д16Т для абсолютной соосности подшипников.</p>
            </div>
            <div className="prod-card">
              <div className="prod-image"><span>[ Фото: Сборка рамы ]</span></div>
              <h3>Торцовка и сборка</h3>
              <p>После термообработки каждый кареточный стакан и рулевая проходят микронную торцовку для идеальной посадки компонентов.</p>
            </div>
          </div>
        </section>

        {/* 6. Лист ожидания */}
        <section id="waitlist" className="waitlist">
          <h2>Лист ожидания</h2>
          <p>Мы выпускаем всего 2 рамы в месяц, чтобы гарантировать бескомпромиссное качество каждого узла.</p>
          <button className="cta-button" onClick={() => alert('Форма записи в лист ожидания')}>Записаться на предзаказ</button>
        </section>
      </main>

      {/* 7. Подвал (Инвесторы и партнеры) */}
      <footer className="footer">
        <div className="investor-block">
          <h2>Для партнеров и инвесторов</h2>
          <p>Silent Customs обладает высоким потенциалом масштабирования производства компонентов. Мы открыты к диалогу о развитии технологий R&D и серийном выпуске.</p>
          <button className="cta-button-outline" onClick={() => alert('Форма связи для партнеров')}>Обсудить сотрудничество</button>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Silent Customs. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
