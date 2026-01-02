"use client";

import React from "react";
import { UserPlus, Send, Mail, ScanLine } from "lucide-react";

interface QuickActionsProps {
    onNewClient: () => void;
}

export default function QuickActions({ onNewClient }: QuickActionsProps) {
    const ACTIONS = [
        { label: "New Client", icon: UserPlus, onClick: onNewClient, primary: true, color: "text-white" },
        { label: "Send Form", icon: Send, onClick: () => { }, primary: false, color: "text-blue-600" },
        { label: "Send Email", icon: Mail, onClick: () => { }, primary: false, color: "text-purple-600" },
        { label: "Scan Doc", icon: ScanLine, onClick: () => { }, primary: false, color: "text-emerald-600" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {ACTIONS.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className={`
              relative group overflow-hidden flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-300 h-36 font-semibold cursor-pointer
              ${action.primary
                                ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1"
                                : "bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30 hover:text-indigo-700 hover:shadow-md hover:-translate-y-1"
                            }
            `}
                    >
                        <div className={`
              p-3 rounded-xl transition-transform duration-300 group-hover:scale-110
              ${action.primary ? "bg-white/20 backdrop-blur-sm" : "bg-slate-100 group-hover:bg-white text-slate-500 group-hover:text-indigo-600"}
            `}>
                            <action.icon className={`w-6 h-6 ${action.primary ? "text-white" : action.color}`} />
                        </div>
                        <span className="text-sm tracking-wide">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
