"use client";

import React, { useState } from "react";
import { UserPlus, ArrowLeft, CheckCircle2, Copy, Check, ChevronDown, Eye, X, FileText } from "lucide-react";

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
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        policy: "",
        sendEmail: true,
        emailTemplate: "Standard",
        requiredForm: "New Lead Form",
    });
    const [copied, setCopied] = useState(false);

    // Dynamic Form Link Generator
    const getFormLink = (formName: string) => {
        const baseUrl = "https://insure-crm.com/secure/forms";
        const formId = formName.toLowerCase().replace(/\s+/g, '-');
        return `${baseUrl}/${formId}?ref=${Math.random().toString(36).substring(7)}`;
    };

    // Variable Injection Logic
    const getRenderedContent = (templateType: string) => {
        const isPremium = templateType.includes("Premium");
        const clientName = formData.name.trim() || <span className="bg-yellow-100 text-yellow-800 px-1 rounded animate-pulse">{"{{client_name}}"}</span>;
        const policyType = formData.policy || <span className="bg-yellow-100 text-yellow-800 px-1 rounded animate-pulse">{"{{policy_type}}"}</span>;
        const formLink = getFormLink(formData.requiredForm);

        return { isPremium, clientName, policyType, formLink };
    };

    const isFormValid = () => {
        return formData.name && formData.email && formData.mobile && formData.policy && (!formData.sendEmail || (formData.emailTemplate && formData.requiredForm));
    };

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
                                    onChange={e => {
                                        const newPolicy = e.target.value;
                                        // Pick the first word as the "Type" for the template defaults, 
                                        // e.g., "Home" from "Home Insurance" -> "Home Standard"
                                        const policyBase = newPolicy ? newPolicy.split(' ')[0] : 'Standard';

                                        setFormData({
                                            ...formData,
                                            policy: newPolicy,
                                            // Auto-select "Standard" variant for the new policy type
                                            emailTemplate: newPolicy ? `${policyBase} Standard` : 'Standard'
                                        });
                                    }}
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
                                <p className="text-sm text-slate-500">Send welcome email with the required form link</p>
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
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-in slide-in-from-top-2 duration-200 space-y-6">
                                {/* Email Configuration Card */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Field 1: Email Template */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-semibold text-slate-700">Email Template</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowPreview(true)}
                                                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 hover:underline"
                                            >
                                                <Eye className="w-3 h-3" /> Preview Template
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={formData.emailTemplate}
                                                onChange={(e) => setFormData({ ...formData, emailTemplate: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none appearance-none bg-white text-sm hover:cursor-pointer"
                                            >
                                                {/* If a policy is selected, show its specific templates. Otherwise show generic ones. */}
                                                {formData.policy ? (
                                                    <>
                                                        <option value={`${formData.policy.split(' ')[0]} Standard`}>{formData.policy.split(' ')[0]} Standard</option>
                                                        <option value={`${formData.policy.split(' ')[0]} Premium`}>{formData.policy.split(' ')[0]} Premium</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="Standard">Standard</option>
                                                        <option value="Premium">Premium</option>
                                                    </>
                                                )}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                        <p className="text-xs text-slate-500">Select an email template based on client and policy type.</p>
                                    </div>

                                    {/* Field 2: Required Form */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Required Form</label>
                                        <div className="relative">
                                            <select
                                                value={formData.requiredForm}
                                                onChange={e => setFormData({ ...formData, requiredForm: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none appearance-none bg-white text-sm hover:cursor-pointer"
                                            >

                                                <option value="New Lead Form">New Lead Form</option>

                                                <option value="Endorsement Form">Endorsement Form</option>
                                                <option value="Cancellation Request">Cancellation Request</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        </div>
                                        <p className="text-xs text-slate-500">The selected form link will be automatically included in the email.</p>
                                    </div>
                                </div>

                                {/* Auto-generated Preview Summary */}
                                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 shadow-sm">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Preview Summary</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-slate-500 block text-xs mb-0.5">Template</span>
                                            <span className="font-medium text-slate-900 flex items-center gap-2">
                                                {formData.emailTemplate}
                                                {formData.emailTemplate.includes('Premium') && (
                                                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-indigo-200">
                                                        Premium
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block text-xs mb-0.5">Policy Type</span>
                                            <span className="font-medium text-slate-900">{formData.policy || "-"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block text-xs mb-0.5">Form</span>
                                            <span className="font-medium text-slate-900">{formData.requiredForm}</span>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100 text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        A secure form link will be embedded in the email.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-8 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 hover:cursor-pointer"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`px-8 py-2.5 rounded-lg font-semibold shadow-lg transition-all ${isFormValid() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300 hover:cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
                        >
                            Send Intial Email
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-semibold text-slate-900">Email Template Preview</h3>
                            <button onClick={() => setShowPreview(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 bg-slate-50/30">
                            <div className="bg-white border boundary-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-indigo-700">CS</span>
                                    </div>
                                    <div>
                                        <div className="h-2.5 bg-slate-200 rounded w-24 mb-1.5"></div>
                                        <div className="h-2 bg-slate-100 rounded w-32"></div>
                                    </div>
                                </div>

                                {(() => {
                                    const { isPremium, clientName, policyType, formLink } = getRenderedContent(formData.emailTemplate);

                                    return isPremium ? (
                                        // Premium Template Layout
                                        <div className="space-y-6">
                                            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-6 shadow-sm">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-slate-800">Action Required: Complete Your Application</h4>
                                                        <p className="text-sm text-slate-500 mt-1">Ref: {policyType} Policy Setup</p>
                                                    </div>
                                                    <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-rose-200">
                                                        Action Required
                                                    </span>
                                                </div>

                                                <div className="prose prose-sm text-slate-600 mb-6">
                                                    <p>Dear {clientName},</p>
                                                    <p>Thank you for choosing us for your <strong>{policyType}</strong> needs. To finalize your application and ensure coverage begins immediately, please complete the mandatory form below.</p>
                                                </div>

                                                <div className="bg-white border border-indigo-100 rounded-lg p-4 flex items-center justify-between shadow-sm group hover:border-indigo-300 transition-colors cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{formData.requiredForm}</p>
                                                            <p className="text-xs text-slate-500">Secure Document • Expires in 48h</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                                                        →
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-xs text-slate-400">If you have any questions, please reply to this email directly.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        // Standard Template Layout
                                        <div className="space-y-6 p-2">
                                            <div className="prose prose-sm text-slate-600">
                                                <p className="text-slate-900 font-medium text-base mb-4">Subject: {formData.requiredForm} for {policyType}</p>
                                                <p>Hi {clientName},</p>
                                                <p>Please click the link below to complete the <strong>{formData.requiredForm}</strong> required for your {policyType}.</p>

                                                <div className="my-6">
                                                    <a href="#" className="inline-block bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                                                        Complete Form Now
                                                    </a>
                                                </div>

                                                <p>Link: <span className="text-indigo-600 underline text-xs">{formLink}</span></p>
                                                <p className="mt-6">Best regards,<br />Client Services Team</p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end">
                            <button onClick={() => setShowPreview(false)} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors hover:cursor-pointer">
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
