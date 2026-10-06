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
    headline: "🚨 BREAKING: Major tech giant reports record-breaking quarterly profits — earnings per share doubled expectations!",
    context: "The company's new AI product line drove a massive revenue surge. Investors are buzzing. What do you do with your shares?",
    choices: [
      { action: "Buy more shares immediately to ride the momentum", multiplier: 0.88 },
      { action: "Hold your current shares and wait to see if it sustains", multiplier: 1.15 },
      { action: "Sell now to lock in profits before a potential correction", multiplier: 0.92 }
    ]
  },
  {
    id: 2,
    headline: "🚨 BREAKING: Central bank raises interest rates by 0.75% — highest hike in 20 years!",
    context: "The Federal Reserve cites runaway inflation. Higher rates make borrowing expensive and growth stocks look less attractive.",
    choices: [
      { action: "Rotate into growth tech stocks — buy the dip", multiplier: 0.78 },
      { action: "Shift portfolio into dividend-paying utility and bank stocks", multiplier: 1.09 },
      { action: "Move funds into bonds and cash equivalents", multiplier: 0.95 }
    ]
  },
  {
    id: 3,
    headline: "🚨 BREAKING: Popular electric vehicle company CEO suddenly resigns amid fraud investigation!",
    context: "Shares have already dropped 12% in pre-market trading. Regulators have opened an inquiry into accounting practices.",
    choices: [
      { action: "Buy more shares — this is an overreaction and a bargain", multiplier: 0.75 },
      { action: "Sell all shares immediately to cut your losses", multiplier: 1.11 },
      { action: "Hold and wait for official investigation results", multiplier: 0.82 }
    ]
  },
  {
    id: 4,
    headline: "🚨 BREAKING: Global oil supply chain disrupted — crude oil prices spike 30% overnight!",
    context: "A geopolitical conflict has blocked a critical shipping route. Energy stocks are surging while airlines and logistics companies plummet.",
    choices: [
      { action: "Buy into oil and energy sector stocks immediately", multiplier: 1.20 },
      { action: "Short-sell airline and shipping company stocks", multiplier: 0.83 },
      { action: "Do nothing — geopolitical events are too unpredictable to trade", multiplier: 0.90 }
    ]
  },
  {
    id: 5,
    headline: "🚨 BREAKING: Government approves landmark $500 billion infrastructure spending bill!",
    context: "Funds will be directed toward roads, bridges, broadband, and clean energy. Construction and materials companies are expected to boom.",
    choices: [
      { action: "Invest in construction, steel, and cement company stocks", multiplier: 1.17 },
      { action: "Buy into renewable energy and broadband infrastructure ETFs", multiplier: 0.87 },
      { action: "Wait — government projects often face delays and cost overruns", multiplier: 0.80 }
    ]
  },
  {
    id: 6,
    headline: "🚨 BREAKING: A new pharmaceutical company announces 95% effective cure for a widespread chronic disease!",
    context: "Clinical trial results just dropped. The stock has surged 80% today alone. FDA fast-track approval is expected within months.",
    choices: [
      { action: "Buy shares now before FDA approval drives the price even higher", multiplier: 0.70 },
      { action: "Wait for FDA approval before investing — trials can still fail", multiplier: 1.18 },
      { action: "Short-sell rival pharmaceutical companies whose drugs are now obsolete", multiplier: 0.85 }
    ]
  },
  {
    id: 7,
    headline: "🚨 BREAKING: Widespread cyberattack cripples the world's largest retail chain — millions of customer records stolen!",
    context: "The retailer's systems are offline. Customers are fleeing. Meanwhile, cybersecurity firms are receiving a flood of new business inquiries.",
    choices: [
      { action: "Sell all retail sector holdings immediately", multiplier: 0.91 },
      { action: "Buy into leading cybersecurity company stocks", multiplier: 1.22 },
      { action: "Buy the dip on the retail company — they'll recover eventually", multiplier: 0.72 }
    ]
  },
  {
    id: 8,
    headline: "🚨 BREAKING: World's most popular social media app banned in 3 major countries over privacy violations!",
    context: "Regulators in the EU, India, and Brazil have pulled the plug. The company loses access to over 800 million users overnight. Stock is in freefall.",
    choices: [
      { action: "Buy the dip — bans are temporary and will be reversed soon", multiplier: 0.74 },
      { action: "Sell immediately and move funds into a competitor's stock", multiplier: 1.19 },
      { action: "Hold your shares and trust the company's legal team to fight back", multiplier: 0.86 }
    ]
  },
  {
    id: 9,
    headline: "🚨 BREAKING: Unemployment rate hits a 15-year LOW — economy adds 500,000 jobs in a single month!",
    context: "Consumer spending is surging. People have money in their pockets. Retail, travel, and entertainment sectors are seeing record foot traffic.",
    choices: [
      { action: "Invest in consumer spending stocks — retail, travel, and restaurants", multiplier: 1.21 },
      { action: "Pull out of the stock market — a booming economy always crashes next", multiplier: 0.81 },
      { action: "Put everything into gold as a safe haven asset", multiplier: 0.89 }
    ]
  },
  {
    id: 10,
    headline: "🚨 BREAKING: A major cryptocurrency exchange collapses — billions in customer funds are frozen!",
    context: "The exchange filed for bankruptcy after a liquidity crisis. Crypto markets are in panic mode. Bitcoin drops 40% in 24 hours. Traditional banks are reporting a surge in new account openings.",
    choices: [
      { action: "Buy Bitcoin and crypto now — this is the lowest price ever!", multiplier: 0.65 },
      { action: "Invest in traditional banking stocks benefiting from the crypto exodus", multiplier: 1.23 },
      { action: "Buy shares in the collapsed exchange — assets will be recovered in court", multiplier: 0.60 }
    ]
  }
]
