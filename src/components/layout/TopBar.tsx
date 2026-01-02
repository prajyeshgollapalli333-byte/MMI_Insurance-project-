"use client";

import React from "react";
import { Bell, Search, ChevronDown, UserCircle } from "lucide-react";

export default function TopBar() {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-40 transition-all w-full">
            {/* Left: User Welcome */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                    <span className="font-bold text-sm">CS</span>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-slate-800 leading-tight">Welcome back, CSR</h2>
                    <p className="text-xs text-slate-500 font-medium">Insurance CRM Dashboard</p>
                </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-2xl mx-12">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 sm:text-sm shadow-sm hover:border-slate-300/80"
                        placeholder="Search clients, policies, or IDs..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-block border border-slate-200 rounded px-1.5 text-[10px] font-medium text-slate-400 bg-white">⌘K</kbd>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-5">
                <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300 cursor-pointer group">
                    <Bell className="w-5 h-5 group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                </button>

                <div className="h-8 w-px bg-slate-200/80 mx-1" />

                <button className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-full hover:bg-slate-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-100/50">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-700">John Doe</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Senior Agent</p>
                    </div>
                    <UserCircle className="w-9 h-9 text-slate-300" />
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
            </div>
        </header>
    );
}
