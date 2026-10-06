'use client'

import { useEffect } from 'react'
import { formatCurrency } from '@/lib/format'
import { STARTING_BALANCE } from '@/lib/scenarios'

type BriefingCardProps = {
  playerName: string
  onContinue: () => void
}

export function BriefingCard({ playerName, onContinue }: BriefingCardProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // Prevent form submissions or other unwanted default Enter behaviors
        e.preventDefault()
        onContinue()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onContinue])

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <article className="animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-10 text-center duration-500">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to the game, {playerName}!
        </h1>

        <div className="mt-8 rounded-xl border border-border bg-secondary/50 p-8 shadow-inner">
          <p className="text-xl font-medium text-foreground">
            You have{' '}
            <span className="font-mono font-bold text-profit">
              {formatCurrency(STARTING_BALANCE)}
            </span>{' '}
            in your account.
          </p>
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          Your goal is to read the breaking market news, make rapid trading decisions, and maximize your portfolio.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="animate-pulse text-sm font-semibold text-foreground">
            Press <kbd className="rounded-md border border-border bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">Enter</kbd> to start trading
          </p>
          
          <button
            onClick={onContinue}
            className="mt-2 w-full max-w-[200px] rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
          >
            Or click here
          </button>
        </div>
      </article>
    </div>
  )
}
