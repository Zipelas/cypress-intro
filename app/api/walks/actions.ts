"use server";

import { db } from "@/prisma/db";

export async function saveWalk(data: { date: string; amount: number }) {
  await db.walk.create({
    data,
  });
}