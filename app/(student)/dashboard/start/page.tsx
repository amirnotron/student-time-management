"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Plus,
  Target,
  CheckCircle2,
  Check,
  Hexagon,
  Calendar,
  Zap,
  RotateCcw,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SUBJECTS = [
  "ریاضی",
  "فیزیک",
  "شیمی",
  "زیست",
  "ادبیات",
  "عربی",
  "زبان انگلیسی",
  "تاریخ",
  "جغرافیا",
  "دین و زندگی",
];

const BOLER_STEPS = [
  { num: 1, label: "مرور و تکرار" },
  { num: 2, label: "استقبال از اشتباه" },
  { num: 3, label: "دیدگاه چندبعدی" },
  { num: 4, label: "پیوند مطالب" },
  { num: 5, label: "عمق به جای سرعت" },
  { num: 6, label: "مشارکت (فاینمن)" },
];

const REVIEW_CYCLES = [
  { num: 1, label: "مرور اول", desc: "هفته اول – آشنایی اولیه" },
  { num: 2, label: "مرور دوم", desc: "هفته دوم – تثبیت در حافظه" },
  { num: 3, label: "مرور سوم", desc: "هفته سوم – تسلط کامل" },
];

const DIFFICULTY = ["آسان", "متوسط", "سخت"];
const QUALITY_MAP: Record<number, string> = {
  1: "بسیار ضعیف",
  2: "ضعیف",
  3: "متوسط",
  4: "خوب",
  5: "عالی",
};
const QUALITY_COLORS: Record<number, string> = {
  1: "text-rose-500",
  2: "text-orange-500",
  3: "text-amber-500",
  4: "text-emerald-500",
  5: "text-teal-500",
};

const WIZARD_STEPS = [
  { id: 1, title: "بازه زمانی", subtitle: "پارت مطالعاتی رو تعریف کن" },
  { id: 2, title: "درس و مبحث", subtitle: "چی خوندی؟" },
  { id: 3, title: "کیفیت و سختی", subtitle: "سیستم ۲ چقدر فعال بود؟" },
  { id: 4, title: "گزارش خطا", subtitle: "فرصت‌های رشد رو ثبت کن" },
  { id: 5, title: "گام‌های بولر", subtitle: "کدوم گام‌ها رو اجرا کردی؟" },
  { id: 6, title: "بهینه‌سازی", subtitle: "راه‌حل مهندسی برای بهبود" },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PARTS = [
  {
    id: "1",
    partNumber: 1,
    subject: "زیست",
    topic: "گیاهی",
    difficulty: "متوسط",
    quality: 4,
    startTime: "08:00",
    endTime: "10:00",
    bolerSteps: [1, 4],
    reviewCycles: [1],
    errorReport: "اشتباه در تست ترکیبی",
    tests: 20,
    notes: "دام طراح رو تحلیل کردم",
    completedAt: "10:00",
    optimization: "تستِ خوبی بود",
  },
  {
    id: "2",
    partNumber: 2,
    subject: "زیست",
    topic: "گوارش",
    difficulty: "سخت",
    quality: 5,
    startTime: "10:30",
    endTime: "11:30",
    bolerSteps: [6],
    reviewCycles: [1, 2],
    errorReport: "1 نقطه گنگ در ترشحات آنزیم",
    tests: 0,
    notes: "برای مادرم توضیح دادم",
    completedAt: "11:30",
    optimization: "پیوند آنزیم با کبد ترمیم شد",
  },
  {
    id: "3",
    partNumber: 3,
    subject: "ریاضی",
    topic: "مشتق",
    difficulty: "متوسط",
    quality: 5,
    startTime: "11:45",
    endTime: "12:45",
    bolerSteps: [3, 5],
    reviewCycles: [1, 2, 3],
    errorReport: "",
    tests: 15,
    notes: "",
    completedAt: "12:45",
    optimization: "حفظ سرعت و دقت",
  },
];

const INITIAL_DAY_DATA = {
  todayRoutine: "20 دقیقه لغت زبان",
  tomorrowPreviews: ["ادبیات", "فیزیک", "زبان"],
  errorAnalysis: "اکثر خطاها ناشی از خستگی پارت‌های میانی",
  backlog: "تحلیل آزمون جامع هفته گذشته به صبح فردا منتقل شد",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getPartMinutes(part: (typeof MOCK_PARTS)[0]) {
  if (!part.startTime || !part.endTime) return 0;
  const [sh, sm] = part.startTime.split(":").map(Number);
  const [eh, em] = part.endTime.split(":").map(Number);
  return Math.max(0, eh * 60 + em - (sh * 60 + sm));
}

function getTotalMinutes(parts: typeof MOCK_PARTS) {
  return parts.reduce((sum, p) => sum + getPartMinutes(p), 0);
}

function formatMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} دقیقه`;
  if (m === 0) return `${h} ساعت`;
  return `${h}:${String(m).padStart(2, "0")} ساعت`;
}

// ─── Base UI Components ───────────────────────────────────────────────────────
const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-2xl overflow-hidden sm:max-h-400 h-full ${className}`}>
    {children}
  </div>
);

const Badge = ({
  children,
  colorClass = "bg-gray-100 text-gray-600",
}: {
  children: ReactNode;
  colorClass?: string;
}) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}
  >
    {children}
  </span>
);

function QualityStars({
  value,
  onChange,
  size = 24,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`transition-all duration-200 hover:scale-110 ${
            n <= value ? QUALITY_COLORS[value] : "text-gray-300"
          }`}
        >
          <Star
            size={size}
            fill={n <= value ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </button>
      ))}
      <span
        className={`text-sm font-bold ml-2 ${
          QUALITY_COLORS[value] || "text-gray-400"
        }`}
      >
        {QUALITY_MAP[value]}
      </span>
    </div>
  );
}

function TagSelector({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: string[] | { value: string | number; label: string }[];
  value: any;
  onChange: (v: any) => void;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const l = typeof opt === "string" ? opt : opt.label;
        const selected = multi ? (value || []).includes(v) : value === v;
        return (
          <button
            type="button"
            key={v}
            onClick={() => {
              if (multi) {
                const arr = value || [];
                onChange(
                  selected ? arr.filter((x: any) => x !== v) : [...arr, v],
                );
              } else {
                onChange(selected ? null : v);
              }
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              selected
                ? "bg-[#4F39F6] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

function ReviewTick({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
        checked
          ? "bg-[#4F39F6] text-white"
          : "bg-gray-100 text-gray-300 hover:bg-gray-200"
      }`}
    >
      <CheckCircle2 size={20} />
    </button>
  );
}

function FixedBottomReviewBar({
  yesterdayReviewed,
  toggleYesterdayReview,
  isOpen,
}: {
  yesterdayReviewed: boolean[];
  toggleYesterdayReview: (n: number) => void;
  isOpen: boolean;
}) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full z-50 transition-transform duration-500 ease-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full relative z-20 rounded-t-2xl bg-white flex items-center py-5 px-6 border-t border-black/5">
        <div className="flex items-center gap-6 overflow-x-auto w-full scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <RotateCcw size={18} className="text-gray-900" />
            <span className="font-bold text-gray-900 text-sm">
              مرور پارت های دیروز
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
              const checked = yesterdayReviewed[n - 1];
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleYesterdayReview(n)}
                  className={`w-11 h-11 rounded-md flex flex-col items-center justify-center transition-none border shrink-0 ${
                    checked
                      ? "bg-[#4F39F6] border-[#4F39F6] text-white"
                      : "bg-gray-50 border-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold opacity-70 leading-none mb-1">
                    پارت
                  </span>
                  <span className="text-sm font-black leading-none">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Register Wizard View ─────────────────────────────────────────────────────
// ─── Register Wizard View ─────────────────────────────────────────────────────
function RegisterWizard({
  form,
  setForm,
  wizardStep,
  setWizardStep,
  submitPart,
  parts, // <-- Added parts prop to receive the mock data
}: {
  form: any;
  setForm: (f: any) => void;
  wizardStep: number;
  setWizardStep: (n: number) => void;
  submitPart: () => void;
  parts: typeof MOCK_PARTS; // <-- Type definition for parts
}) {
  const stepInfo = WIZARD_STEPS[wizardStep - 1];
  const updateForm = (key: string, val: any) =>
    setForm({ ...form, [key]: val });

  const canProceed = () => {
    if (wizardStep === 1) return form.startTime && form.endTime;
    if (wizardStep === 2) return form.subject;
    if (wizardStep === 5) return (form.bolerSteps || []).length > 0;
    return true;
  };

  return (
    <div className="space-y-12">
      {/* --- WIZARD FORM --- */}
      <div>
        <div className="flex items-center justify-between mb-8 w-full">
          <h1 className="text-2xl font-black text-gray-900">ثبت پارت جدید</h1>
          <div className="flex gap-2 items-center">
            {WIZARD_STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`rounded-full transition-all duration-500 ${
                  i + 1 === wizardStep
                    ? "w-3 h-3 bg-[#4F39F6]"
                    : i + 1 < wizardStep
                    ? "w-2 h-2 bg-[#4F39F6]/40"
                    : "w-2 h-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="p-8 sm:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              {stepInfo.title}
            </h2>
            <p className="text-gray-500 text-lg">{stepInfo.subtitle}</p>
          </div>

          <div className="flex flex-col justify-center">
            {wizardStep === 1 && (
              <div className="flex flex-col sm:flex-row items-center sm:gap-6 justify-center">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-500 block text-center">
                    شروع
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => updateForm("startTime", e.target.value)}
                    className="bg-gray-100 rounded-2xl px-6 py-4 text-2xl text-center focus:bg-white focus:ring-2 focus:ring-[#4F39F6] outline-none w-40 transition-all"
                  />
                </div>
                <div className="text-gray-400 font-bold text-2xl mt-8">-</div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-500 block text-center">
                    پایان
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => updateForm("endTime", e.target.value)}
                    className="bg-gray-100 rounded-2xl px-6 py-4 text-2xl text-center focus:bg-white focus:ring-2 focus:ring-[#4F39F6] outline-none w-40 transition-all"
                  />
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="text-sm font-semibold text-gray-500 block mb-4">
                    درس
                  </label>
                  <TagSelector
                    options={SUBJECTS}
                    value={form.subject}
                    onChange={(v) => updateForm("subject", v)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 block mb-3">
                      مبحث (اختیاری)
                    </label>
                    <input
                      type="text"
                      value={form.topic}
                      onChange={(e) => updateForm("topic", e.target.value)}
                      placeholder="مثلا: سینماتیک"
                      className="w-full bg-gray-100 rounded-xl px-5 py-3.5 focus:bg-white focus:ring-2 focus:ring-[#4F39F6] outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-500 block mb-3">
                      تعداد تست
                    </label>
                    <input
                      type="number"
                      value={form.tests}
                      onChange={(e) => updateForm("tests", e.target.value)}
                      placeholder="0"
                      className="w-full bg-gray-100 rounded-xl px-5 py-3.5 focus:bg-white focus:ring-2 focus:ring-[#4F39F6] outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-10 flex flex-col items-center">
                <div className="w-full max-w-md">
                  <label className="text-sm font-semibold text-gray-500 block mb-6 text-center">
                    درجه سختی چطور بود؟
                  </label>
                  <div className="flex bg-gray-100 p-2 rounded-2xl">
                    {DIFFICULTY.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => updateForm("difficulty", d)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          form.difficulty === d
                            ? "bg-[#4F39F6] text-white"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full max-w-md text-center bg-gray-50 p-8 rounded-3xl">
                  <label className="text-sm font-semibold text-gray-500 block mb-6">
                    کیفیت مطالعه
                  </label>
                  <div className="flex justify-center">
                    <QualityStars
                      value={form.quality}
                      onChange={(v) => updateForm("quality", v)}
                      size={36}
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="w-full">
                <textarea
                  value={form.errorReport}
                  onChange={(e) => updateForm("errorReport", e.target.value)}
                  placeholder="کجا گیر کردی؟ چه اشتباهی داشتی؟ (تحلیل کن، نه فقط ثبت)..."
                  className="w-full bg-gray-100 rounded-2xl p-6 min-h-[200px] text-lg focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                />
              </div>
            )}

            {wizardStep === 5 && (
              <div className="space-y-4">
                <label className="text-sm font-semibold text-gray-500 block mb-4 text-center">
                  کدوم گام‌های بولر رو اجرا کردی؟ (چندتا می‌تونی انتخاب کنی)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BOLER_STEPS.map((step) => {
                    const selected = (form.bolerSteps || []).includes(step.num);
                    return (
                      <button
                        type="button"
                        key={step.num}
                        onClick={() => {
                          const arr = form.bolerSteps || [];
                          updateForm(
                            "bolerSteps",
                            selected
                              ? arr.filter((x: number) => x !== step.num)
                              : [...arr, step.num]
                          );
                        }}
                        className={`p-5 rounded-2xl text-right transition-all ${
                          selected
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                        }`}
                      >
                        <div
                          className={`text-sm font-black mb-1 ${
                            selected ? "text-purple-100" : "text-gray-400"
                          }`}
                        >
                          گام {step.num}
                        </div>
                        <div
                          className={`font-bold text-lg ${
                            selected ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {step.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {wizardStep === 6 && (
              <div className="space-y-6 w-full">
                <div>
                  <label className="text-sm font-semibold text-gray-500 block mb-3">
                    راه‌حل مهندسی برای پارت بعد
                  </label>
                  <textarea
                    value={form.optimization}
                    onChange={(e) => updateForm("optimization", e.target.value)}
                    placeholder="چطور میتونم دفعه بعد بهتر عمل کنم؟"
                    className="w-full bg-gray-100 rounded-2xl p-5 min-h-[120px] focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500 block mb-3">
                    یادداشت آزاد (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    placeholder="نکته خاصی هست؟"
                    className="w-full bg-gray-100 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-[#4F39F6] outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 flex justify-between items-center">
            {wizardStep > 1 ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep - 1)}
                className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-700 transition-colors"
              >
                قبلی
              </button>
            ) : (
              <div />
            )}

            {wizardStep < WIZARD_STEPS.length ? (
              <button
                type="button"
                onClick={() => setWizardStep(wizardStep + 1)}
                disabled={!canProceed()}
                className="px-8 py-3 rounded-xl font-bold text-white bg-[#4F39F6] hover:bg-[#3F2FD4] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ادامه
              </button>
            ) : (
              <button
                type="button"
                onClick={submitPart}
                disabled={!canProceed()}
                className="px-8 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 transition-all flex items-center gap-2"
              >
                ثبت پارت
              </button>
            )}
          </div>
        </Card>
      </div>

      {/* --- RECENT PARTS CARDS SECTION --- */}
{parts.length > 0 && (
  <div className="sm:pt-2">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-black text-gray-900">پارت‌های ثبت شده امروز</h3>
      <div className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm">
        {parts.length} پارت
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {parts.map((part) => (
        <div key={part.id} className="p-6 rounded-2xl bg-white transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100/50 text-indigo-600 flex items-center justify-center font-black text-lg">
                {part.partNumber}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  {part.subject}
                  {part.topic && (
                    <span className="text-sm font-normal text-gray-500 bg-gray-200/50 px-2 py-0.5 rounded-lg">
                      {part.topic}
                    </span>
                  )}
                </h4>
                <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1.5 font-medium">
                  <Clock size={14} className="text-indigo-400" />
                  <span dir="ltr">
                    {part.startTime} - {part.endTime}
                  </span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-lg text-sm font-bold ${
              part.difficulty === "سخت" ? "bg-rose-100/50 text-rose-600" : 
              part.difficulty === "متوسط" ? "bg-amber-100/50 text-amber-600" : 
              "bg-emerald-100/50 text-emerald-600"
            }`}>
              {part.difficulty}
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400">کیفیت</span>
              <div className="flex items-center gap-1.5 text-sm font-bold">
                <Star size={16} className={QUALITY_COLORS[part.quality]} fill="currentColor" />
                <span className={QUALITY_COLORS[part.quality]}>
                  {QUALITY_MAP[part.quality]}
                </span>
              </div>
            </div>

            {(part.tests > 0 || part.tests === 0) && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400">تست‌ها</span>
                <span className="text-sm font-bold text-gray-700">
                  {part.tests} عدد
                </span>
              </div>
            )}

            {part.bolerSteps && part.bolerSteps.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400">گام بولر</span>
                <span className="text-sm font-bold text-gray-700">
                  {part.bolerSteps.length} گام
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  );
}

// ─── Summary View ─────────────────────────────────────────────────────────────
function SummaryView({
  parts,
  subjectReviews,
  toggleSubjectReview,
}: {
  parts: typeof MOCK_PARTS;
  subjectReviews: Record<string, number[]>;
  toggleSubjectReview: (subject: string, cycle: number) => void;
}) {
  const subjectStats = Array.from(
    parts.reduce((map, part) => {
      const stat = map.get(part.subject) || {
        subject: part.subject,
        count: 0,
        totalMinutes: 0,
      };
      stat.count += 1;
      stat.totalMinutes += getPartMinutes(part);
      map.set(part.subject, stat);
      return map;
    }, new Map<string, { subject: string; count: number; totalMinutes: number }>()),
  ).map(([, stat]) => stat);

  const totalMin = getTotalMinutes(parts);
  const totalTests = parts.reduce((s, p) => s + (Number(p.tests) || 0), 0);
  const avgQuality =
    parts.length > 0
      ? (parts.reduce((s, p) => s + p.quality, 0) / parts.length).toFixed(1)
      : "0";

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-8">مجموع و مرور</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="p-6 text-center">
          <Clock size={24} className="text-blue-500 mx-auto mb-3" />
          <div className="text-2xl font-black text-gray-900">
            {formatMinutes(totalMin)}
          </div>
          <div className="text-sm text-gray-500 mt-1">زمان مطالعه</div>
        </Card>
        <Card className="p-6 text-center">
          <Target size={24} className="text-emerald-500 mx-auto mb-3" />
          <div className="text-2xl font-black text-gray-900">
            {parts.length}
          </div>
          <div className="text-sm text-gray-500 mt-1">تعداد پارت</div>
        </Card>
        <Card className="p-6 text-center">
          <BookOpen size={24} className="text-amber-500 mx-auto mb-3" />
          <div className="text-2xl font-black text-gray-900">
            {totalTests}
          </div>
          <div className="text-sm text-gray-500 mt-1">مجموع تست</div>
        </Card>
        <Card className="p-6 text-center">
          <Star size={24} className="text-rose-500 mx-auto mb-3" />
          <div className="text-2xl font-black text-gray-900">
            {avgQuality} / ۵
          </div>
          <div className="text-sm text-gray-500 mt-1">میانگین کیفیت</div>
        </Card>
      </div>

      {subjectStats.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            هنوز پارتی ثبت نشده
          </h3>
          <p className="text-gray-500">
            برای دیدن جدول مجموع، اول یک پارت ثبت کن.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectStats.map((row) => {
            const reviews = subjectReviews[row.subject] || [];
            return (
              <Card key={row.subject} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {row.subject}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {formatMinutes(row.totalMinutes)}
                    </p>
                  </div>
                  <Badge colorClass="bg-gray-100 text-gray-600">
                    {row.count} پارت
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">مرورها:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((cycle) => (
                      <ReviewTick
                        key={cycle}
                        checked={reviews.includes(cycle)}
                        onClick={() =>
                          toggleSubjectReview(row.subject, cycle)
                        }
                      />
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Other Actions View ───────────────────────────────────────────────────────
function ActionsView({
  dayData,
  updateDayData,
}: {
  dayData: typeof INITIAL_DAY_DATA;
  updateDayData: (key: string, val: any) => void;
}) {
  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-8">سایر اقدامات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-rose-500 text-sm font-bold mb-4">
            <AlertCircle size={18} />
            تحلیل اقدامات امروز
          </div>
          <textarea
            value={dayData.errorAnalysis}
            onChange={(e) => updateDayData("errorAnalysis", e.target.value)}
            placeholder="خطاهای امروز رو تحلیل کن..."
            className="w-full bg-gray-50 rounded-2xl p-5 min-h-[160px] text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-gray-400 resize-none"
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-amber-500 text-sm font-bold mb-4">
            <TrendingUp size={18} />
            عقب‌افتادگی
          </div>
          <textarea
            value={dayData.backlog}
            onChange={(e) => updateDayData("backlog", e.target.value)}
            placeholder="مباحث عقب‌افتاده رو بنویس..."
            className="w-full bg-gray-50 rounded-2xl p-5 min-h-[160px] text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-400 resize-none"
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-blue-500 text-sm font-bold mb-4">
            <Calendar size={18} />
            پیش‌خوانی فردا
          </div>
          <TagSelector
            options={SUBJECTS}
            value={dayData.tomorrowPreviews}
            onChange={(v) => updateDayData("tomorrowPreviews", v)}
            multi
          />
        </Card>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<
    "register" | "summary" | "actions"
  >("register");
  const [parts, setParts] = useState(MOCK_PARTS);
  const [wizardStep, setWizardStep] = useState(1);
  const [dayData, setDayData] = useState(INITIAL_DAY_DATA);
  
  // State for controlling the fixed bottom review bar
  const [isReviewBarOpen, setIsReviewBarOpen] = useState(false);

  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
    subject: "",
    topic: "",
    difficulty: "متوسط",
    quality: 3,
    errorReport: "",
    tests: "",
    bolerSteps: [] as number[],
    notes: "",
    optimization: "",
  });

  const [subjectReviews, setSubjectReviews] = useState<
    Record<string, number[]>
  >(() => {
    const map: Record<string, number[]> = {};
    MOCK_PARTS.forEach((part) => {
      (part.reviewCycles || []).forEach((cycle) => {
        if (!map[part.subject]) map[part.subject] = [];
        if (!map[part.subject].includes(cycle)) map[part.subject].push(cycle);
      });
    });
    return map;
  });

  const [yesterdayReviewed, setYesterdayReviewed] = useState<boolean[]>(
    Array(10).fill(false),
  );

  useEffect(() => {
    const handleToggleReviewBar = () => {
      setIsReviewBarOpen((prev) => !prev);
    };

    window.addEventListener(
      "toggle-review-bar",
      handleToggleReviewBar
    );

    return () => {
      window.removeEventListener(
        "toggle-review-bar",
        handleToggleReviewBar
      );
    };
  }, []);

  const updateDayData = (key: string, val: any) =>
    setDayData((prev) => ({ ...prev, [key]: val }));

  const toggleSubjectReview = (subject: string, cycle: number) => {
    setSubjectReviews((prev) => {
      const current = prev[subject] || [];
      if (current.includes(cycle)) {
        return { ...prev, [subject]: current.filter((c) => c !== cycle) };
      }
      return { ...prev, [subject]: [...current, cycle].sort() };
    });
  };

  const toggleYesterdayReview = (n: number) => {
    setYesterdayReviewed((prev) => {
      const next = [...prev];
      next[n - 1] = !next[n - 1];
      return next;
    });
  };

  const submitPart = () => {
    const newPart = {
      id: Date.now().toString(),
      ...form,
      tests: Number(form.tests) || 0,
      reviewCycles: [],
      completedAt: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setParts((prev) => [...prev, newPart]);
    setForm({
      startTime: "",
      endTime: "",
      subject: "",
      topic: "",
      difficulty: "متوسط",
      quality: 3,
      errorReport: "",
      tests: "",
      bolerSteps: [],
      notes: "",
      optimization: "",
    });
    setWizardStep(1);
    setActiveTab("summary");
  };

  const tabs = [
    { id: "register" as const, label: "ثبت پارت" },
    { id: "summary" as const, label: "مجموع و مرور" },
    { id: "actions" as const, label: "سایر اقدامات" },
  ];

  return (
    <div className="text-gray-900 h-full relative overflow-hidden" dir="rtl">
      <header className="sticky top-0 z-40 bg-white px-6 pt-6 rounded-xl">
        <div className="mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <nav className="flex items-center gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-6 text-sm font-bold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#4F39F6] text-[#4F39F6]"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content with enough bottom padding so the FAB won't cover anything at the end */}
      <main className="w-full mx-auto py-8 pb-24 h-[calc(100vh-6rem)] overflow-auto scrollbar-none">
        {activeTab === "register" && (
          <RegisterWizard
            form={form}
            setForm={setForm}
            wizardStep={wizardStep}
            setWizardStep={setWizardStep}
            submitPart={submitPart}
            parts={parts}
          />
        )}

        {activeTab === "summary" && (
          <SummaryView
            parts={parts}
            subjectReviews={subjectReviews}
            toggleSubjectReview={toggleSubjectReview}
          />
        )}

        {activeTab === "actions" && (
          <ActionsView dayData={dayData} updateDayData={updateDayData} />
        )}
      </main>

      {/* The bottom review bar, sliding up/down based on isReviewBarOpen state */}
      <FixedBottomReviewBar
        yesterdayReviewed={yesterdayReviewed}
        toggleYesterdayReview={toggleYesterdayReview}
        isOpen={isReviewBarOpen}
      />
    </div>
  );
}