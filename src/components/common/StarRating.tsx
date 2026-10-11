import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewsCount, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`flex items-center gap-1.5 ${textSize}`}>
      <div className="flex items-center text-amber-500">
        <Star className={`${iconSize} fill-amber-400 stroke-amber-500`} />
      </div>
      <span className="font-semibold text-slate-800 tabular-nums">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && (
        <span className="text-slate-500 tabular-nums">({reviewsCount} reviews)</span>
      )}
    </div>
  );
};
