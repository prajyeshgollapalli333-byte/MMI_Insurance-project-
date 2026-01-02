"use client";

import React from "react";
import { RefreshCcw } from "lucide-react";

const INTERACTIONS = [
    { name: "Sarah Miller", type: "Home Insurance", status: "Form Sent", time: "2 hours ago", statusColor: "bg-blue-100 text-blue-700", avatarColor: "bg-blue-100 text-blue-600" },
    { name: "James Wilson", type: "Auto Insurance", status: "Waiting for Docs", time: "4 hours ago", statusColor: "bg-amber-100 text-amber-700", avatarColor: "bg-amber-100 text-amber-600" },
    { name: "Robert Chen", type: "Umbrella", status: "Completed", time: "6 hours ago", statusColor: "bg-emerald-100 text-emerald-700", avatarColor: "bg-emerald-100 text-emerald-600" },
    { name: "Emily Davis", type: "Condo Insurance", status: "Form Sent", time: "Yesterday", statusColor: "bg-blue-100 text-blue-700", avatarColor: "bg-purple-100 text-purple-600" },
    { name: "Michael Brown", type: "Motorcycle", status: "Cancelled", time: "Yesterday", statusColor: "bg-slate-100 text-slate-700", avatarColor: "bg-rose-100 text-rose-600" },
];

export default function RecentInteractions() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Interactions</h3>
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer">View All</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="divide-y divide-slate-100/80">
                    {INTERACTIONS.map((item, i) => (
                        <div
                            key={i}
                            className="p-4 px-6 flex items-center justify-between hover:bg-slate-50/80 transition-all duration-200 group cursor-pointer border-l-2 border-transparent hover:border-indigo-500"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full ${item.avatarColor} flex items-center justify-center font-bold text-xs group-hover:shadow-sm transition-colors`}>
                                    {item.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{item.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-xs font-medium text-slate-500">{item.type}</p>
                                        <span className="text-slate-200 text-[10px]">•</span>
                                        <p className="text-xs text-slate-400">{item.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${item.statusColor} shadow-sm`}>
                                    {item.status}
                                </span>
                                <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 cursor-pointer">
                                    <RefreshCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
