import { X, AlertTriangle, Shield, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Premium Glass Modal Container */}
            <div
                className="relative glass-card-strong w-[90%] max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/80 via-white/75 to-blue-50/40"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#4F8CFF]/12 to-[#5AD7FF]/12 border-b border-white/40 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-[#4F8CFF] to-[#5AD7FF] rounded-xl">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#1E2A38] tracking-tight">Detailed Security Report</h2>
                                <p className="text-sm text-[#5F6C7B]">Comprehensive analysis results</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/50 rounded-xl transition-all duration-200 group"
                        >
                            <X className="w-6 h-6 text-[#5F6C7B] group-hover:text-[#1E2A38]" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="h-full max-h-[calc(85vh-140px)] overflow-y-auto p-8 no-scrollbar">
                    <div className="space-y-6">
                        {/* Alert Section */}
                        <div className="glass-card rounded-2xl p-6 border-l-4 border-amber-400">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-[#1E2A38] mb-2">Security Alert</h3>
                                    <p className="text-sm text-[#5F6C7B] leading-relaxed">
                                        This report contains detailed information about potential security threats detected during the analysis.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Report Sections */}
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FileText className="w-5 h-5 text-[#4F8CFF]" />
                                    <h3 className="text-lg font-bold text-[#1E2A38]">Analysis Section {i + 1}</h3>
                                </div>
                                <p className="text-sm text-[#5F6C7B] leading-relaxed mb-3">
                                    Detailed findings and technical information about the security assessment would appear here.
                                    This includes threat indicators, risk factors, and recommended actions.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200">
                                        Finding {i + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-white/40 px-8 py-5 bg-gradient-to-r from-[#4F8CFF]/8 to-[#5AD7FF]/8">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="h-11 px-6 glass-card border-[#4F8CFF]/30 text-[#4F8CFF] hover:bg-blue-50 rounded-xl font-semibold"
                        >
                            Close Report
                        </Button>
                        <Button
                            className="h-11 px-6 bg-gradient-to-r from-[#4F8CFF] to-[#5AD7FF] hover:from-[#3D7AE6] hover:to-[#48C6EC] text-white rounded-xl font-semibold flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Export Report
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}