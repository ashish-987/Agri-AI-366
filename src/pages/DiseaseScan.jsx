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
  Download,
  Zap,
  Microscope,
  Camera,
  Search,
  BookOpen,
  Info
} from 'lucide-react';

export default function DiseaseScan() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'encyclopedia'

  const sampleLeaves = [
    {
      id: 'tomato',
      label: 'Sample Tomato Leaf',
      diseaseName: 'Tomato Early Blight (Alternaria solani)',
      confidence: '98.4%',
      severity: 'Moderate Infection',
      pathogenType: 'Fungal Pathogen',
      img: '/assets/crop_disease_leaf.jpg',
      symptoms: 'Target-like brown spots on mature leaves with yellow chlorotic halos.',
      remedies: [
        'Apply Copper Fungicide or Mancozeb spray @ 2.5g/L water immediately.',
        'Prune lower 3 inches of infected leaves to stop spore splash.',
        'Switch to drip irrigation to keep foliage dry.'
      ]
    },
    {
      id: 'wheat',
      label: 'Sample Wheat Field',
      diseaseName: 'Wheat Yellow Rust (Puccinia striiformis)',
      confidence: '96.8%',
      severity: 'High Infection Risk',
      pathogenType: 'Fungal Rust Spore',
      img: '/assets/smart_farm_aerial.jpg',
      symptoms: 'Yellow-orange pustules arranged in linear stripes along leaf veins.',
      remedies: [
        'Spray Propiconazole 25% EC @ 1ml/L water during early tillering.',
        'Ensure field drainage to reduce microclimate humidity.',
        'Monitor adjacent wheat sectors within 500m radius.'
      ]
    },
    {
      id: 'potato',
      label: 'Sample Harvested Crop',
      diseaseName: 'Healthy Crop (No Disease Detected)',
      confidence: '99.1%',
      severity: 'Healthy & Optimal Growth',
      pathogenType: 'None Detected',
      img: '/assets/fresh_mandi_produce.jpg',
      symptoms: 'Vigorous leaf cell structure, uniform chlorophyll distribution.',
      remedies: [
        'Maintain current bio-fertilizer schedule.',
        'Schedule next routine drone scan in 7 days.'
      ]
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      runScan(sampleLeaves[0]);
    }
  };

  const runScan = (sampleData) => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sampleData);
    }, 2200);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-8 animate-in fade-in">
      
      {/* TOP HEADER & SUB-NAVIGATION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200">
            <Microscope className="w-3.5 h-3.5 text-[#006c49]" />
            <span>AI LEAF PATHOGEN SCANNER &amp; ENCYCLOPEDIA</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            AI Crop Disease Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            Instant 98.4% accurate plant disease identification &amp; agronomist spray recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'scanner' ? 'bg-[#006c49] text-white shadow-md' : 'bg-white text-[#006c49] border border-emerald-200'
            }`}
          >
            Scanner Tool
          </button>
          <button 
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'encyclopedia' ? 'bg-[#006c49] text-white shadow-md' : 'bg-white text-[#006c49] border border-emerald-200'
            }`}
          >
            Disease Encyclopedia
          </button>
        </div>
      </div>

      {activeTab === 'scanner' && (
        <div className="space-y-8">
          
          {/* MAIN DIAGNOSTIC WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: 3-Step Process & Quick Test Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="font-display font-black text-2xl text-[#002117]">
                  How AI Diagnostics Works
                </h2>
                <p className="text-xs text-[#3c4a42] font-medium leading-relaxed">
                  Upload a photo of your crop's leaf or click a sample leaf below to test the AI vision model instantly.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="space-y-4 pt-1 relative">
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-emerald-200 -z-0" />

                <div className="flex items-center gap-3.5 relative z-10 p-3 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold flex-none shadow-sm">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#002117]">1. Upload Leaf Photo</h4>
                    <p className="text-[11px] text-[#6c7a71]">Drag &amp; drop or capture via camera</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 relative z-10 p-3 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006c49] border border-emerald-300 flex items-center justify-center font-bold flex-none">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#002117]">2. AI Vision Scan</h4>
                    <p className="text-[11px] text-[#6c7a71]">CNN model detects pathogens in 2s</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 relative z-10 p-3 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006c49] border border-emerald-300 flex items-center justify-center font-bold flex-none">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#002117]">3. Remedy &amp; Spray Protocol</h4>
                    <p className="text-[11px] text-[#6c7a71]">Exact fungicide dosage &amp; treatment</p>
                  </div>
                </div>
              </div>

              {/* QUICK SAMPLE TEST BUTTONS */}
              <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <p className="text-xs font-extrabold uppercase text-[#006c49] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#006c49]" /> Quick Test AI Model with Samples:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
                  {sampleLeaves.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => runScan(sample)}
                      className="p-2.5 rounded-2xl bg-white hover:bg-[#006c49] hover:text-white text-[#006c49] border border-emerald-200 transition-all text-center flex flex-col items-center gap-1 shadow-sm"
                    >
                      <img src={sample.img} alt={sample.label} className="w-10 h-10 rounded-xl object-cover border border-emerald-200" />
                      <span className="text-[10px] line-clamp-1">{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Drag & Drop Upload Container */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 sm:p-12 border-2 border-dashed border-emerald-300 bg-white shadow-sm hover:border-[#006c49] transition-all text-center space-y-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                
                {/* Laser Scan Animation Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
                    <div className="relative w-72 h-48 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl">
                      <img src="/assets/crop_disease_leaf.jpg" alt="Scanning Leaf" className="w-full h-full object-cover" />
                      <div className="absolute top-8 left-12 w-32 h-28 border-2 border-rose-500 rounded-lg animate-pulse" />
                      <div className="absolute inset-x-0 h-1 bg-[#6ffbbe] shadow-lg animate-pulse" />
                    </div>
                    <p className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>AI Neural Laser Scanning Pathogen Cell Structure...</span>
                    </p>
                  </div>
                )}

                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006c49] shadow-sm">
                  <ImageIcon className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md">
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#002117]">
                    Upload Leaf Photo for AI Diagnostics
                  </h2>
                  <p className="text-xs text-[#6c7a71] leading-relaxed font-medium">
                    Drag and drop your crop photo or select a sample above. Instant AI feedback on early blight, yellow rust, leaf curl, and 120+ diseases.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#046a38] hover:scale-105 transition-all">
                    <Upload className="w-4 h-4 text-emerald-300" />
                    <span>BROWSE LEAF FILE</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <button 
                    onClick={() => runScan(sampleLeaves[0])}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-100 text-[#006c49] text-xs font-extrabold uppercase tracking-wider hover:bg-emerald-200 transition-all border border-emerald-200"
                  >
                    <Camera className="w-4 h-4 text-[#006c49]" />
                    <span>CAMERA SCAN</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* SCAN RESULT DISPLAY */}
          {scanResult && !isScanning && (
            <div className="rounded-3xl p-8 bg-white border-2 border-[#006c49] shadow-xl space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 px-3 py-1 rounded-full border border-rose-200">
                    {scanResult.severity}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#002117] mt-1">{scanResult.diseaseName}</h2>
                  <p className="text-xs text-[#6c7a71] font-semibold mt-1">Pathogen Classification: <strong>{scanResult.pathogenType}</strong></p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-[#6c7a71] font-bold uppercase">AI Diagnostic Accuracy</p>
                    <p className="font-display font-black text-3xl text-[#006c49]">{scanResult.confidence}</p>
                  </div>

                  <button 
                    onClick={() => alert("Downloading Official Agronomist Diagnostic PDF Report...")}
                    className="px-5 py-3 rounded-2xl bg-[#006c49] text-white text-xs font-extrabold shadow-md hover:bg-[#046a38] transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Report</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-700" /> Detected Leaf Symptoms:
                </p>
                <p className="text-amber-950 font-medium">{scanResult.symptoms}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-base text-[#002117]">Recommended Agronomist Spray Protocol &amp; Remedies:</h3>
                <ul className="space-y-2.5">
                  {scanResult.remedies.map((remedy, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs font-bold text-[#00422b]">
                      <CheckCircle2 className="w-5 h-5 text-[#006c49] flex-none mt-0.5" />
                      <span className="leading-relaxed">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* RECENT LEAF SCANS GRID */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-2xl text-[#002117]">Recent Leaf Scans</h2>
              <button className="text-xs font-extrabold uppercase text-[#006c49] hover:underline tracking-wider">
                VIEW ALL HISTORY
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {sampleLeaves.map((scan) => (
                <div 
                  key={scan.id} 
                  onClick={() => runScan(scan)}
                  className="rounded-3xl bg-white border border-emerald-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={scan.img} alt={scan.diseaseName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase bg-emerald-800 text-white px-3 py-1 rounded-full shadow-md">
                      {scan.confidence}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-display font-black text-base text-[#002117] line-clamp-1">{scan.diseaseName}</h3>
                    <div className="flex items-center justify-between text-xs text-[#6c7a71] font-semibold pt-1">
                      <span>{scan.severity}</span>
                      <span className="text-[#006c49] font-bold">Test AI →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ENCYCLOPEDIA TAB */}
      {activeTab === 'encyclopedia' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 space-y-4 shadow-sm">
            <h2 className="font-display font-black text-2xl text-[#002117]">Crop Disease Encyclopedia (120+ Diseases)</h2>
            <p className="text-xs text-[#6c7a71]">Browse symptoms, treatment dosages, and prevention guides for major Indian crops.</p>
          </div>
        </div>
      )}

    </div>
  );
}
