'use server';

import { db } from '@/prisma/db';

export async function saveWalk(data: {
  date: string;
  amount: number;
  text: string;
}) {
  await db.walk.create({
    data,
  });
}

export async function getWalks() {
  return await db.walk.findMany({});
}
