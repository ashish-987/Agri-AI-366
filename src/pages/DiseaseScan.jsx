import React, { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  RotateCcw, 
  Image as ImageIcon,
  Check,
  Brain,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function DiseaseScan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      simulateScan();
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        diseaseName: 'Tomato Early Blight (Alternaria solani)',
        confidence: '98.4%',
        severity: 'Moderate Infection Detected',
        pathogenType: 'Fungal Pathogen',
        symptoms: 'Concentric dark brown target-like rings on mature leaves, yellow halos around spots.',
        remedies: [
          'Apply Copper Fungicide or Mancozeb spray @ 2.5g / liter water within 24 hours.',
          'Remove infected lower leaves to prevent spore splash to healthy upper leaves.',
          'Ensure drip irrigation to avoid leaf wetness and improve field airflow.'
        ]
      });
    }, 2500);
  };

  const recentScans = [
    {
      id: 1,
      title: 'Tomato Early Blight',
      badge: 'HIGH RISK',
      badgeBg: 'bg-red-500 text-white',
      confidence: '98% Confidence',
      time: '2 hrs ago',
      img: '/assets/crop_disease_leaf.jpg'
    },
    {
      id: 2,
      title: 'Wheat Leaf',
      badge: 'HEALTHY',
      badgeBg: 'bg-emerald-600 text-white',
      confidence: 'No issues detected',
      time: 'Yesterday',
      img: '/assets/smart_farm_aerial.jpg'
    },
    {
      id: 3,
      title: 'Potato Leaf Roll',
      badge: 'MONITOR',
      badgeBg: 'bg-amber-500 text-white',
      confidence: '65% Confidence',
      time: 'Yesterday',
      img: '/assets/fresh_mandi_produce.jpg'
    }
  ];

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* TOP AI DIAGNOSTIC SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Title & 3-Step Process */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h1 className="font-display font-black text-4xl sm:text-5xl text-[#006c49] leading-tight">
              AI Diagnostic
            </h1>
            <p className="text-sm text-[#3c4a42] font-medium leading-relaxed">
              Detect crop diseases in seconds. Upload a clear photo of your plant's leaves for instant, actionable insights.
            </p>
          </div>

          <div className="space-y-4 pt-2 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#006c49]/20 -z-0" />

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#006c49] text-white flex items-center justify-center font-bold shadow-md flex-none">
                <Upload className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-base text-[#002117]">1. Upload Image</h3>
                <p className="text-xs text-[#6c7a71] font-medium">Drag & drop or select file</p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#006c49] border-2 border-[#006c49]/30 flex items-center justify-center font-bold flex-none">
                <Brain className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-base text-[#002117]">2. AI Analysis</h3>
                <p className="text-xs text-[#6c7a71] font-medium">Processing with neural nets</p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] text-[#006c49] border-2 border-[#006c49]/30 flex items-center justify-center font-bold flex-none">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-base text-[#002117]">3. Result & Advice</h3>
                <p className="text-xs text-[#6c7a71] font-medium">Get treatment protocols</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Drag & Drop Upload Container with Scanning Laser Animation */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#006c49]/30 bg-white/90 shadow-sm hover:border-[#006c49] transition-all text-center space-y-6 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
            
            {/* Laser Scan Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-64 h-44 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl">
                  <img src="/assets/crop_disease_leaf.jpg" alt="Scanning Leaf" className="w-full h-full object-cover" />
                  {/* Bounding Box */}
                  <div className="absolute top-8 left-12 w-28 h-24 border-2 border-red-500 rounded-lg animate-pulse" />
                  {/* Scanning Beam */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#6ffbbe] to-transparent shadow-lg animate-scan" />
                </div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">AI Neural Laser Scanning Pathogen...</p>
              </div>
            )}

            <div className="w-20 h-20 rounded-full bg-[#dcfce7] border-4 border-[#006c49]/15 flex items-center justify-center text-[#006c49] shadow-inner">
              <ImageIcon className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#002117]">
                Drag & Drop Leaf Photo
              </h2>
              <p className="text-xs text-[#6c7a71] leading-relaxed">
                Supported formats: JPEG, PNG. Max file size: 10MB. Ensure lighting is even and the affected area is clearly visible.
              </p>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] hover:scale-105 transition-all">
              <span>BROWSE FILES</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

          </div>
        </div>

      </div>

      {/* SCAN RESULT OVERLAY WITH PDF REPORT GENERATOR */}
      {scanResult && !isScanning && (
        <div className="rounded-3xl p-8 bg-white border border-[#006c49]/30 shadow-xl space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#006c49]/15 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase bg-red-100 text-red-700 px-3 py-1 rounded-full">
                {scanResult.severity}
              </span>
              <h2 className="font-display font-extrabold text-2xl text-[#002117] mt-1">{scanResult.diseaseName}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-[#6c7a71]">Diagnostic Accuracy</p>
                <p className="font-display font-black text-2xl text-[#006c49]">{scanResult.confidence}</p>
              </div>

              <button 
                onClick={() => alert("Generating & Downloading SIH Official Diagnostic PDF Report...")}
                className="px-4 py-2.5 rounded-2xl bg-[#006c49] text-white text-xs font-bold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>PDF Protocol Report</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-[#002117]">Recommended Agronomist Treatment Protocol:</h3>
            <ul className="space-y-2">
              {scanResult.remedies.map((remedy, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-[#dcfce7] text-xs font-semibold text-[#00422b]">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49] flex-none mt-0.5" />
                  <span>{remedy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* RECENT SCANS SECTION */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-xl text-[#002117]">Recent Scans</h2>
          <button className="text-xs font-extrabold uppercase text-[#006c49] hover:underline tracking-wider">
            VIEW ALL
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentScans.map((scan) => (
            <div key={scan.id} className="rounded-3xl bg-white border border-[#006c49]/15 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              
              <div className="h-44 overflow-hidden relative">
                <img src={scan.img} alt={scan.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm ${scan.badgeBg}`}>
                  {scan.badge}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display font-bold text-base text-[#002117]">{scan.title}</h3>
                <div className="flex items-center justify-between text-xs text-[#6c7a71] pt-1">
                  <span>{scan.confidence}</span>
                  <span>{scan.time}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
