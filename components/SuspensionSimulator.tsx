"use client";

import { useState } from "react";

// --- Математика и Кинематика подвески ---
const distance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
const getAngle = (p1: { x: number; y: number }, p2: { x: number; y: number }) => Math.atan2(p2.y - p1.y, p2.x - p1.x);

const initPts = {
  bb: { x: -10, y: 0 },       
  mp: { x: 0, y: 80 },     
  ra: { x: -470, y: 15 },   
  rfp: { x: -24, y: 280 },  
  rsp: { x: -85, y: 313 },  
  rshp: { x: 16, y: 316 },  
  cs_sbm: { x: 30, y: 130 }  
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
const shock_init_l = distance(initPts.rshp, initPts.cs_sbm);
const shock_body_l = shock_init_l * 0.55;

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
  const maxRot = 20;
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

  const m = (pt: { x: number; y: number }) => ({ x: pt.x, y: 400 - pt.y });

  const bb = m(initPts.bb);
  const mp = m(initPts.mp);
  const rfp = m(initPts.rfp);

  const ra = m(pts.ra);
  const cs_sbm = m(pts.cs_sbm);
  const rsp = m(pts.rsp);
  const rshp = m(pts.rshp);

  const shock_current_l = distance(rshp, cs_sbm);
  const red_ratio = shock_body_l / shock_current_l;
  const red_end = {
    x: rshp.x + (cs_sbm.x - rshp.x) * red_ratio,
    y: rshp.y + (cs_sbm.y - rshp.y) * red_ratio
  };

  return (
    <div className="bg-surface-container border border-neutral-100/50 rounded-3xl p-6 md:p-12 relative overflow-hidden flex flex-col gap-8 min-h-[500px] shadow-sm">
      {/* ... (здесь сохранена разметка компонента из page.tsx) ... */}
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/bg-forest.webp" 
          alt="Frame Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <svg viewBox="-850 0 950 450" className="w-full h-full object-contain relative">
          <g opacity="0.4">
            <circle cx={ra.x} cy={ra.y} r={370} fill="none" stroke="#f1f1f5" strokeWidth="16" />
            <circle cx={ra.x} cy={ra.y} r={350} fill="none" stroke="#e4e4e7" strokeWidth="3" strokeDasharray="12 12" />
          </g>
          <g className="drop-shadow-xl">
            <line x1={rshp.x} y1={rshp.y} x2={cs_sbm.x} y2={cs_sbm.y} stroke="#a1a1aa" strokeWidth="8" strokeLinecap="round" />
            <line x1={rshp.x} y1={rshp.y} x2={red_end.x} y2={red_end.y} stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />
            <polygon points={`${bb.x},${bb.y} ${mp.x},${mp.y} ${rfp.x},${rfp.y}`} fill="none" stroke="#d4d4d8" strokeWidth="10" strokeLinejoin="round" />
            <polygon points={`${cs_sbm.x},${cs_sbm.y} ${mp.x},${mp.y} ${ra.x},${ra.y}`} fill="none" stroke="#f97316" strokeWidth="10" strokeLinejoin="round" />
            <line x1={ra.x} y1={ra.y} x2={rsp.x} y2={rsp.y} stroke="#52525b" strokeWidth="10" strokeLinecap="round" />
            <polygon points={`${rfp.x},${rfp.y} ${rsp.x},${rsp.y} ${rshp.x},${rshp.y}`} fill="none" stroke="#f97316" strokeWidth="10" strokeLinejoin="round" />
            {[bb, mp, rfp, ra, rsp, rshp, cs_sbm].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="6" fill="#ffffff" stroke="#27272a" strokeWidth="4" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SuspensionSimulator;