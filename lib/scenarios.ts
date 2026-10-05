export type Choice = {
  action: string
  multiplier: number
}

export type Scenario = {
  id: number
  headline: string
  context: string
  choices: Choice[]
}

export const STARTING_BALANCE = 10_000

export const scenarios: Scenario[] = [
  {
    id: 1,
    headline:
      '🚨 BREAKING: Major tech giant reports record-breaking quarterly profits — earnings per share doubled expectations!',
    context:
      "The company's new AI product line drove a massive revenue surge. Investors are buzzing. What do you do with your shares?",
    choices: [
      { action: 'Buy more shares immediately', multiplier: 1.18 },
      { action: 'Hold your current shares', multiplier: 1.07 },
      { action: 'Sell now to lock in profits', multiplier: 1.05 },
    ],
  },
  {
    id: 2,
    headline: '🚨 BREAKING: Central bank raises interest rates by 0.75% — highest hike in 20 years!',
    context:
      'The Federal Reserve cites runaway inflation. Higher rates make borrowing expensive and growth stocks look less attractive.',
    choices: [
      { action: 'Rotate into growth tech stocks', multiplier: 0.86 },
      { action: 'Shift into dividend-paying utilities', multiplier: 1.09 },
      { action: 'Move funds into bonds', multiplier: 1.03 },
    ],
  },
  {
    id: 3,
    headline: '🚨 BREAKING: Popular electric vehicle company CEO suddenly resigns amid fraud investigation!',
    context:
      'Shares have already dropped 12% in pre-market trading. Regulators have opened an inquiry into accounting practices.',
    choices: [
      { action: 'Buy more shares — bargain', multiplier: 0.8 },
      { action: 'Sell all shares immediately', multiplier: 1.11 },
      { action: 'Hold and wait', multiplier: 0.94 },
    ],
  },
  {
    id: 4,
    headline: '🚨 BREAKING: Global oil supply chain disrupted — crude oil prices spike 30% overnight!',
    context:
      'A geopolitical conflict has blocked a critical shipping route. Energy stocks are surging while airlines plummet.',
    choices: [
      { action: 'Buy into oil and energy', multiplier: 1.22 },
      { action: 'Short-sell airlines', multiplier: 1.15 },
      { action: 'Do nothing', multiplier: 1.01 },
    ],
  },
  {
    id: 5,
    headline: '🚨 BREAKING: Government approves landmark $500 billion infrastructure spending bill!',
    context:
      'Funds will be directed toward roads, bridges, and clean energy. Construction companies are expected to boom.',
    choices: [
      { action: 'Invest in construction', multiplier: 1.17 },
      { action: 'Buy into renewable energy', multiplier: 1.13 },
      { action: 'Wait', multiplier: 1.02 },
    ],
  },
  {
    id: 6,
    headline:
      '🚨 BREAKING: A new pharmaceutical company announces 95% effective cure for a widespread chronic disease!',
    context:
      'Clinical trial results just dropped. The stock has surged 80% today alone. FDA fast-track approval is expected.',
    choices: [
      { action: 'Buy shares now', multiplier: 1.25 },
      { action: 'Wait for FDA approval', multiplier: 1.1 },
      { action: 'Short-sell rivals', multiplier: 1.19 },
    ],
  },
  {
    id: 7,
    headline: "🚨 BREAKING: Widespread cyberattack cripples the world's largest retail chain!",
    context:
      "The retailer's systems are offline. Meanwhile, cybersecurity firms are receiving a flood of new business inquiries.",
    choices: [
      { action: 'Sell all retail holdings', multiplier: 1.12 },
      { action: 'Buy cybersecurity stocks', multiplier: 1.21 },
      { action: 'Buy the dip on retail', multiplier: 0.84 },
    ],
  },
]
