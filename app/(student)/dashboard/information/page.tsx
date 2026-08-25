"use client";

import React from "react";
import { Code2, GraduationCap, Laptop, Sparkles, Terminal } from "lucide-react";

export default function InformationPage() {
  return (
    <div className="mx-auto h-full overflow-y-auto" dir="rtl">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-black text-black flex items-center gap-3">
          <Code2 className="w-8 h-8 text-indigo-500" />
          درباره سازندگان
        </h1>
        <p className="text-zinc-500 mt-2 font-bold">اطلاعات توسعه‌دهندگان و تکنولوژی‌های پروژه</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-3 text-black">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            داستان این پروژه
          </h2>
          <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-medium max-w-3xl">
            این سیستم با هدف هوشمندسازی، تحلیل عملکرد و مدیریت بهتر برنامه‌های تحصیلی دانش‌آموزان توسعه داده شده است. ما به عنوان توسعه‌دهندگان فول‌استک، تلاش کردیم تا با استفاده از جدیدترین تکنولوژی‌های وب، یک تجربه کاربری سریع، پایدار و جذاب را خلق کنیم.
          </p>
        </div>

        {/* Developers Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-5 p-6 rounded-3xl bg-white transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <Terminal className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-black text-lg">امیررضا قاسم‌پور</h3>
              <p className="text-sm font-bold text-zinc-500 mt-1">توسعه دهنده بک اند و DevOps</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 rounded-3xl bg-[#18181B] hover:bg-[#202024] transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <Laptop className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">امیرمحمد آذربهرام</h3>
              <p className="text-sm font-bold text-zinc-500 mt-1">توسعه دهنده فرانت اند و مدیر پروژه</p>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-3 px-6 py-4 bg-[#18181B] text-zinc-300 rounded-2xl text-sm font-bold">
            <GraduationCap className="w-6 h-6 text-zinc-500" />
            دانش‌آموزان پایه یازدهم شبکه و نرم‌افزار - هنرستان فناوران
          </div>
          
          <div className="flex items-center gap-3 px-6 py-4 bg-indigo-500/10 text-indigo-700 rounded-2xl text-sm font-bold">
            <Code2 className="w-6 h-6 text-indigo-400" />
            توسعه یافته با Next.js
          </div>
        </div>
        
      </div>
    </div>
  );
}