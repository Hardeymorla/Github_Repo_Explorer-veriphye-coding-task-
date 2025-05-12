import React from 'react';

interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ value, onChange }) => {
  return (
    <select
      className="p-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="All">All Languages</option>
      <option value="JavaScript">JavaScript</option>
      <option value="Python">Python</option>
      <option value="TypeScript">TypeScript</option>
      <option value="HTML">HTML</option>
      <option value="CSS">CSS</option>
    </select>
  );
};

export default LanguageFilter;
