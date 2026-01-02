"use client";

import React from "react";
import { LayoutDashboard, Users, FileText, Settings, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Clients", icon: Users, href: "/dashboard/clients" },
    { label: "Policies", icon: Shield, href: "/dashboard/policies" },
    { label: "Documents", icon: FileText, href: "/dashboard/documents" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 min-h-screen fixed left-0 top-0 text-white flex flex-col z-50">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight">CRM</span>
                </div>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-1.5">
                <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 opacity-70">
                    Main Menu
                </p>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group cursor-pointer",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-900/40 relative overflow-hidden"
                                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1"
                            )}
                        >
                            {isActive && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-indigo-100" : "text-slate-500 group-hover:text-white")} />
                            {item.label}
                        </a>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800/50 bg-slate-950/20 backdrop-blur-sm">
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-300 font-semibold group-hover:text-white transition-colors">Enterprise v2.4</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] text-slate-500">Secure Connection</p>
                            </div>
                        </div>
                        <Shield className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
