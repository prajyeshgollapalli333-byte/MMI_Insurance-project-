"use client";

import React from "react";
import { Send, FileCheck, FileText, CheckCircle2 } from "lucide-react";

const STATS = [
    { label: "Forms Sent", value: "124", icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Opened", value: "89", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Completed", value: "62", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Docs Uploaded", value: "45", icon: FileCheck, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function PipelineOverview() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Pipeline Overview</h3>
            <div className="grid grid-cols-2 gap-4">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer flex flex-col justify-between h-36 hover:-translate-y-0.5"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-slate-800 tracking-tight group-hover:text-indigo-900 transition-colors">{stat.value}</p>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
