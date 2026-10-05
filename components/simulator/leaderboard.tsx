'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { formatCurrency } from '@/lib/format'

type LeaderboardEntry = {
  rank: number
  name: string
  studentId: string
  highScore: number
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const q = query(
          collection(db, 'leaderboard'),
          orderBy('highScore', 'desc'),
          limit(10),
        )
        const snapshot = await getDocs(q)
        const data: LeaderboardEntry[] = snapshot.docs.map((doc, i) => ({
          rank: i + 1,
          name: doc.data().name as string,
          studentId: doc.id,
          highScore: doc.data().highScore as number,
        }))
        setEntries(data)
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err)
        setError('Could not load leaderboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-border bg-card p-6 duration-500">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        🏆 Global Leaderboard — Top 10
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-muted-foreground animate-pulse">Loading…</span>
        </div>
      )}

      {error && (
        <p className="py-4 text-center text-sm text-loss">{error}</p>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No scores yet — be the first!
        </p>
      )}

      {!loading && !error && entries.length > 0 && (
        <ol className="flex flex-col divide-y divide-border">
          {entries.map((entry) => (
            <li
              key={entry.studentId}
              className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
            >
              {/* Rank badge */}
              <span
                className={
                  entry.rank === 1
                    ? 'flex size-7 items-center justify-center rounded-full bg-warning/20 font-mono text-xs font-bold text-warning'
                    : entry.rank === 2
                      ? 'flex size-7 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-foreground'
                      : entry.rank === 3
                        ? 'flex size-7 items-center justify-center rounded-full bg-orange-500/15 font-mono text-xs font-bold text-orange-400'
                        : 'flex size-7 items-center justify-center font-mono text-xs font-medium text-muted-foreground'
                }
              >
                {entry.rank}
              </span>

              {/* Name */}
              <span className="flex-1 truncate text-sm font-medium">{entry.name}</span>

              {/* Score */}
              <span className="font-mono text-sm font-semibold tabular-nums text-profit">
                {formatCurrency(entry.highScore)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
