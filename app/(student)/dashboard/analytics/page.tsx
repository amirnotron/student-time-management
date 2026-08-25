"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  BookOpen,
  Target,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Check,
  Play,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import StudyChart from "@/components/StudyChart/StudyChart";

export default function StudentDashboardPage() {
  const date = new Date();
  const persianYear = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
  }).format(date);

  const timelineData = [
    {
      id: 1,
      date: "مهر ۱۴۰۲",
      title: "شروع سال تحصیلی",
      desc: "آزمون تعیین سطح و برنامه‌ریزی",
      status: "completed",
    },
    {
      id: 2,
      date: "آذر ۱۴۰۲",
      title: "آزمون جامع اول",
      desc: "کسب تراز ۶۵۰۰",
      status: "completed",
    },
    {
      id: 3,
      date: "دی ۱۴۰۲",
      title: "امتحانات ترم اول",
      desc: "معدل ۱۹.۵ در امتحانات نهایی",
      status: "completed",
    },
    {
      id: 4,
      date: "اسفند ۱۴۰۲",
      title: "اردوی مطالعاتی عید",
      desc: "جمع‌بندی دروس پایه",
      status: "active",
    },
    {
      id: 5,
      date: "خرداد ۱۴۰۳",
      title: "امتحانات نهایی",
      desc: "آمادگی برای کسب معدل ۲۰",
      status: "upcoming",
    },
    {
      id: 6,
      date: "تیر ۱۴۰۳",
      title: "کنکور سراسری",
      desc: "آزمون اصلی",
      status: "upcoming",
    },
  ];

  return (
    <div dir="rtl" className="w-full h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-zinc-900 leading-tight">
              داشبورد تحصیلی
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
              <span>گزارش روزانه مطالعه</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300" />
              <span className="text-indigo-600 font-bold">
                سال {persianYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
          iconBg="bg-indigo-50"
          title="ساعات مطالعه (هفته)"
          value="۳۲.۵"
          unit="ساعت"
          trend="+۴.۲ ساعت"
        />
        <MetricCard
          icon={<Target className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
          title="تکمیل برنامه‌ها"
          value="۸۵٪"
          trend="+۵٪"
        />
        <MetricCard
          icon={<BookOpen className="w-5 h-5 text-orange-600" />}
          iconBg="bg-orange-50"
          title="آزمون‌های پیش‌رو"
          value="۳"
          trend="نیاز به مرور"
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5 text-rose-600" />}
          iconBg="bg-rose-50"
          title="معدل تراز"
          value="۶۸۵۰"
          trend="+۱۲۰ واحد"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-5 p-7 bg-white border border-zinc-100 rounded-3xl flex flex-col">
          <StudyChart />
        </div>

        <div className="lg:col-span-4 bg-white border border-zinc-100 rounded-3xl p-7 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-zinc-900">اقدامات فوری</h2>
            <button className="text-xs text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
              مشاهده همه
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            <TaskItem
              title="تکمیل گزارش شیمی"
              subtitle="مهلت: فردا، ۰۸:۰۰"
              type="urgent"
            />
            <TaskItem
              title="جلسه با مشاور تحصیلی"
              subtitle="امروز، ۱۶:۳۰"
              type="meeting"
            />
            <TaskItem
              title="مرور لغات زبان (درس ۴)"
              subtitle="برنامه روتین شبانه"
              type="routine"
            />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border border-zinc-100 rounded-3xl p-7 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full text-right mb-6">
            <h2 className="text-lg font-bold text-zinc-900">تایمر تمرکز</h2>
            <p className="text-xs text-zinc-500 mt-1 font-medium">
              ۲۵ دقیقه مطالعه عمیق
            </p>
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center mb-8">
            <svg
              className="w-full h-full transform -rotate-90 absolute"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#f4f4f5"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="6"
                strokeDasharray="283"
                strokeDashoffset="60"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="flex flex-col items-center z-10">
              <span
                className="text-4xl font-black text-indigo-600 tracking-tight"
                dir="ltr"
              >
                25:00
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200/50 group">
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm">شروع تمرکز</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-3xl p-7 w-full">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-lg font-bold text-zinc-900">
            مسیر پیشرفت تحصیلی
          </h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar pb-8 pt-4">
          <div className="relative min-w-[900px] flex items-center justify-between px-8">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-100 z-0"></div>

            {timelineData.map((item, index) => (
              <TimelineNode
                key={item.id}
                position={index % 2 === 0 ? "top" : "bottom"}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e4e4e7;
          border-radius: 8px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d4d4d8;
        }
      `}</style>
    </div>
  );
}

type MetricCardProps = {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  value: React.ReactNode | string | number;
  unit?: string;
  trend?: string | number;
};

function MetricCard({
  icon,
  iconBg = "",
  title,
  value,
  unit,
  trend,
}: MetricCardProps) {
  return (
    <div className="bg-white border border-zinc-100 p-6 rounded-3xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg} transition-transform group-hover:scale-105`}
        >
          {icon}
        </div>
        <div className="px-2.5 py-1.5 bg-zinc-50 rounded-full border border-zinc-100 flex items-center gap-1.5">
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[11px] font-bold text-zinc-600">{trend}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-zinc-500 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black tracking-tight text-zinc-900">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-bold text-zinc-400">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskItem({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type: "urgent" | "meeting" | "routine";
}) {
  const styles = {
    urgent: { text: "text-rose-600", dot: "bg-rose-500", hoverBg: "hover:bg-rose-50" },
    meeting: { text: "text-indigo-600", dot: "bg-indigo-500", hoverBg: "hover:bg-indigo-50" },
    routine: { text: "text-zinc-600", dot: "bg-zinc-400", hoverBg: "hover:bg-zinc-50" },
  };

  return (
    <div
      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${styles[type].hoverBg}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${styles[type].dot}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
          {type === "meeting" ? (
            <Calendar size={12} />
          ) : (
            <CheckCircle2 size={12} />
          )}
          <span className="truncate">{subtitle}</span>
        </div>
      </div>
      <button
        className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg ${styles[type].text} hover:bg-white`}
      >
        <Check size={16} />
      </button>
    </div>
  );
}

function TimelineNode({ position, date, title, desc, status }: any) {
  const isTop = position === "top";

  const statusStyles = {
    completed: {
      node: "bg-emerald-500 border-white",
      line: "bg-emerald-200",
      cardBorder: "hover:border-emerald-200",
    },
    active: {
      node: "bg-indigo-600 border-white ring-4 ring-indigo-50",
      line: "bg-indigo-200",
      cardBorder: "border-indigo-100",
    },
    upcoming: {
      node: "bg-zinc-300 border-white",
      line: "bg-zinc-200",
      cardBorder: "hover:border-zinc-200",
    },
  };

  const currentStyle = statusStyles[status as keyof typeof statusStyles];

  return (
    <div className="relative z-10 flex flex-col items-center group w-40">
      {isTop && (
        <div
          className={`mb-8 bg-white border border-zinc-100 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 w-full relative z-20 ${currentStyle.cardBorder}`}
        >
          <span className="inline-block px-2 py-1 bg-zinc-50 rounded-md text-[10px] font-bold text-zinc-500 mb-2">
            {date}
          </span>
          <h4 className="text-sm font-bold text-zinc-800 leading-tight">
            {title}
          </h4>
          <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">
            {desc}
          </p>
          <div
            className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-8 ${currentStyle.line} -z-10 transition-colors`}
          ></div>
        </div>
      )}

      <div
        className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center z-20 transition-transform group-hover:scale-125 ${currentStyle.node}`}
      ></div>

      {!isTop && (
        <div
          className={`mt-8 bg-white border border-zinc-100 p-4 rounded-2xl transition-all duration-300 hover:translate-y-1 w-full relative z-20 ${currentStyle.cardBorder}`}
        >
          <div
            className={`absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 ${currentStyle.line} -z-10 transition-colors`}
          ></div>
          <span className="inline-block px-2 py-1 bg-zinc-50 rounded-md text-[10px] font-bold text-zinc-500 mb-2">
            {date}
          </span>
          <h4 className="text-sm font-bold text-zinc-800 leading-tight">
            {title}
          </h4>
          <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">
            {desc}
          </p>
        </div>
      )}
    </div>
  );
}
