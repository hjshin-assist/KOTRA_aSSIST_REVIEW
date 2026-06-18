import { ReactNode } from "react";
import { motion } from "motion/react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subTitle?: string;
  trend?: string;
  icon: ReactNode;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  subTitle,
  trend,
  icon,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(30,41,59,0.06)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative ambient subtle circle */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-slate-50 rounded-full pointer-events-none -z-0" />
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-400 tracking-wider uppercase block">
            {title}
          </span>
          <h3 className="text-2xl font-bold font-sans text-slate-800 tracking-tight">
            {value}
          </h3>
          {subTitle && (
            <p className="text-xs text-slate-500 font-sans font-medium">
              {subTitle}
            </p>
          )}
          {trend && (
            <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              {trend}
            </span>
          )}
        </div>
        <div className="p-3 bg-slate-50 border border-slate-100/50 rounded-xl text-slate-500">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
