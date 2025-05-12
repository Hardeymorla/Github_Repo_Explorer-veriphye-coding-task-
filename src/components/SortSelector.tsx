import React from 'react';

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      className="p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="stars">Sort by Stars</option>
      <option value="updated">Sort by Last Updated</option>
    </select>
  );
};

export default SortSelector;
