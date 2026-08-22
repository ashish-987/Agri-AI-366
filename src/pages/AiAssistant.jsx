import React, { useState } from 'react';
import { 
  Bot, 
  Mic, 
  Send, 
  Paperclip, 
  Sparkles, 
  Droplets, 
  Thermometer, 
  Calendar, 
  MapPin, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function AiAssistant({ activePreset }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      time: '09:15 AM',
      text: "Namaste Gurpreet! I am your AgriAI 366 Voice Agronomist. Soil moisture in Sector A (Wheat) is at 62% optimal range today. How can I assist your farm operation?"
    },
    {
      sender: 'user',
      time: '10:30 AM',
      text: "My wheat leaves are turning yellow at the bottom. What should I do?"
    },
    {
      sender: 'ai',
      time: '10:31 AM',
      text: "Based on your crop lifecycle telemetry (Day 42 Tillering stage), lower yellowing is a classic signal of Nitrogen deficiency or early Yellow Rust infection.",
      insightBox: "Recommendation: Apply 25kg/acre Urea top-dressing followed by immediate light drip irrigation. Upload a leaf scan for 98.4% pathogen confirmation.",
      followUp: "Would you like me to schedule an irrigation trigger for 02:00 PM?"
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };
    } else {
      setTimeout(() => {
        setInputText("How much DAP fertilizer should I apply for Wheat at Tillering stage?");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText;
    const newMessages = [
      ...messages,
      { sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: userMsgText }
    ];
    setMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      const aiReply = "Based on your soil NPK test of 42 ppm, apply 25kg Urea per acre followed by light drip irrigation.";
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: aiReply
        }
      ]);
      speakText(aiReply);
    }, 1200);
  };

  return (
    <div className="space-y-8 py-2 w-full px-4 sm:px-6 animate-in fade-in">
      
      {/* HEADER */}
      <div className="rounded-3xl p-8 bg-white border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#006c49] text-xs font-bold border border-emerald-200">
            <Bot className="w-3.5 h-3.5 text-[#006c49]" />
            <span>AI VOICE AGRONOMIST &amp; CROP ADVISOR</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#002117]">
            AgriAI 366 Smart Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#3c4a42] font-medium">
            24/7 Multilingual AI Agronomist trained on ICAR crop data, soil telemetry, and APMC mandi pricing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE CONTEXT & SENSOR MAP */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-3xl p-6 bg-white border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">
                ACTIVE TELEMETRY CONTEXT
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#006c49]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="font-display font-black text-lg text-[#002117]">Punjab Sector A</h3>
              <p className="text-xs text-[#006c49] font-extrabold">🌾 Sharbati Wheat • 12 Acres</p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-[#6c7a71] font-extrabold flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#0284c7]" /> Soil Moisture
                </span>
                <span className="font-extrabold text-[#002117]">62% (Optimal)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between text-xs">
                <span className="text-[#6c7a71] font-extrabold flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-amber-600" /> Temperature
                </span>
                <span className="font-extrabold text-[#002117]">24°C (Light Rain)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6c7a71] font-extrabold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#006c49]" /> Crop Stage
                  </span>
                  <span className="font-extrabold text-[#006c49]">Tillering (Day 42/120)</span>
                </div>
                <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c49] rounded-full w-[45%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-sm border border-emerald-100 relative bg-[#002117] min-h-[160px] flex flex-col justify-end p-5 text-white">
            <img src="/assets/smart_farm_aerial.jpg" alt="Sensor Map Node" className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-white">
              <MapPin className="w-4 h-4 text-[#6ffbbe]" />
              <span>IoT Node A1 (Ludhiana Mandi Sector)</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE CHAT PANEL */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-emerald-100 shadow-sm space-y-6 flex flex-col justify-between min-h-[580px]">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-[#006c49] px-4 py-1 rounded-full border border-emerald-200">
                  LIVE CONVERSATION
                </span>

                {isSpeaking ? (
                  <button
                    onClick={stopSpeaking}
                    className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 animate-pulse"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Stop Voice Speech</span>
                  </button>
                ) : (
                  <span className="text-xs text-[#6c7a71] font-semibold flex items-center gap-1">
                    <Volume2 className="w-4 h-4 text-[#006c49]" /> Voice Audio Synthesis Active
                  </span>
                )}
              </div>

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.sender === 'ai' ? (
                    <div className="w-10 h-10 rounded-2xl bg-[#006c49] text-white flex items-center justify-center text-xs font-bold flex-none shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                  ) : (
                    <img src="/assets/agri_expert_portrait.jpg" alt="User" className="w-10 h-10 rounded-2xl object-cover border-2 border-[#006c49] flex-none shadow-sm" />
                  )}

                  <div className="space-y-2 max-w-xl">
                    <div className={`p-4 rounded-3xl text-xs font-bold leading-relaxed ${
                      msg.sender === 'ai'
                        ? 'bg-emerald-50/80 text-[#00422b] rounded-tl-none border border-emerald-200'
                        : 'bg-[#006c49] text-white rounded-tr-none shadow-md'
                    }`}>
                      <div className="flex items-center justify-between gap-2">
                        <p>{msg.text}</p>
                        {msg.sender === 'ai' && (
                          <button 
                            onClick={() => speakText(msg.text)}
                            className="p-1 rounded-full hover:bg-emerald-200 text-[#006c49] flex-none"
                            title="Listen to speech"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {msg.insightBox && (
                        <div className="mt-3 p-3.5 rounded-2xl bg-white border-l-4 border-[#006c49] text-xs font-bold text-[#00422b] shadow-sm">
                          {msg.insightBox}
                        </div>
                      )}

                      {msg.followUp && (
                        <p className="mt-3 text-emerald-900">{msg.followUp}</p>
                      )}
                    </div>

                    <p className={`text-[10px] text-[#6c7a71] px-1 font-semibold ${msg.sender === 'user' ? 'text-right' : ''}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Bottom Quick Chips & Input Form */}
            <div className="space-y-4 pt-4 border-t border-emerald-100">
              
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {['🧪 Fertilizer Dose', '🐛 Pest Remedy', '💧 Drip Schedule', '📈 APMC Mandi Price'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setInputText(chip)}
                    className="px-4 py-2 rounded-2xl text-xs font-extrabold bg-emerald-50 text-[#006c49] border border-emerald-200 hover:bg-[#006c49] hover:text-white transition-all whitespace-nowrap"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-2 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <button type="button" className="p-2.5 text-[#006c49] hover:bg-emerald-100 rounded-xl">
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a farming question or describe a leaf symptom..."
                  className="flex-1 px-3 text-xs font-semibold bg-transparent text-[#002117] placeholder-[#6c7a71] focus:outline-none"
                />

                <button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`p-2.5 rounded-xl transition-all ${
                    isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-100 text-[#006c49]'
                  }`}
                  title="Click to speak voice query"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="p-3 rounded-xl bg-[#006c49] text-white shadow-md hover:bg-[#046a38] transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
