'use client'

import { useEffect, useRef, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { RotateCcw, Trophy } from 'lucide-react'
import { db } from '@/lib/firebase'
import { formatCurrency, formatPercent, formatSignedCurrency } from '@/lib/format'
import { STARTING_BALANCE } from '@/lib/scenarios'
import { cn } from '@/lib/utils'
import { Leaderboard } from './leaderboard'

type ResultsCardProps = {
  balance: number
  wins: number
  total: number
  playerName: string
  studentId: string
  onRestart: () => void
}

function getRank(pct: number) {
  if (pct >= 0.4) return 'Market Wizard'
  if (pct >= 0.2) return 'Bull Runner'
  if (pct >= 0) return 'Steady Investor'
  if (pct >= -0.2) return 'Bag Holder'
  return 'Paper Hands'
}

type SaveStatus = 'saving' | 'saved-new' | 'saved-kept' | 'error' | null

/**
 * Saves the player's score to the "leaderboard" Firestore collection using
 * their Student ID as the document ID. Only overwrites if the new balance
 * is strictly higher than the stored high score.
 */
async function saveScore(
  studentId: string,
  name: string,
  balance: number,
): Promise<'saved-new' | 'saved-kept'> {
  const ref = doc(db, 'leaderboard', studentId)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    const existing = snap.data().highScore as number
    if (balance <= existing) {
      // Current score is not better — keep existing record
      return 'saved-kept'
    }
  }

  // New player or new personal best — write to Firestore
  await setDoc(ref, {
    name,
    highScore: balance,
    updatedAt: new Date().toISOString(),
  })
  return 'saved-new'
}

export function ResultsCard({
  balance,
  wins,
  total,
  playerName,
  studentId,
  onRestart,
}: ResultsCardProps) {
  const change = balance - STARTING_BALANCE
  const pct = change / STARTING_BALANCE
  const isUp = change >= 0

  const [saveStatus, setSaveStatus] = useState<SaveStatus>(null)
  const hasSaved = useRef(false)

  useEffect(() => {
    // Guard: only fire the save once per game session
    if (hasSaved.current) return
    hasSaved.current = true

    setSaveStatus('saving')
    saveScore(studentId, playerName, balance)
      .then((result) => setSaveStatus(result))
      .catch((err) => {
        console.error('Failed to save score:', err)
        setSaveStatus('error')
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveLabel =
    saveStatus === 'saving'
      ? '⏳ Saving your score…'
      : saveStatus === 'saved-new'
        ? '✅ New personal best saved!'
        : saveStatus === 'saved-kept'
          ? '📊 Previous high score kept (this run was lower).'
          : saveStatus === 'error'
            ? '⚠️ Could not save score — check Firebase config.'
            : null

  return (
    <div className="flex flex-col gap-6">
      {/* ── Results summary card ─────────────────────────────────────── */}
      <article className="animate-in fade-in zoom-in-95 relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center duration-500">
        <div
          className={cn(
            'pointer-events-none absolute -top-32 left-1/2 h-64 w-2/3 -translate-x-1/2 rounded-full blur-3xl',
            isUp ? 'bg-profit/15' : 'bg-loss/15',
          )}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              'flex size-14 items-center justify-center rounded-2xl',
              isUp ? 'bg-profit/15 text-profit' : 'bg-loss/15 text-loss',
            )}
          >
            <Trophy className="size-7" aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Simulation Complete
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Well played,{' '}
            <span className="font-semibold text-foreground">{playerName}</span>!
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{getRank(pct)}</h1>

          <dl className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Final Balance</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">{formatCurrency(balance)}</dd>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Total Return</dt>
              <dd className={cn('mt-1 font-mono text-xl font-semibold tabular-nums', isUp ? 'text-profit' : 'text-loss')}>
                {formatSignedCurrency(change)}
                <span className="block text-sm">{formatPercent(pct)}</span>
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Winning Trades</dt>
              <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">
                {wins}/{total}
              </dd>
            </div>
          </dl>

          {/* Save status indicator */}
          {saveLabel && (
            <p className="mt-4 text-xs text-muted-foreground">{saveLabel}</p>
          )}

          <button
            type="button"
            onClick={onRestart}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-profit px-6 py-3 font-semibold text-background transition-all hover:brightness-110 hover:shadow-[0_0_30px_-6px] hover:shadow-profit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-profit focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Play Again
          </button>
        </div>
      </article>

      {/* ── Live leaderboard ─────────────────────────────────────────── */}
      <Leaderboard />
    </div>
  )
}
