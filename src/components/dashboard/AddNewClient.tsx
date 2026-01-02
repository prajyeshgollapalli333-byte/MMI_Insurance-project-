"use client";

import React, { useState } from "react";
import { UserPlus, ArrowLeft, CheckCircle2, Copy, Check, ChevronDown } from "lucide-react";

interface AddNewClientProps {
    onBack: () => void;
    onComplete: () => void;
}

const POLICY_TYPES = [
    "Home Insurance",
    "Auto Insurance",
    "Condo",
    "Landlord Home",
    "Landlord Condo",
    "Motorcycle Insurance",
    "Umbrella Insurance",
];

export default function AddNewClient({ onBack, onComplete }: AddNewClientProps) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        policy: "",
        sendEmail: true,
        emailTemplate: "",
        requiredForm: "New Lead Form",
    });
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("success");
    };

    const copyLink = () => {
        navigator.clipboard.writeText("https://insure-crm.com/secure/ref/99x821");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (step === "success") {
        return (
            <div className="w-full max-w-2xl mx-auto pt-10 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Added Successfully!</h2>
                    <p className="text-slate-500 mb-8">The initial form has been sent to the client.</p>

                    <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-100">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Client Summary</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                                <span className="text-slate-500 text-sm">Name</span>
                                <span className="text-slate-900 font-medium text-sm">{formData.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                                <span className="text-slate-500 text-sm">Email</span>
                                <span className="text-slate-900 font-medium text-sm">{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 text-sm">Policy</span>
                                <span className="text-slate-900 font-medium text-sm">{formData.policy}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-2 text-left">Secure Form Link</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value="https://insure-crm.com/secure/ref/99x821"
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 text-sm focus:outline-none"
                            />
                            <button
                                onClick={copyLink}
                                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setStep("form");
                                setFormData({ ...formData, name: "", email: "", mobile: "", policy: "" });
                            }}
                            className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
                        >
                            Add Another
                        </button>
                        <button
                            onClick={onComplete}
                            className="px-8 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Add New Client</h2>
                        <p className="text-sm text-slate-500">Enter client details and send initial forms</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Client Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Email ID <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="tel"
                                placeholder="(555) 000-0000"
                                value={formData.mobile}
                                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Policy Type <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    required
                                    value={formData.policy}
                                    onChange={e => setFormData({ ...formData, policy: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none bg-white hover:cursor-pointer"
                                >
                                    <option value="">Select Policy</option>
                                    {POLICY_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-semibold text-slate-900">Send Initial Email</h3>
                                <p className="text-sm text-slate-500">Send welcome email with form link</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.sendEmail}
                                    onChange={e => setFormData({ ...formData, sendEmail: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        {formData.sendEmail && (
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Email Template</label>
                                        <div className="relative">
                                            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none appearance-none bg-white text-sm hover:cursor-pointer">
                                                <option>Standard Welcome</option>
                                                <option>Urgent Request</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Required Form</label>
                                        <div className="relative">
                                            <select
                                                value={formData.requiredForm}
                                                onChange={e => setFormData({ ...formData, requiredForm: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none appearance-none bg-white text-sm hover:cursor-pointer"
                                            >
                                                <option>New Lead Form</option>
                                                <option>Endorsement Form</option>
                                                <option>Cancellation Request</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-indigo-600 font-medium flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    A secure link will be generated and embedded in the email for the client.
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors hover:cursor-pointer"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:cursor-pointer"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
