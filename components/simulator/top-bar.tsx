'use client'

import { Activity, Flame, TrendingDown, TrendingUp } from 'lucide-react'
import { useAnimatedNumber } from '@/hooks/use-animated-number'
import { formatCurrency, formatPercent, formatSignedCurrency } from '@/lib/format'
import { STARTING_BALANCE } from '@/lib/scenarios'
import { cn } from '@/lib/utils'

type TopBarProps = {
  balance: number
  scenarioNumber: number
  totalScenarios: number
  completedCount: number
  streak: number
}

export function TopBar({ balance, scenarioNumber, totalScenarios, completedCount, streak }: TopBarProps) {
  const animatedBalance = useAnimatedNumber(balance)
  const change = balance - STARTING_BALANCE
  const changePct = change / STARTING_BALANCE
  const isUp = change >= 0

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-profit text-background">
            <Activity className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold tracking-tight">MarketPulse</p>
            <p className="text-xs text-muted-foreground">Trading Simulator</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <Flame
              className={cn('size-4', streak > 0 ? 'text-warning' : 'text-muted-foreground')}
              aria-hidden="true"
            />
            <span className="font-mono text-sm tabular-nums">{streak}</span>
            <span className="text-xs text-muted-foreground">win streak</span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Scenario{' '}
              <span className="font-mono text-foreground">
                {scenarioNumber}/{totalScenarios}
              </span>
            </p>
            <div className="flex gap-1" aria-hidden="true">
              {Array.from({ length: totalScenarios }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 w-6 rounded-full transition-colors duration-500',
                    i < completedCount
                      ? 'bg-profit'
                      : i === scenarioNumber - 1
                        ? 'bg-foreground/60'
                        : 'bg-muted',
                  )}
                />
              ))}
            </div>
          </div>

          <div className="h-10 w-px bg-border" aria-hidden="true" />

          <div className="flex flex-col items-end">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Portfolio Balance
            </p>
            <div className="flex items-baseline gap-3">
              <p className="font-mono text-2xl font-semibold tabular-nums" aria-live="polite">
                {formatCurrency(animatedBalance)}
              </p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-xs font-medium tabular-nums',
                  isUp ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss',
                )}
              >
                {isUp ? (
                  <TrendingUp className="size-3" aria-hidden="true" />
                ) : (
                  <TrendingDown className="size-3" aria-hidden="true" />
                )}
                {formatSignedCurrency(change)} ({formatPercent(changePct)})
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
