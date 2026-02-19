import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell
} from 'recharts';

const App = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedCloudStage, setSelectedCloudStage] = useState('Mohs Reveal');

  // --- DATA MODELS ---

  const emotionalJourneyData = [
    { stage: 'Diagnosis', impact: 8.5, shock: 7.0, frustration: 4.0, vigilance: 3.0 },
    { stage: 'Waiting', impact: 9.2, shock: 4.5, frustration: 8.8, vigilance: 5.0 },
    { stage: 'Mohs Reveal', impact: 7.5, shock: 9.8, frustration: 3.0, vigilance: 4.0 },
    { stage: 'Reconstruction', impact: 6.0, shock: 6.5, frustration: 7.2, vigilance: 6.0 },
    { stage: 'Surveillance', impact: 5.0, shock: 3.0, frustration: 4.5, vigilance: 9.0 },
  ];

  const thematicBurdenData = [
    { subject: 'Cosmetic Integrity', current: 95, insight: "Prioritize endpoints that measure 'invisible healing' and anatomical symmetry.", observation: "H&N patients view the scar as a permanent 'cancer marker' more than the disease itself." },
    { subject: 'Systemic Friction', current: 82, insight: "Streamline the neoadjuvant-to-surgery timeline to reduce 'waiting-room trauma'.", observation: "Patients report extreme anxiety during the multi-week gap between biopsy and Mohs." },
    { subject: 'Recurrence Dread', current: 78, insight: "Position durable response rates as 'psychological closure' metrics.", observation: "High volume of r/SkinCancer posts center on 'did they get it all?' uncertainty." },
    { subject: 'Clinical Trust', current: 65, insight: "Improve transparency regarding the potential size of the 'Mohs hole' post-clearance.", observation: "Trust erodes when the final surgical defect significantly exceeds the initial biopsy size." },
    { subject: 'Financial Burden', current: 88, insight: "Develop cost-benefit narratives focused on 'single-session' success vs. revision surgeries.", observation: "Out-of-pocket costs for reconstruction and scar revisions are primary forum pain points." },
    { subject: 'Functional Loss', current: 72, insight: "Focus on peri-orbital and nasal-alar preservation in Phase 3 recruitment.", observation: "Concerns regarding eyelid function and nasal breathing dominate YouTube recovery vlogs." },
  ];

  const sourceVolumeData = [
    { name: 'Reddit Ecosystem', value: 145, subcategories: 'r/DermatologyQuestions, r/Cancer, r/SkinCancer, r/CancerCaregivers, r/cancersurvivors' },
    { name: 'YouTube Storytelling', value: 110, subcategories: 'Mohs Day-by-Day, Visual Vlogs, Surgical Recovery' },
    { name: 'Patient Testimony Sites', value: 95, subcategories: 'Cancer.org.au, Hospital Blogs, Survivorship Pages' },
    { name: 'Cancer Forums', value: 85, subcategories: 'Caregiver Communities, Specialized Boards' },
    { name: 'Mainstream/Viral Media', value: 45, subcategories: 'Viral Patient Stories, Influencer Perception' },
  ];

  const stageKeywords = {
    'Diagnosis': {
      words: [
        { text: 'Invasive', size: 'text-2xl', color: 'text-indigo-600', weight: 'font-bold' },
        { text: 'Aggressive Subtype', size: 'text-3xl', color: 'text-red-500', weight: 'font-black' },
        { text: 'Skin Cancer', size: 'text-xl', color: 'text-slate-700', weight: 'font-semibold' },
        { text: 'Treatment Delay', size: 'text-lg', color: 'text-indigo-400', weight: 'font-medium' },
        { text: 'Morpheaform', size: 'text-2xl', color: 'text-red-400', weight: 'font-bold' },
      ],
      insight: "Initial shock is driven by terminology; 'invasive' and 'aggressive' signals create an immediate demand for rapid intervention over watchful waiting."
    },
    'Waiting': {
      words: [
        { text: 'Wait-Time Fatigue', size: 'text-3xl', color: 'text-amber-600', weight: 'font-black' },
        { text: 'Pre-Surgical Dread', size: 'text-2xl', color: 'text-amber-500', weight: 'font-bold' },
        { text: 'Access Barrier', size: 'text-xl', color: 'text-indigo-500', weight: 'font-semibold' },
        { text: 'Tumor Growth', size: 'text-2xl', color: 'text-red-400', weight: 'font-bold' },
      ],
      insight: "The 'interim void' between diagnosis and surgery is a period of perceived tumor expansion, driving high interest in neoadjuvant therapies that can 'stop the clock'."
    },
    'Mohs Reveal': {
      words: [
        { text: 'REVEAL TRAUMA', size: 'text-4xl', color: 'text-red-600', weight: 'font-black' },
        { text: 'Functional Loss', size: 'text-2xl', color: 'text-slate-800', weight: 'font-bold' },
        { text: 'Disfigurement', size: 'text-xl', color: 'text-red-500', weight: 'font-semibold' },
        { text: 'Anatomical Distortion', size: 'text-2xl', color: 'text-red-700', weight: 'font-black' },
      ],
      insight: "The first visual encounter with the surgical defect represents a peak traumatic event, validating tissue-preservation as a key clinical endpoint."
    },
    'Reconstruction': {
      words: [
        { text: 'Secondary Healing', size: 'text-2xl', color: 'text-indigo-700', weight: 'font-bold' },
        { text: 'Asymmetry', size: 'text-xl', color: 'text-green-600', weight: 'font-semibold' },
        { text: 'Scar Burden', size: 'text-lg', color: 'text-slate-500', weight: 'font-medium' },
      ],
      insight: "Patient focus shifts from 'cancer-free' to 'identity-restoration,' where asymmetry and scarring are viewed as long-term functional failures."
    },
    'Surveillance': {
      words: [
        { text: 'RECURRENCE RISK', size: 'text-3xl', color: 'text-red-500', weight: 'font-black' },
        { text: 'Vigilance Fatigue', size: 'text-2xl', color: 'text-cyan-600', weight: 'font-bold' },
        { text: 'Incomplete Resection', size: 'text-xl', color: 'text-indigo-400', weight: 'font-semibold' },
      ],
      insight: "Chronic hyper-vigilance leads to significant surveillance exhaustion, highlighting the need for highly durable treatments that provide psychological closure."
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-xl text-sm ring-1 ring-slate-900/5">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2 uppercase tracking-tight text-xs">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex flex-col mb-1">
              <div className="flex justify-between items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
                  <span className="text-slate-500 text-xs font-medium">{entry.name}:</span>
                </span>
                <span className="font-bold text-slate-900 text-xs">{entry.value}</span>
              </div>
              {entry.payload.subcategories && (
                <p className="text-[10px] text-indigo-500 mt-1 font-bold italic">{entry.payload.subcategories}</p>
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8 font-sans text-slate-900 relative">
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] overflow-hidden select-none">
        <div className="text-[40vw] font-black tracking-tighter rotate-[-25deg]">SDS</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-10 border-b-4 border-indigo-600 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Medical Strategy Tier 1</span>
              <span className="text-indigo-600 text-[10px] tracking-widest uppercase font-black border-l border-slate-300 pl-3">Phase 3 Strategic Asset v4.3</span>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1 border border-indigo-200 shadow-sm">
                Signal Baseline: n=480
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9] mb-2">
              Mapping the Head & Neck BCC Patient Journey
            </h1>
            <p className="text-indigo-600 text-sm font-black uppercase tracking-[0.2em] italic">
              Digital Ethnography & Ecosystem Insights for Phase 3 Strategy
            </p>
          </div>
          <nav className="flex bg-slate-200 p-1.5 rounded-xl border border-slate-300 shadow-sm">
            {['insights', 'demographics', 'methodology'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </header>

        {activeTab === 'insights' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-slate-200">
                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">
                    Patient Journey Intensity Index
                  </h2>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#f87171]"></span>
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Emotional Impact</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border-2 border-dashed border-[#6366f1]"></span>
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Clinical Friction</span>
                    </div>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emotionalJourneyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#64748b'}} dy={10} />
                      <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="impact" stroke="#f87171" strokeWidth={4} name="Emotional Impact" dot={{ r: 6, fill: '#f87171', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                      <Line type="monotone" dataKey="frustration" stroke="#6366f1" strokeWidth={4} name="Clinical Friction" strokeDasharray="8 8" dot={{ r: 6, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t-2 border-slate-50 flex gap-6">
                  <div className="bg-indigo-600 w-1 rounded-full"></div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Strategic Clinical Insight</p>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed max-w-3xl">
                      The <span className="text-indigo-600">Friction/Impact Crossover</span> during the 'Waiting' phase identifies a high-value window for neoadjuvant therapy. By transitioning this period from 'passive waiting' to 'active treatment,' we can psychologically mitigate the 'Mohs Reveal' trauma, fundamentally shifting the patient trajectory toward identity restoration earlier in the lifecycle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Source Ecosystem Volume</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sourceVolumeData} margin={{ left: -30 }}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" name="Signal Volume">
                          {sourceVolumeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : index === 1 ? '#ef4444' : '#64748b'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Key Concentration</p>
                  <p className="text-xs font-bold text-slate-700 leading-tight">
                    Reddit Ecosystem and YouTube storytelling represent the highest volume of patient-generated insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 border-l-8 border-indigo-600 rounded-3xl p-10 shadow-md relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
                <div className="lg:col-span-1">
                  <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Patient Signal Cloud</h2>
                  <div className="flex flex-col gap-2 mt-6">
                    {Object.keys(stageKeywords).map((stage) => (
                      <button 
                        key={stage} 
                        onClick={() => setSelectedCloudStage(stage)} 
                        className={`text-left px-5 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border-2 ${
                          selectedCloudStage === stage 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-lg' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 min-h-[380px] flex flex-col justify-between bg-slate-50/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-slate-100">
                  <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 flex-grow text-center py-6">
                    {stageKeywords[selectedCloudStage].words.map((word, i) => (
                      <span key={i} className={`${word.size} ${word.color} ${word.weight} animate-pulse tracking-tight`}>
                        {word.text}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Strategic Translation</p>
                    <p className="text-sm font-bold text-slate-800">{stageKeywords[selectedCloudStage].insight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-slate-200">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                  <h2 className="text-lg font-black text-slate-900 mb-2 uppercase italic tracking-tighter">Thematic Burden Mapping</h2>
                  <p className="text-xs text-slate-500 font-bold mb-6 italic">Signal Intensity Analysis (n=480)</p>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={thematicBurdenData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 900, fill: '#1e293b' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar name="Intensity" dataKey="current" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.1} strokeWidth={3} />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {thematicBurdenData.map((theme, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between hover:border-indigo-300 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{theme.subject}</h4>
                          <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-1.5 rounded">{theme.current}%</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 leading-tight mb-3">
                          <span className="text-indigo-600 font-black">Observation:</span> {theme.observation}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-[11px] font-black text-slate-800 leading-tight">
                          <span className="text-indigo-600 uppercase text-[9px]">Strategic Insight:</span> {theme.insight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methodology' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-slate-200">
              <h2 className="text-2xl font-black mb-8 text-slate-900 tracking-tighter uppercase italic">Phase 3 Strategic Framework</h2>
              <div className="space-y-12">
                <section>
                  <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2 mb-4">Strategic Objective</h3>
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <p className="text-slate-700 text-sm leading-relaxed font-bold italic">
                      "Leveraging multi-channel digital ethnography to decode the <span className="text-indigo-700 font-black underline decoration-indigo-300 underline-offset-4">juxtaposition</span> between successful clinical tumor clearance and the profound psychological trauma of surgical disfigurement. 
                      Our framework aims to quantify the hidden clinical burden of H&N BCC, optimizing Phase 3 communications to prioritize tissue-preservation as a primary value driver for patient-centric endpoints."
                    </p>
                  </div>
                </section>
                <section>
                  <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2 mb-4">Data Sources Included</h3>
                  <ul className="text-xs space-y-2 font-bold text-slate-600">
                    <li>• Reddit: r/DermatologyQuestions, r/Cancer, r/SkinCancer, r/CancerCaregivers, r/cancersurvivors</li>
                    <li>• Patient Testimony Sites: Cancer organisations, hospital blogs, survivorship pages</li>
                    <li>• YouTube: High-volume visual storytelling of Mohs surgeries, recovery vlogs</li>
                    <li>• Cancer Forums & Caregiver Communities</li>
                    <li>• Mainstream Media & Viral Patient Stories</li>
                  </ul>
                </section>
                <section className="pt-6">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center italic">
                    All findings synthesized via natural language processing and thematic qualitative coding (n=480)
                  </p>
                </section>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center border-t-2 border-slate-200 pt-10 pb-12">
          <p className="text-slate-400 text-[10px] tracking-[0.5em] uppercase font-black">
            Strictly Confidential | SDS Proprietary Intelligence | Clinical Evidence Unit
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;