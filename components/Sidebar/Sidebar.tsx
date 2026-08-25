"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Flame,
  LogOut,
  Terminal,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "شروع", href: "/dashboard/start", icon: LayoutDashboard },
  { name: "پیشخوان", href: "/dashboard/analytics", icon: LayoutDashboard },
  { name: "تقویم", href: "/dashboard/calendar", icon: BookOpen },
  {
    name: "وظایف روزانه",
    href: "/dashboard/daily-routine",
    icon: GraduationCap,
    count: "جدید",
  },
  { name: "برنامه درسی", href: "/dashboard/study-plan", icon: GraduationCap },
  {
    name: "ارتباط با مشاور",
    href: "/dashboard/chat",
    icon: GraduationCap,
    count: "4",
  },
    {
    name: "توسعه دهندگان",
    href: "/dashboard/information",
    icon: Terminal,
  },
];

const streakDays = [
  { label: "ش", status: "completed" },
  { label: "ی", status: "completed" },
  { label: "د", status: "completed" },
  { label: "س", status: "active" },
  { label: "چ", status: "pending" },
  { label: "پ", status: "pending" },
  { label: "ج", status: "pending" },
];

export default function SidebarFloatingModel({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      dir="rtl"
      className={`fixed md:sticky top-0 right-0 z-[99] m-6.5 w-72 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-78.5"
      } md:translate-x-0`}
    >
      <div className="flex h-full flex-col flex-1 justify-between rounded-xl bg-white p-6.5">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#4F39F6]" />
              <span className="text-xs font-black text-zinc-800">
                پنل مطالعه
              </span>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-full hover:bg-zinc-100 text-zinc-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#4F39F6]/7 text-[#4F39F6]"
                      : "text-zinc-600 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 ${
                        isActive ? "text-[#4F39F6]" : "text-zinc-400"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.count && (
                    <span
                      className={`text-[9px] px-2.5 py-0.5 rounded-full font-black ${
                        isActive
                          ? "bg-[#4F39F6]/20 text-[#4F39F6]"
                          : item.count === "جدید"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-orange-50/60 p-4 border border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
                <span className="text-xs font-black text-orange-950">
                  ۱۲ روز استریک
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-orange-600 bg-white px-2 py-0.5 rounded-full border border-orange-200">
                عالی!
              </span>
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1">
              {streakDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center py-1.5 rounded-lg text-[9px] font-bold ${
                    day.status === "completed"
                      ? "bg-orange-500 text-white"
                      : day.status === "active"
                        ? "bg-orange-200 text-orange-800 ring-2 ring-orange-400"
                        : "bg-white text-zinc-400 border border-zinc-200/60"
                  }`}
                >
                  {day.label}
                </div>
              ))}
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-zinc-500 hover:text-rose-600 hover:bg-rose-50/50 transition-colors">
            <LogOut className="h-4 w-4" />
            <span>خروج</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
