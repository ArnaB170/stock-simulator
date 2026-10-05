'use client'

import { useEffect, useState } from 'react'
import { type Choice, STARTING_BALANCE, scenarios } from '@/lib/scenarios'
import { NewsCard } from './news-card'
import { PortfolioPerformance } from './portfolio-performance'
import { ResultsCard } from './results-card'
import { TopBar } from './top-bar'
import { WelcomeCard, type PlayerInfo } from './welcome-card'

export function Simulator() {
  const [player, setPlayer] = useState<PlayerInfo | null>(null)

  const [index, setIndex] = useState(0)
  const [balance, setBalance] = useState(STARTING_BALANCE)
  const [history, setHistory] = useState<number[]>([STARTING_BALANCE])
  const [selected, setSelected] = useState<Choice | null>(null)
  const [lastDelta, setLastDelta] = useState(0)
  const [streak, setStreak] = useState(0)
  const [wins, setWins] = useState(0)
  const [finished, setFinished] = useState(false)

  const scenario = scenarios[index]
  const isLast = index === scenarios.length - 1
  const completedCount = finished ? scenarios.length : index + (selected ? 1 : 0)

  function handleSelect(choice: Choice) {
    if (selected) return
    const nextBalance = balance * choice.multiplier
    const delta = nextBalance - balance
    setSelected(choice)
    setLastDelta(delta)
    setBalance(nextBalance)
    setHistory((prev) => [...prev, nextBalance])
    if (choice.multiplier > 1) {
      setStreak((s) => s + 1)
      setWins((w) => w + 1)
    } else {
      setStreak(0)
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true)
      return
    }
    setSelected(null)
    setIndex((i) => i + 1)
  }

  function handleRestart() {
    setIndex(0)
    setBalance(STARTING_BALANCE)
    setHistory([STARTING_BALANCE])
    setSelected(null)
    setLastDelta(0)
    setStreak(0)
    setWins(0)
    setFinished(false)
    // Return to the welcome screen so the player can update their details
    setPlayer(null)
  }

  useEffect(() => {
    // Do not attach keyboard shortcuts while the WelcomeCard is shown.
    // Without this guard, typing 'a'/'b'/'c' into the form inputs would
    // silently auto-answer scenario 0 before the game even started.
    if (!player || finished || selected) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const choiceIndex = ['a', 'b', 'c'].indexOf(event.key.toLowerCase())
      if (choiceIndex === -1) return
      handleSelect(scenario.choices[choiceIndex])
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  // ── Gate: show welcome screen until player info is provided ───────
  if (!player) {
    return <WelcomeCard onStart={setPlayer} />
  }

  return (
    <div className="min-h-screen" data-portfolio-history={JSON.stringify(history)}>
      <TopBar
        balance={balance}
        scenarioNumber={index + 1}
        totalScenarios={scenarios.length}
        completedCount={completedCount}
        streak={streak}
      />
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        {finished ? (
          <ResultsCard
            balance={balance}
            wins={wins}
            total={scenarios.length}
            playerName={player.name}
            studentId={player.studentId}
            onRestart={handleRestart}
          />
        ) : (
          <NewsCard
            key={scenario.id}
            scenario={scenario}
            selected={selected}
            delta={lastDelta}
            isLast={isLast}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        )}
        {/* We are now passing the live history array into the chart */}
        <PortfolioPerformance history={history} />
      </main>
    </div>
  )
}