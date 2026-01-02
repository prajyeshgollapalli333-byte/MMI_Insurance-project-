"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PipelineOverview from "@/components/dashboard/PipelineOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentInteractions from "@/components/dashboard/RecentInteractions";
import AddNewClient from "@/components/dashboard/AddNewClient";

export default function DashboardPage() {
    const [currentView, setCurrentView] = useState<"dashboard" | "add-client">("dashboard");

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="pl-64 flex flex-col min-h-screen">
                <TopBar />

                <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                    {currentView === "dashboard" ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {/* Top Row: Pipeline & Actions */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <PipelineOverview />
                                <QuickActions onNewClient={() => setCurrentView("add-client")} />
                            </div>

                            {/* Bottom Row: Interactions */}
                            <div className="h-96">
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
