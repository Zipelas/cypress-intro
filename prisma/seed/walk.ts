import { Walk } from '@/generated/prisma';
import { db } from '../db';

export async function seedWalks() {
  const mockedWalks: Walk[] = [
    {
      id: '68adb30b0c2c50f13d0a64e9',
      date: new Date('2023-01-01'),
      amount: 1000,
      text: '{"test": "data"}',
    },
    {
      id: '68adb30b0c2c50f13d0a64ea',
      date: new Date('2023-01-02'),
      amount: 2000,
      text: '{"test": "data"}',
    },
    {
      id: '68adb30b0c2c50f13d0a64eb',
      date: new Date('2023-01-03'),
      amount: 3000,
      text: '{"test": "data"}',
    },
    {
      id: '68adb30b0c2c50f13d0a64ec',
      date: new Date('2023-02-01'),
      amount: 4000,
      text: '{"test": "data"}',
    },
  ];

  for (const { id, ...walk } of mockedWalks) {
    await db.walk.upsert({
      where: { id },
      update: walk,
      create: { id, ...walk },
    });
  }
}
