import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showScore?: boolean;
  className?: string;
}

export function StarRating({ rating, showScore = false, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= rating
              ? "fill-cyan-500 text-cyan-500"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      {showScore && <span className="text-sm text-gray-500 ml-1">({rating}/5)</span>}
    </div>
  );
}
