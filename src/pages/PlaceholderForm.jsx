import { useState } from 'react';

export default function PlaceholderForm({ placeholders, onSubmit }) {
  const [inputs, setInputs] = useState({});
  return (
    <form className="madlibs-form" onSubmit={e => {e.preventDefault(); onSubmit(inputs);}}>
      <h2>Fill in the blanks, silly!</h2>
      {placeholders.map(ph => (
        <div key={ph}>
          <label>
            {ph.charAt(0).toUpperCase() + ph.slice(1)}:
            <input
              required
              value={inputs[ph] || ''}
              onChange={e => setInputs(prev => ({ ...prev, [ph]: e.target.value }))}
              placeholder={ph}
            />
          </label>
        </div>
      ))}
      <button type="submit">See My Silly Story!</button>
    </form>
  );
} 