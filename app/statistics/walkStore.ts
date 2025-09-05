export type WalkEntry = { date: string; amount: number }; // date i YYYY-MM-DD

const KEY = 'walks';

export function loadWalks(): WalkEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveWalk(entry: WalkEntry) {
  if (typeof window === 'undefined') return;
  const current = loadWalks();
  current.push(entry);
  localStorage.setItem(KEY, JSON.stringify(current));
  // Ping:a alla komponenter på sidan att datan uppdaterats
  window.dispatchEvent(new Event('walks-updated'));
}
