'use client'

import { ArrowUpRight } from 'lucide-react'
import type { Choice } from '@/lib/scenarios'
import { formatPercent } from '@/lib/format'
import { cn } from '@/lib/utils'

type ChoiceButtonProps = {
  choice: Choice
  index: number
  state: 'idle' | 'selected' | 'dimmed' | 'revealed'
  disabled: boolean
  onSelect: () => void
}

export function ChoiceButton({ choice, index, state, disabled, onSelect }: ChoiceButtonProps) {
  const key = String.fromCharCode(65 + index)
  const returnPct = choice.multiplier - 1
  const isGain = returnPct > 0
  const isLoss = returnPct < 0
  const showResult = state === 'selected' || state === 'revealed'

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={state === 'selected'}
      className={cn(
        'group relative flex min-h-40 flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-secondary/60 p-5 text-left transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-profit focus-visible:ring-offset-2 focus-visible:ring-offset-card',
        !disabled && 'hover:-translate-y-1 hover:border-profit/60 hover:bg-secondary hover:shadow-[0_0_40px_-12px] hover:shadow-profit/50',
        state === 'idle' && 'border-border',
        state === 'selected' && isGain && 'border-profit bg-profit/10 shadow-[0_0_40px_-10px] shadow-profit/60',
        state === 'selected' && isLoss && 'border-loss bg-loss/10 shadow-[0_0_40px_-10px] shadow-loss/60',
        state === 'selected' && !isGain && !isLoss && 'border-foreground/40',
        state === 'dimmed' && 'border-border opacity-40',
        state === 'revealed' && 'border-border opacity-60',
        disabled && 'cursor-default',
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-lg border border-border bg-background font-mono text-sm font-semibold transition-colors',
            !disabled && 'group-hover:border-profit group-hover:text-profit',
          )}
        >
          {key}
        </span>
        {showResult && (
          <span
            className={cn(
              'animate-in fade-in zoom-in-90 rounded-md px-2 py-1 font-mono text-sm font-semibold tabular-nums duration-300',
              isGain && 'bg-profit/15 text-profit',
              isLoss && 'bg-loss/15 text-loss',
              !isGain && !isLoss && 'bg-muted text-muted-foreground',
            )}
          >
            {formatPercent(returnPct)}
          </span>
        )}
      </div>

      <div>
        <p className="flex items-center gap-1.5 text-lg font-semibold tracking-tight">
          {choice.action}
          {!disabled && (
            <ArrowUpRight
              className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-profit group-hover:opacity-100"
              aria-hidden="true"
            />
          )}
        </p>
      </div>
    </button>
  )
}
