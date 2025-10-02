'use server';

import { db } from '@/prisma/db';
import { revalidatePath } from 'next/cache';

export async function saveWalk(data: {
  date: string;
  amount: number;
  text: string;
}) {
  await db.walk.create({
    data: {
      date: new Date(data.date + 'T00:00:00'),
      amount: data.amount,
      text: data.text,
    },
  });
  revalidatePath('/');
}

export async function deleteWalk(id: string) {
  await db.walk.delete({
    where: { id },
  });
  revalidatePath('/');
}

export async function getWalks() {
  return await db.walk.findMany({});
}
