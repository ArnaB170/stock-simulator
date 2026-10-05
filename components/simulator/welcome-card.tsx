'use client'

import { useState } from 'react'
import { Activity } from 'lucide-react'

export type PlayerInfo = {
  name: string
  studentId: string
}

type WelcomeCardProps = {
  onStart: (player: PlayerInfo) => void
}

export function WelcomeCard({ onStart }: WelcomeCardProps) {
  const [name, setName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [errors, setErrors] = useState<{ name?: string; studentId?: string }>({})

  function validate() {
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Name is required.'
    if (!studentId.trim()) next.studentId = 'Student ID is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onStart({ name: name.trim(), studentId: studentId.trim() })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <article className="animate-in fade-in zoom-in-95 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-10 duration-500">
        {/* Logo / brand */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-profit text-background">
            <Activity className="size-7" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">MarketPulse</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your details to start trading
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="player-name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="player-name"
              type="text"
              autoComplete="given-name"
              placeholder="e.g. Jane Smith"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none ring-profit transition focus:border-profit focus:ring-1 aria-invalid:border-loss"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-loss">
                {errors.name}
              </p>
            )}
          </div>

          {/* Student ID */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="student-id" className="text-sm font-medium">
              Student ID
            </label>
            <input
              id="student-id"
              type="text"
              autoComplete="off"
              placeholder="e.g. S12345678"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value)
                if (errors.studentId) setErrors((prev) => ({ ...prev, studentId: undefined }))
              }}
              className="rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm outline-none ring-profit transition focus:border-profit focus:ring-1 aria-invalid:border-loss"
              aria-invalid={!!errors.studentId}
              aria-describedby={errors.studentId ? 'sid-error' : undefined}
            />
            {errors.studentId && (
              <p id="sid-error" className="text-xs text-loss">
                {errors.studentId}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-profit px-6 py-3 font-semibold text-background transition-all hover:brightness-110 hover:shadow-[0_0_30px_-6px] hover:shadow-profit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-profit focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            Start Simulation
          </button>
        </form>
      </article>
    </div>
  )
}
