import React from 'react';

interface SortSelectorProps {
  sortOption: string,
  setSortOption: (value: string) => void
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortOption, setSortOption }) => {
  
  return (
    <select
      className="p-2 border rounded"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="stars">Sort by Stars</option>
      <option value="updated">Sort by Last Updated</option>
    </select>
  );
};

export default SortSelector;
