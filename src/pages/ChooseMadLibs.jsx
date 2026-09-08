import { useState } from 'react';
import '../css/ChooseMadLibs.css';
import madLibTemplates from './madLibTemplates';
import MadLibSelector from './MadLibSelector';
import PlaceholderForm from './PlaceholderForm';
import StoryResult from './StoryResult';
import { extractPlaceholders } from '../lib/story';

export default function ChooseMadLibs() {
  const [step, setStep] = useState('select');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [inputs, setInputs] = useState({});

  const template = selectedIdx !== null ? madLibTemplates[selectedIdx].template : '';
  const placeholders = extractPlaceholders(template);

  return (
    <div className="madlibs-app">
      <h1>SillyFillz</h1>
      {step === 'select' && (
        <MadLibSelector templates={madLibTemplates} onSelect={idx => { setSelectedIdx(idx); setStep('fill'); setInputs({}); }} />
      )}
      {step === 'fill' && (
        <PlaceholderForm placeholders={placeholders} onSubmit={vals => { setInputs(vals); setStep('result'); }} />
      )}
      {step === 'result' && (
        <StoryResult template={template} inputs={inputs} onTryAnother={() => { setStep('select'); setSelectedIdx(null); setInputs({}); }} />
      )}
    </div>
  );
} 