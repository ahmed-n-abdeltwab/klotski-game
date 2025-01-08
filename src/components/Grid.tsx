import React from 'react';

export function Grid() {
  return (
    <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 gap-0.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200/30 rounded-sm"
        />
      ))}
    </div>
  );
}