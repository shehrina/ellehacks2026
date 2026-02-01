# Coinquest 🪙

**Save it. Spend it. See it.**

Coinquest is an AR-powered financial literacy game that teaches kids (ages 6-12) about money through immersive, hands-on experiences. Instead of reading about saving vs. spending, kids *see* the consequences of their choices appear in their real-world space through augmented reality.

---

## The Problem

Financial literacy is rarely taught in schools, and when it is, it's boring. Kids learn about money through worksheets and lectures—not through experience. By the time they're adults, they've already developed poor money habits.

**The result?** 76% of millennials lack basic financial literacy skills (National Financial Educators Council).

## Our Solution

Coinquest makes money decisions *tangible*. Kids earn virtual coins by completing interactive quests that teach core financial concepts. Then they spend those coins to buy furniture for their AR room—and immediately see the tradeoff.

**Want to buy candy now?** Your savings goal gets further away.
**Saved up for the armchair?** Watch it appear in your actual bedroom through AR.

This instant, visual feedback loop teaches what hours of lectures cannot: every money decision has a consequence you can *see*.

### Why AR?

Research shows that immersive, experiential learning dramatically outperforms traditional methods:

| Metric | Impact |
|--------|--------|
| **75% better information retention** | AR engages multiple senses, making lessons stick |
| **50% boost in focus** | Interactive experiences hold attention longer than passive content |
| **30% better long-term financial habits** | Learning by doing creates lasting behavioral change |

By placing financial decisions in a child's real-world environment, Coinquest transforms abstract concepts into memorable, actionable experiences.

---

## Features

### Interactive Quests
Choose-your-own-adventure style micro-stories that teach:
- **Saving vs. Spending** - Delayed gratification leads to bigger rewards
- **Needs vs. Wants** - Prioritizing what matters
- **Compound Growth** - Money grows when you don't touch it
- **Goal Setting** - Planning helps you get what you really want
- **Earning** - Work creates opportunity

Each quest takes 60 seconds and ends with a clear principle + TLDR summary.

### AR Room
Kids place purchased items into their *real* bedroom using augmented reality:
- Tap to place furniture on any flat surface
- Drag to reposition, pinch to resize
- Build your dream room as you save

This isn't a game—it's a visual savings account.

### The Shop
Every item has a clear price and category label:
- **Want** - Fun items (toys, decorations)
- **Need** - Practical items (furniture)
- **Upgrade** - Premium items requiring patience

Kids learn budgeting by choosing what to buy with limited coins.

### Piggy Bank (Grow Feature)
Coins saved in the piggy bank grow over time (simulating interest):
- "Fast Forward 24h" button for demo purposes
- Teaches that patience is rewarded
- Wealthsimple-aligned: calm, passive growth without complexity

### Parent Dashboard
Password-protected portal where parents can:
- View their child's progress and completed lessons
- See coins earned, items purchased, and achievements unlocked
- Read a TLDR summary of what their child is learning

No hovering required—parents stay informed while kids stay independent.

---

## Privacy & Safety (Kid-First Design)

Coinquest was designed with COPPA principles in mind:

| Feature | Why It Matters |
|---------|----------------|
| **No account required** | Kids never enter personal information |
| **100% local storage** | All data stays on the device, never uploaded |
| **No social features** | No chat, friends list, or sharing |
| **No ads or external links** | Zero exposure to inappropriate content |
| **No AI-generated content** | All lessons are curated and age-appropriate |
| **Password-protected parent access** | Kids can't impersonate parents |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| State Management | Zustand (with localStorage persistence) |
| AR (Android) | WebXR Device API + Three.js |
| AR (iOS) | Model-viewer with AR Quick Look fallback |
| 3D Models | GLTF/GLB format |
| Routing | React Router |

---

## How It Teaches Financial Literacy

| Concept | How Coinquest Teaches It |
|---------|--------------------------|
| **Delayed Gratification** | Quests show the cost of impulse decisions; AR room rewards patience |
| **Opportunity Cost** | Limited coins force tradeoffs—buy the toy OR save for the bed |
| **Compound Interest** | Piggy bank grows coins over time (simplified "money grows" concept) |
| **Budgeting** | Shop prices + coin balance = natural budget constraints |
| **Goal Setting** | Big items require saving, creating tangible goals |
| **Earning** | Quests reward correct choices with coins |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- For AR testing: ARCore-compatible Android device with Chrome, or iOS device with Safari

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/Coinquest.git
cd Coinquest

# Install dependencies
npm install

# Start development server (HTTPS required for AR)
npm run dev
```

### Testing on Mobile

1. Find your computer's local IP: `ipconfig getifaddr en0`
2. On your phone (same WiFi), open: `https://[YOUR-IP]:5173`
3. Accept the security warning (self-signed certificate)

---

## Project Structure

```
Coinquest/
├── public/
│   ├── models/          # 3D furniture models (GLB)
│   ├── sounds/          # Audio files
│   ├── webxr-ar.html    # AR Room experience
│   └── ar-lessons.html  # AR Quests experience
├── src/
│   ├── components/      # React components
│   ├── data/            # Lesson content
│   ├── store/           # Zustand state management
│   └── App.tsx          # Main app entry
└── package.json
```

---

## Why Coinquest Wins

### Creative Approach
We didn't build another quiz app. We built a world where money decisions have *visible* consequences. AR transforms abstract concepts into tangible experiences.

### Engaging Experience
- 60-second quests with choose-your-path stories
- Dopamine-driven coin rewards with sound effects
- Build your dream room piece by piece
- Progress tracking and achievements

### Realistic Impact
These aren't toy lessons—they're the actual principles behind financial success:
- Save for what matters
- Needs before wants
- Patience pays off
- Every choice has a cost

### Innovative Technology
WebXR brings AR to the browser—no app download required. Kids can start learning immediately on any modern smartphone.

### Privacy-First
Zero personal data collection. Zero external connections. Zero ads. This is how kids' apps should be built.

---

## Future Roadmap

- [ ] Multiplayer savings goals (siblings/friends)
- [ ] Weekly allowance simulation
- [ ] Parental controls for time limits
- [ ] More AR items and room themes
- [ ] Expanded lesson library
- [ ] Accessibility improvements (screen reader support)

---

## Team

Built with ❤️ at ElleHacks 2026

---

## License

MIT License - See LICENSE file for details

---

*"The best time to teach kids about money is before they have any."*
