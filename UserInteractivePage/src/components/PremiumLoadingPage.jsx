import React, { useState, useEffect } from 'react';
import ProgressCircle from "./Reusables/radial_progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReportModal from './Report';
import { 
  ArrowUpRight, 
  Shield, 
  AlertTriangle, 
  Globe, 
  Cookie, 
  Network, 
  FileText,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react";

const backdata = {
  "redirects": {
    "redirect_chain": [
      "https://www.youtube.com/",
      "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3D%252Fsignin_passive%26feature%3Dpassive&dsh=S606704703%3A1772376160439029&hl=en-GB&ifkv=ASfE1-r4Eqzf-0ffTDjjjJ3ruyYoaMHY7-Uvzgm5aFaPO3cv7bTKfbkAQIpSa3nmregvON5huzG2Fg&passive=true&service=youtube&uilel=3&flowName=WebLiteSignIn&flowEntry=ServiceLogin"
    ],
    "cross_domain_content": false,
    "cross_domain_list": [],
    "redirect_len": "The page doesn't load third-party content."
  },
  "content": {
    "risk": 0.5382137143734609,
    "category": ["Safe"],
    "reason": ["No fraud indicators detected"]
  },
  "network": {
    "post_requests": 1,
    "post_url": [
      "https://www.youtube.com/youtubei/v1/guide?prettyPrint=false"
    ],
    "external_requests": [
      "https://www.youtube.com/",
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=YouTube+Sans:wght@300..900&display=swap",
      "https://i.ytimg.com/generate_204",
      "https://accounts.google.com/ServiceLogin?service=youtube",
      "https://fonts.gstatic.com/s/roboto/v51/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2",
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png"
    ],
    "ip_requests": []
  },
  "cookies": {
    "Cookie_Stealing": []
  },
  "url": "https://www.youtube.com"
}

export default function PremiumLoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const targetUrl = params.get('url') || 'https://example.com';

    fetch('http://localhost:8000/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl })
    })
      .then(response => response.json())
      .then(data => {
        setScanResult(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setScanResult({ error: 'Failed to scan URL' });
        setIsLoading(false);
      });
  }, []);

  const valuefake = 90;

  const getRiskLevel = (value) => {
    if (value >= 90) return { level: 'Critical Risk', color: '#FF5A5F', badge: 'critical' };
    if (value >= 75) return { level: 'High Risk', color: '#F4B740', badge: 'high' };
    if (value >= 45) return { level: 'Medium Risk', color: '#5AD7FF', badge: 'medium' };
    return { level: 'Low Risk', color: '#2ECC71', badge: 'low' };
  };

  const risk = getRiskLevel(valuefake);

  const getMessage = (value) => {
    if (value >= 90) return "Critical security threats detected. We strongly recommend avoiding this website.";
    if (value >= 75) return "Significant security concerns identified. Proceed with extreme caution.";
    if (value >= 45) return "Moderate security concerns detected. Review details before proceeding.";
    return "No significant security threats detected. This website appears safe.";
  };

  // Premium Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#EEF5FF] via-[#F8FBFF] via-[#FFF9F5] to-[#F5FFFA]">
        {/* Animated Background Blobs - Evenly Distributed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-300/35 to-cyan-300/35 rounded-full blur-3xl blob-float" />
          <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl blob-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-teal-300/28 to-emerald-300/28 rounded-full blur-3xl blob-float" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-10 right-10 w-88 h-88 bg-gradient-to-br from-orange-300/25 to-amber-300/25 rounded-full blur-3xl blob-float" style={{ animationDelay: '6s' }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Glass Loading Card */}
            <div className="glass-card-strong rounded-3xl p-12 max-w-md mx-auto bg-gradient-to-br from-white/80 via-white/75 to-blue-50/40">
              {/* Animated Shield Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF] to-[#5AD7FF] rounded-full opacity-20 animate-ping" />
                  <div className="relative bg-gradient-to-br from-[#4F8CFF] to-[#5AD7FF] p-8 rounded-full flex items-center justify-center glow-pulse">
                    <Shield className="w-12 h-12 text-white" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-[#1E2A38] mb-3 tracking-tight">Analyzing Security</h1>
              <p className="text-base text-[#5F6C7B] mb-8">Scanning URL for potential threats...</p>

              {/* Animated Progress Dots */}
              <div className="flex justify-center gap-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#4F8CFF] to-[#5AD7FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#4F8CFF] to-[#5AD7FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-[#4F8CFF] to-[#5AD7FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium Dashboard
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#EEF5FF] via-[#F8FBFF] via-[#FFF9F5] to-[#F5FFFA] noise-texture">
      {/* Animated Background Blobs - Evenly Distributed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left - Blue */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl blob-float" />
        {/* Top Right - Purple */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-purple-300/25 to-pink-300/25 rounded-full blur-3xl blob-float" style={{ animationDelay: '2s' }} />
        {/* Bottom Left - Teal */}
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-gradient-to-br from-teal-300/28 to-emerald-300/28 rounded-full blur-3xl blob-float" style={{ animationDelay: '4s' }} />
        {/* Bottom Right - Orange */}
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-gradient-to-br from-orange-300/22 to-amber-300/22 rounded-full blur-3xl blob-float" style={{ animationDelay: '6s' }} />
        {/* Center Top - Indigo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-300/25 to-blue-300/25 rounded-full blur-3xl blob-float" style={{ animationDelay: '8s' }} />
        {/* Center Bottom - Rose */}
        <div className="absolute bottom-1/4 right-1/3 w-[380px] h-[380px] bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl blob-float" style={{ animationDelay: '10s' }} />
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-[#4F8CFF]" strokeWidth={2} />
            <h1 className="text-5xl font-bold text-[#1E2A38] tracking-tight">Security Analysis Dashboard</h1>
          </div>
          <p className="text-lg text-[#5F6C7B] font-medium">Comprehensive URL Security Assessment</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 max-w-[1800px] mx-auto">
          
          {/* Left: Main Risk Score Card */}
          <div className="xl:col-span-2">
            <div className="glass-card-strong rounded-3xl p-10  duration-300 hover:shadow-2xl bg-gradient-to-br from-white/75 via-white/70 to-blue-50/50">
              <h2 className="text-3xl font-bold text-[#1E2A38] mb-8 text-center tracking-tight">Overall Risk Score</h2>
              
              {/* Risk Circle */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <ProgressCircle WnH={"w-64 h-64"} value={valuefake} />
                </div>
              </div>

              {/* Risk Badge */}
              <div className="flex justify-center mb-6">
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                  risk.badge === 'critical' ? 'bg-red-50 border border-red-200' :
                  risk.badge === 'high' ? 'bg-amber-50 border border-amber-200' :
                  risk.badge === 'medium' ? 'bg-cyan-50 border border-cyan-200' :
                  'bg-green-50 border border-green-200'
                }`}>
                  {valuefake >= 75 ? <XCircle className="w-5 h-5" style={{ color: risk.color }} /> : 
                   valuefake >= 45 ? <AlertTriangle className="w-5 h-5" style={{ color: risk.color }} /> :
                   <CheckCircle2 className="w-5 h-5" style={{ color: risk.color }} />}
                  <span className="font-bold text-lg" style={{ color: risk.color }}>{risk.level}</span>
                </div>
              </div>

              {/* Message */}
              <p className="text-center text-[#1E2A38] text-base leading-relaxed mb-8 px-4">
                {getMessage(valuefake)}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={() => window.location.href = "https://youtube.com"}
                  className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-[#4F8CFF] to-[#5AD7FF] hover:from-[#3D7AE6] hover:to-[#48C6EC] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue to Website
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="h-12 text-medium font-semibold border-red-200 text-white bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 hover:text-white rounded-xl transition-all duration-300"
                  >
                    {/* Will Add Here The Database Connection */}
                    Report Issue
                  </Button>
                  <Button onClick={()=>window.history.back()}
                    variant="outline"
                    className="h-12 text-sm font-semibold glass-card border-[#4F8CFF]/30 text-[#4F8CFF] hover:bg-blue-50 rounded-xl transition-all duration-300"
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Analysis Cards Grid */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Content Analysis Card */}
            <AnalysisCard
              icon={<FileText className="w-6 h-6" />}
              title="Content Analysis"
              value={(backdata.content.risk * 100).toFixed(1) }
              tags={backdata.content.category}
              description={backdata.content.reason}
              onViewReport={() => setReportOpen(true)}
            />

            {/* Redirect Analysis Card */}
            <AnalysisCard
              icon={<Globe className="w-6 h-6" />}
              title="Redirect Chain"
              value={28}
              tags={["Cross-Domain", "Multiple Hops", "Suspicious Path"]}
              description={scanResult?.redirects?.redirect_chain?.length > 1 
                ? `${scanResult.redirects.redirect_chain.length} redirects detected in the navigation chain.`
                : "No suspicious redirects detected. Direct navigation confirmed."}
              onViewReport={() => setReportOpen(true)}
            />

            {/* Network Activity Card */}
            <AnalysisCard
              icon={<Network className="w-6 h-6" />}
              title="Network Activity"
              value={96}
              tags={["High Traffic", "External Requests", "POST Activity", "Data Transfer"]}
              description="Elevated network activity with multiple external connections and data transmission detected."
              onViewReport={() => setReportOpen(true)}
            />

            {/* Cookie Safety Card */}
            <AnalysisCard
              icon={<Cookie className="w-6 h-6" />}
              title="Cookie Safety"
              value={82}
              tags={["Tracking Risk", "Third-Party", "Session Exposure"]}
              description="Potential cookie security concerns identified. Review privacy implications before proceeding."
              onViewReport={() => setReportOpen(true)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-[#5F6C7B] text-sm">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Powered by Advanced Security Intelligence</span>
          </div>
        </div>
      </div>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
}

// Reusable Analysis Card Component
function AnalysisCard({ icon, title, value, tags, description, onViewReport }) {
  const getRiskColor = (val) => {
    if (val >= 90) return { bg: 'from-red-400/20 to-red-500/20', text: '#FF5A5F', border: 'border-red-200', cardBg: 'from-white/70 via-white/65 to-red-50/30' };
    if (val >= 75) return { bg: 'from-amber-400/20 to-amber-500/20', text: '#F4B740', border: 'border-amber-200', cardBg: 'from-white/70 via-white/65 to-amber-50/30' };
    if (val >= 45) return { bg: 'from-cyan-400/20 to-cyan-500/20', text: '#5AD7FF', border: 'border-cyan-200', cardBg: 'from-white/70 via-white/65 to-cyan-50/30' };
    return { bg: 'from-green-400/20 to-green-500/20', text: '#2ECC71', border: 'border-green-200', cardBg: 'from-white/70 via-white/65 to-green-50/30' };
  };

  const risk = getRiskColor(value);

  return (
    <div className={`glass-card rounded-2xl p-6 float-animation transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-gradient-to-br ${risk.cardBg}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${risk.bg} ${risk.border} border`}>
          <div style={{ color: risk.text }}>{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-[#1E2A38] tracking-tight">{title}</h3>
      </div>

      {/* Progress and Tags */}
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0">
          <ProgressCircle WnH={"w-20 h-20"} value={value} />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.slice(0, 3).map((tag, idx) => (
            <Badge 
              key={idx}
              variant="secondary" 
              className="text-xs px-3 py-1 bg-white/60 border border-[#98A2B3]/20 text-[#5F6C7B] font-medium rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#5F6C7B] leading-relaxed mb-4">
        {description}
      </p>

      {/* View Report Link */}
      <button
        onClick={onViewReport}
        className="text-sm font-semibold text-[#4F8CFF] hover:text-[#3D7AE6] transition-colors duration-200 flex items-center gap-1 group-hover:gap-2"
      >
        View Detailed Report
        <ArrowUpRight className="w-4 h-4 transition-all duration-200" />
      </button>
    </div>
  );
}
