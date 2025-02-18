import { Rating } from "@prisma/client";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  review: Rating;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const isGoodReview = review.score > 2.5;

  return (
    <div 
      className={`p-4 rounded-lg bg-white min-w-[300px] ${
        isGoodReview 
          ? "shadow-[0_0_15px_rgba(0,255,0,0.1)]" 
          : "shadow-[0_0_15px_rgba(255,0,0,0.1)]"
      }`}
    >
      <StarRating rating={review.score} showScore className="mb-2" />
      <p className="text-gray-600 text-sm">{review.description}</p>
    </div>
  );
}
