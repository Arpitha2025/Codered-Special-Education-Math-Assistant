
import React, { useCallback } from 'react';
import { DISABILITY_PROFILES } from '../constants';
import type { DisabilityProfile } from '../types';

interface DisabilitySelectorProps {
  selectedDisabilities: string[];
  onSelectionChange: (selected: string[]) => void;
}

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const ProfileOption: React.FC<{ profile: DisabilityProfile, isSelected: boolean, onChange: (id: string) => void }> = ({ profile, isSelected, onChange }) => {
    return (
        <label className={`
            p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4
            ${isSelected ? 'bg-sky-900/50 border-sky-500 ring-2 ring-sky-500' : 'bg-slate-800 border-slate-700 hover:border-sky-600'}
        `}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onChange(profile.id)}
                className="mt-1 h-5 w-5 rounded border-slate-500 bg-slate-700 text-sky-500 focus:ring-sky-500"
            />
            <div>
                <h4 className="font-semibold text-white">{profile.title}</h4>
                <p className="text-sm text-slate-400">{profile.description}</p>
            </div>
        </label>
    );
};


export const DisabilitySelector: React.FC<DisabilitySelectorProps> = ({ selectedDisabilities, onSelectionChange }) => {
    
  const handleCheckboxChange = useCallback((id: string) => {
    let newSelection;
    const isStandard = id === 'Standard';
    const wasStandardSelected = selectedDisabilities.includes('Standard');

    if (isStandard) {
        newSelection = ['Standard'];
    } else {
        const currentlySelected = selectedDisabilities.filter(d => d !== 'Standard');
        if (currentlySelected.includes(id)) {
            newSelection = currentlySelected.filter(d => d !== id);
        } else {
            newSelection = [...currentlySelected, id];
        }
        if (newSelection.length === 0) {
            newSelection = ['Standard'];
        }
    }
    
    onSelectionChange(newSelection);

  }, [selectedDisabilities, onSelectionChange]);


  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <h2 className="text-2xl font-bold text-sky-400 mb-4 flex items-center gap-3">
        <ProfileIcon/> 2. Choose Your Learning Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DISABILITY_PROFILES.map(profile => (
          <ProfileOption
            key={profile.id}
            profile={profile}
            isSelected={selectedDisabilities.includes(profile.id)}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <p className="text-sm text-slate-500 mt-3">Selecting any profile will deselect "Standard Mode". If all others are deselected, "Standard Mode" is re-enabled.</p>
    </div>
  );
};
