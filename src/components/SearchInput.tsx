import React from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search",
  value,
  onChange,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-border focus-visible:outline-hidden flex w-full border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 h-full rounded-sm pl-7 text-xs shadow-none"
      />
    </div>
  );
};

export default SearchInput;
