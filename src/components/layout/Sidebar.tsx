"use client";

import React, { useState } from "react";
import { LayoutDashboard, Settings, Shield, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", id: "dashboard" },
    { label: "Interaction", icon: MessageCircle, href: "#", id: "interactions" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings", id: "settings" },
];

interface SidebarProps {
    onNavigate?: (view: string) => void;
    currentView?: string;
}

export default function Sidebar({ onNavigate, currentView }: SidebarProps) {
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <aside
            className={cn(
                "bg-slate-900 min-h-screen fixed left-0 top-0 text-white flex flex-col z-50 transition-all duration-300 ease-in-out",
                isHovered ? "w-64" : "w-20"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-16 flex items-center px-6 border-b border-slate-800 overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className={cn(
                        "font-semibold text-lg tracking-tight transition-all duration-300",
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 hidden"
                    )}>
                        CRM
                    </span>
                </div>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-hidden">
                <p className={cn(
                    "px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 opacity-70 whitespace-nowrap transition-all duration-300",
                    isHovered ? "opacity-70 translate-x-0" : "opacity-0 -translate-x-4 hidden"
                )}>
                    Main Menu
                </p>
                {NAV_ITEMS.map((item) => {
                    const isActive = (item.id === "dashboard" && pathname === "/dashboard" && currentView !== "interactions") ||
                        (item.id === "interactions" && currentView === "interactions") ||
                        (item.id !== "dashboard" && item.id !== "interactions" && pathname.includes(item.id || ""));

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => {
                                if (item.id === "interactions" && onNavigate) {
                                    e.preventDefault();
                                    onNavigate("interactions");
                                }
                            }}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group cursor-pointer whitespace-nowrap overflow-hidden",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-900/40 relative"
                                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                            )}
                        >
                            {isActive && <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-indigo-100" : "text-slate-500 group-hover:text-white")} />
                            <span className={cn(
                                "transition-all duration-300",
                                isHovered ? "opacity-100 ml-0" : "opacity-0 w-0 -translate-x-4"
                            )}>
                                {item.label}
                            </span>
                        </a>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800/50 bg-slate-950/20 backdrop-blur-sm overflow-hidden">
                <div className={cn(
                    "bg-slate-800/80 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group flex items-center gap-3 overflow-hidden",
                    isHovered ? "p-4" : "p-2 justify-center"
                )}>
                    <div className={cn("items-center justify-between flex-1 overflow-hidden transition-all duration-300", isHovered ? "flex" : "hidden w-0")}>
                        <div>
                            <p className="text-xs text-slate-300 font-semibold group-hover:text-white transition-colors truncate">Enterprise v2.4</p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                <p className="text-[10px] text-slate-500 truncate">Secure Connection</p>
                            </div>
                        </div>
                    </div>
                    <Shield className={cn("w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0")} />
                </div>
            </div>
        </aside>
    );
}
