import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { StarRating } from "~/app/_components/StarRating";
import { QuantitySelector } from "~/app/_components/QuantitySelector";
import { ReviewCard } from "~/app/_components/ReviewCard";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: {
      ratings: true,
    },
  });

  if (!product) {
    notFound();
  }

  const averageRating = 
    product.ratings.reduce((acc, rating) => acc + rating.score, 0) / 
    product.ratings.length;

  return (
    <main className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Product Details Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Container */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <StarRating rating={averageRating} showScore />
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <QuantitySelector />
              </div>
            </div>

            {/* Right Container - Image */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-[40vh]">
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {product.ratings.map((rating) => (
              <ReviewCard key={rating.id} review={rating} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
