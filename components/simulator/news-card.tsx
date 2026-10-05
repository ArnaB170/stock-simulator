'use client'

import { ArrowRight, Newspaper, RotateCcw } from 'lucide-react'
import type { Choice, Scenario } from '@/lib/scenarios'
import { formatPercent, formatSignedCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import { ChoiceButton } from './choice-button'

type NewsCardProps = {
  scenario: Scenario
  selected: Choice | null
  delta: number
  isLast: boolean
  onSelect: (choice: Choice) => void
  onNext: () => void
}

export function NewsCard({ scenario, selected, delta, isLast, onSelect, onNext }: NewsCardProps) {
  const isGain = selected ? selected.multiplier > 1 : false
  const isLoss = selected ? selected.multiplier < 1 : false

  return (
    <article
      key={scenario.id}
      className="animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden rounded-2xl border border-border bg-card p-8 duration-500"
    >
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-2/3 -translate-x-1/2 rounded-full bg-profit/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-loss/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-loss">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-loss opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-loss" />
            </span>
            Breaking News
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Newspaper className="size-3.5" aria-hidden="true" />
              Market Wire
            </span>
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-foreground">
              Scenario {scenario.id}
            </span>
          </div>
        </div>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight">
          {scenario.headline}
        </h1>
        <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
          {scenario.context}
        </p>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {selected ? 'Market Outcome' : 'What’s your move?'}
          </h2>
          {!selected && <p className="text-xs text-muted-foreground">Press A, B, or C</p>}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-4">
          {scenario.choices.map((choice, index) => (
            <ChoiceButton
              key={`${scenario.id}-${choice.action}`}
              choice={choice}
              index={index}
              disabled={selected !== null}
              state={!selected ? 'idle' : selected.action === choice.action ? 'selected' : 'revealed'}
              onSelect={() => onSelect(choice)}
            />
          ))}
        </div>

        {selected && (
          <div
            role="status"
            className={cn(
              'animate-in fade-in slide-in-from-bottom-2 mt-6 flex items-center justify-between gap-6 rounded-xl border p-5 duration-500',
              isGain && 'border-profit/40 bg-profit/5',
              isLoss && 'border-loss/40 bg-loss/5',
              !isGain && !isLoss && 'border-border bg-secondary/50',
            )}
          >
            <div className="flex items-center gap-5">
              <p
                className={cn(
                  'font-mono text-3xl font-bold tabular-nums',
                  isGain && 'text-profit',
                  isLoss && 'text-loss',
                  !isGain && !isLoss && 'text-muted-foreground',
                )}
              >
                {formatSignedCurrency(delta)}
              </p>
              <div>
                <p className="font-medium">
                  {isGain ? 'Nice call!' : isLoss ? 'Tough break.' : 'Steady hands.'}{' '}
                  <span className="font-mono text-sm text-muted-foreground">
                    {formatPercent(selected.multiplier - 1)}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">{selected.action}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onNext}
              autoFocus
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-profit px-6 py-3 font-semibold text-background transition-all hover:brightness-110 hover:shadow-[0_0_30px_-6px] hover:shadow-profit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-profit focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              {isLast ? (
                <>
                  See Results <RotateCcw className="size-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  Next Scenario <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
