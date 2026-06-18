import { AlertTriangle, Clock, RefreshCw, Smartphone } from "lucide-react";
import { RiskSignal } from "../types";
import { motion } from "motion/react";

interface RiskSignalPanelProps {
  signals: RiskSignal[];
}

export function RiskSignalPanel({ signals }: RiskSignalPanelProps) {
  // Map icons appropriately
  const getIcon = (txt: string) => {
    if (txt.includes("시간") || txt.includes("분량") || txt.includes("버퍼")) {
      return <Clock className="w-5 h-5 text-rose-500" />;
    }
    if (txt.includes("교재") || txt.includes("폰트") || txt.includes("자료")) {
      return <Smartphone className="w-5 h-5 text-amber-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-indigo-500" />;
  };

  const getStyle = (lvl: string) => {
    switch (lvl) {
      case "danger":
        return "border-rose-100 bg-rose-50/50 text-rose-800 shadow-[0_4px_15px_rgba(244,63,94,0.03)]";
      case "warning":
        return "border-amber-100 bg-amber-50/50 text-amber-800 shadow-[0_4px_15px_rgba(245,158,11,0.03)]";
      default:
        return "border-slate-100 bg-slate-50/50 text-slate-800 shadow-[0_4px_15px_rgba(30,41,59,0.02)]";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center space-x-1.5 font-sans">
            <span>🚨 AI 자동 감지 위험 신호 알림</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            피드백 원문 및 설문 문항 중 부정 비율이 상대적으로 높은 주의사항을 AI가 즉시 인지한 것입니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals.map((sig, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            key={idx}
            className={`border rounded-2xl p-5 transition-all duration-300 ${getStyle(sig.level)}`}
          >
            <div className="flex items-center space-x-2.5 mb-2.5">
              <div className="p-1 px-1.5 bg-white border border-slate-100/10 rounded-lg shadow-sm">
                {getIcon(sig.text)}
              </div>
              <h4 className="text-xs font-black tracking-tight">{sig.text}</h4>
            </div>
            {sig.description && (
              <p className="text-[11px] leading-relaxed font-medium opacity-90 pl-0.5 font-sans">
                {sig.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
