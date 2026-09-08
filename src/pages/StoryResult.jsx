import { fillTemplate } from '../lib/story';

export default function StoryResult({ template, inputs, onTryAnother }) {
  const result = fillTemplate(template, inputs);
  return (
    <div className="madlibs-result">
      <h2>Your Mad Libs Story</h2>
      <p className="madlibs-story-text">{result}</p>
      <button onClick={onTryAnother}>Try Another</button>
    </div>
  );
} 