'use client';

import { useEffect, useMemo, useState } from 'react';
import { deleteWalk, getWalks } from '../api/walks/actions';
import Dropdown from './dropdown';
import InfoCard from './infocard';

export default function StatsForm() {
  const [choice, setChoice] = useState<'' | 'avg' | 'monthly' | 'yearly'>('');
  const [selectedWalkId, setSelectedWalkId] = useState<string | null>(null);
  const [walks, setWalks] = useState<
    { id: string; date: string; amount: number; text: string }[]
  >([]);

  const handleDelete = async (id: string) => {
    await deleteWalk(id);
    setWalks((prev) => prev.filter((w) => w.id !== id));
    // If we deleted the selected walk, clear selection
    if (selectedWalkId === id) {
      setSelectedWalkId(null);
      setChoice('');
    }
  };

  useEffect(() => {
    const refresh = async () => {
      const data = await getWalks();
      setWalks(
        data.map((walk) => ({
          ...walk,
          date:
            typeof walk.date === 'string'
              ? walk.date
              : walk.date.toISOString().slice(0, 10),
        }))
      );
    };
    refresh();

    window.addEventListener('walks-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('walks-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const { avgPerWalk, totalThisMonth, totalThisYear, count } = useMemo(() => {
    // Only calculate stats for the selected walk's user
    if (!selectedWalkId) {
      return {
        avgPerWalk: 0,
        totalThisMonth: 0,
        totalThisYear: 0,
        count: 0,
      };
    }

    const selectedWalk = walks.find((w) => w.id === selectedWalkId);
    if (!selectedWalk) {
      return {
        avgPerWalk: 0,
        totalThisMonth: 0,
        totalThisYear: 0,
        count: 0,
      };
    }

    // Find ALL walks from the same user (same text/name)
    const userWalks = walks.filter((w) => w.text === selectedWalk.text);

    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();

    let total = 0;
    let monthTotal = 0;
    let yearTotal = 0;

    for (const walk of userWalks) {
      const walkDate = new Date(walk.date + 'T00:00:00');
      total += walk.amount;

      const isThisMonth =
        walkDate.getFullYear() === y && walkDate.getMonth() === m;
      const isThisYear = walkDate.getFullYear() === y;

      if (isThisMonth) monthTotal += walk.amount;
      if (isThisYear) yearTotal += walk.amount;
    }

    const avg = userWalks.length ? total / userWalks.length : 0;

    return {
      avgPerWalk: avg,
      totalThisMonth: monthTotal,
      totalThisYear: yearTotal,
      count: userWalks.length,
    };
  }, [walks, selectedWalkId]);

  // Function to get unique users (no duplicates)
  const getUniqueUsers = () => {
    const uniqueUsers = [];
    const seenNames = new Set();

    for (const walk of walks) {
      if (!seenNames.has(walk.text) && walk.text.trim() !== '') {
        seenNames.add(walk.text);
        uniqueUsers.push({
          name: walk.text,
          // Use the first walk with this name for the ID (for selection tracking)
          sampleWalkId: walk.id,
        });
      }
    }

    return uniqueUsers;
  };

  const uniqueUsers = getUniqueUsers();

  return (
    <div className='p-4 space-y-4 rounded-xl border'>
      <h2 className='text-sm font-semibold'>Välj statistik</h2>
      {!selectedWalkId && (
        <p className='text-sm text-gray-600'>
          Klicka på en användare för att se deras statistik
        </p>
      )}
      <ul className='flex flex-row gap-4 flex-wrap justify-center mt-6'>
        {uniqueUsers.map((user) => {
          // Check if this user is selected (any of their walks is selected)
          const selectedUserWalks = walks.filter((w) => w.text === user.name);
          const isUserSelected = selectedUserWalks.some(
            (w) => w.id === selectedWalkId
          );

          return (
            <li key={user.name} className='flex items-center gap-2'>
              <button
                onClick={() => setSelectedWalkId(user.sampleWalkId)}
                className={`p-2 rounded border ${
                  isUserSelected
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-sky-600 border-sky-600 hover:bg-sky-50'
                }`}>
                {user.name} ({selectedUserWalks.length})
              </button>
              <button
                onClick={() => {
                  // Delete all walks for this user
                  selectedUserWalks.forEach((walk) => handleDelete(walk.id));
                }}
                title={`Ta bort alla ${user.name}s promenader`}>
                ❌
              </button>
            </li>
          );
        })}
      </ul>

      <Dropdown
        value={choice}
        disabled={!selectedWalkId}
        onChange={(v) => setChoice(v as '' | 'avg' | 'monthly' | 'yearly')}>
        <option value=''>Välj ett alternativ</option>
        <option value='avg'>Gått i snitt</option>
        <option value='monthly'>Gått varje månad</option>
        <option value='yearly'>Gått totalt per år</option>
      </Dropdown>

      <InfoCard
        choice={choice}
        avgPerWalk={avgPerWalk}
        totalThisMonth={totalThisMonth}
        totalThisYear={totalThisYear}
        count={count}
      />
    </div>
  );
}
