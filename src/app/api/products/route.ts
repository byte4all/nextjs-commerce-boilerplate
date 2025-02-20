import { NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');
  
  if (!idsParam) {
    return NextResponse.json([]);
  }

  const ids = idsParam.split(',').filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json([]);
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      manufacturer: true,
    },
  });

  return NextResponse.json(products);
}
