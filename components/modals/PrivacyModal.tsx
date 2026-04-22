"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

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
              <p><strong>1. Общие положения</strong><br/>Настоящая политика ....</p>
              {/* Остальной текст модалки */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;