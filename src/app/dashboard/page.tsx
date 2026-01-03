"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PipelineOverview from "@/components/dashboard/PipelineOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentInteractions from "@/components/dashboard/RecentInteractions";
import AddNewClient from "@/components/dashboard/AddNewClient";

export default function DashboardPage() {
    const [currentView, setCurrentView] = useState<"dashboard" | "add-client" | "interactions">("dashboard");

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <Sidebar onNavigate={(view) => setCurrentView(view as any)} currentView={currentView} />

            {/* Main Content Wrapper */}
            <div className="pl-20 flex flex-col min-h-screen transition-all duration-300">
                <TopBar />

                <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                    {currentView === "dashboard" ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {/* Dashboard Content */}
                            <div className="grid grid-cols-1 gap-8">
                                <QuickActions onNewClient={() => setCurrentView("add-client")} />
                            </div>
                        </div>
                    ) : currentView === "interactions" ? (
                        <div className="animate-in fade-in duration-500 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Interactions</h2>
                                    <p className="text-slate-500 mt-1">Recent client communications and logs</p>
                                </div>
                                <button
                                    onClick={() => setCurrentView("dashboard")}
                                    className="text-sm text-slate-500 hover:text-indigo-600 font-medium hover:underline cursor-pointer"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
                                <RecentInteractions />
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-right-4 duration-300">
                            <AddNewClient
                                onBack={() => setCurrentView("dashboard")}
                                onComplete={() => setCurrentView("dashboard")}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
