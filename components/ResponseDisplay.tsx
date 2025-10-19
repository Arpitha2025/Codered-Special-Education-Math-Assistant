
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { CustomizationSettings } from '../types';

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean;
  customization: CustomizationSettings;
  onCustomizationChange: (settings: CustomizationSettings) => void;
  selectedDisabilities: string[];
}

const ResponseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" /></svg>;

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading, customization, onCustomizationChange, selectedDisabilities }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));
      setVoices(englishVoices);
      if(englishVoices.length > 0) {
        setSelectedVoice(englishVoices[0].name);
      }
    };
    
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    }
  }, []);

  const handleSpeak = useCallback(() => {
    if (!response || !selectedVoice) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(response);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [response, selectedVoice, voices, rate]);
  
  const handleStop = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
  }

  const handleSettingChange = <K extends keyof CustomizationSettings,>(key: K, value: CustomizationSettings[K]) => {
    onCustomizationChange({ ...customization, [key]: value });
  };
  
  const getFontFamilyClass = () => {
      switch (customization.fontFamily) {
          case 'serif': return 'font-serif';
          case 'mono': return 'font-mono';
          default: return 'font-sans';
      }
  }

  const showCustomization = response && (selectedDisabilities.includes('Writing & Expression Support') || selectedDisabilities.includes('Vision & Screen-Reader Support') || selectedDisabilities.includes('Reading & Language Support'));


  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <h2 className="text-2xl font-bold text-sky-400 mb-4 flex items-center gap-3">
        <ResponseIcon /> 4. AI Generated Response
      </h2>
      
      {response && (
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><SpeakerIcon/> Text-to-Speech Controls</h3>
            <div className="flex flex-wrap items-center gap-4">
                <select 
                    value={selectedVoice || ''} 
                    onChange={e => setSelectedVoice(e.target.value)}
                    className="bg-slate-700 text-white p-2 rounded-md"
                >
                    {voices.map(voice => (
                        <option key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</option>
                    ))}
                </select>
                <div className="flex items-center gap-2">
                    <label htmlFor="rate">Speed: {rate.toFixed(1)}x</label>
                    <input type="range" id="rate" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} className="w-32"/>
                </div>
                <button onClick={handleSpeak} disabled={isSpeaking} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">Speak</button>
                <button onClick={handleStop} disabled={!isSpeaking} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">Stop</button>
            </div>
        </div>
      )}
      
      {showCustomization && (
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-4">
            <h3 className="text-lg font-semibold mb-2">Adjust Display</h3>
             <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                    <label>Font Size:</label>
                    <input type="range" min="0.8" max="2" step="0.1" value={customization.fontSize} onChange={e => handleSettingChange('fontSize', parseFloat(e.target.value))} className="w-32"/>
                </div>
                 <div className="flex items-center gap-2">
                    <label>Line Height:</label>
                    <input type="range" min="1.5" max="2.5" step="0.1" value={customization.lineHeight} onChange={e => handleSettingChange('lineHeight', parseFloat(e.target.value))} className="w-32"/>
                </div>
                <div className="flex items-center gap-2">
                    <label>Font Style:</label>
                     <select value={customization.fontFamily} onChange={e => handleSettingChange('fontFamily', e.target.value as CustomizationSettings['fontFamily'])} className="bg-slate-700 text-white p-2 rounded-md">
                        <option value="sans">Sans-Serif</option>
                        <option value="serif">Serif</option>
                        <option value="mono">Monospace</option>
                    </select>
                </div>
             </div>
        </div>
      )}

      <div 
        className={`min-h-[200px] bg-slate-900 p-6 rounded-lg whitespace-pre-wrap prose prose-invert prose-p:my-2 prose-headings:my-4 prose-ul:my-2 max-w-none transition-all duration-300 ${getFontFamilyClass()}`}
        style={{ fontSize: `${customization.fontSize}rem`, lineHeight: customization.lineHeight }}
      >
        {isLoading && <div className="text-slate-400 animate-pulse">Generating tailored response...</div>}
        {!isLoading && !response && <div className="text-slate-500">Your response will appear here.</div>}
        {response}
      </div>
    </div>
  );
};
