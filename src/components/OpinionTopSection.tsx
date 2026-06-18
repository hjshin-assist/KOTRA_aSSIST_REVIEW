import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { TopOpinion } from "../types";

interface OpinionTopSectionProps {
  positiveOpinions: TopOpinion[];
  improvementOpinions: TopOpinion[];
}

export function OpinionTopSection({
  positiveOpinions,
  improvementOpinions,
}: OpinionTopSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"positive" | "improvement">("positive");

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
      {/* Tab Select Header */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        <button
          onClick={() => setActiveSubTab("positive")}
          className={`flex-1 py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all border-b-2 ${
            activeSubTab === "positive"
              ? "bg-indigo-50/50 text-indigo-600 border-indigo-600"
              : "text-slate-400 hover:text-slate-700 border-transparent"
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>수강 후기 주요 긍정 의견</span>
        </button>

        <button
          onClick={() => setActiveSubTab("improvement")}
          className={`flex-1 py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all border-b-2 ${
            activeSubTab === "improvement"
              ? "bg-rose-50/30 text-rose-600 border-rose-600"
              : "text-slate-400 hover:text-slate-700 border-transparent"
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          <span>수강 후기 주요 개선 의견</span>
        </button>
      </div>

      {/* Opinions Content Pane */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {activeSubTab === "positive" ? (
              positiveOpinions.length > 0 ? (
                positiveOpinions.map((op, idx) => (
                  <div
                    key={op.rank}
                    className="flex items-center py-2.5 px-4 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-indigo-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-semibold text-slate-750 leading-relaxed">
                        {op.text}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-xs text-slate-400 font-medium">부정 의견이 우월하거나 긍정 요약 데이터가 부족합니다.</p>
              )
            ) : (
              improvementOpinions.length > 0 ? (
                improvementOpinions.map((op, idx) => (
                  <div
                    key={op.rank}
                    className="flex items-center py-2.5 px-4 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-rose-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-semibold text-slate-750 leading-relaxed">
                        {op.text}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-xs text-slate-400 font-medium">수집된 특정 불만이나 개선 요구 피드백이 없습니다.</p>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
