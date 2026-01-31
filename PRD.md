# Product Requirements Document (PRD)

## Product Name (Working)

TBD (see naming options below)

---

## 1. Overview

This product is a **web-based AR learning experience for kids** that teaches core money tradeoffs — *spend, save, and grow* — through short, playful interactions.

Kids earn coins by completing micro “choose-your-path” lessons, decide how to use those coins in a simple shop, and place purchased items into their real-world space using AR. The experience is designed to feel magical and intuitive for kids, while remaining **credible, calm, and demo-safe** for judges and sponsors.

The MVP is optimized for a **live hackathon demo**: fast to understand, visually impressive, and technically reliable.

---

## 2. Demo Framing & Audience

### Primary Audience

* **Judges and sponsors** (fintech / edtech)

### Secondary Audience

* Kids (end users)

### Implications

* The demo prioritizes clarity, reliability, and learning outcomes
* Kid-friendly visuals and language are present, but not chaotic or overly game-like
* No pressure mechanics (timers, streaks, leaderboards)
* Calm, trust-building tone aligned with Wealthsimple-style values

---

## 3. Target Age Range

* **Primary target:** 10-year-olds
* **Supported range:** 7–12

### Design Constraints

* Short sentences, simple vocabulary
* Situations over abstractions (stories, not definitions)
* No percentages, interest rates, or real financial jargon
* Visual feedback prioritized over text

### Color Palette (Wealthsimple-Inspired)

Clean, calming pastels that build trust and make financial concepts approachable:

* **Sage Green:** `#c4c9b5` - Primary accent, growth
* **Soft Lavender:** `#d6cadb` - Secondary accent, savings
* **Light Gray:** `#d5d9db` - Neutral backgrounds
* **Soft variants:** Additional pastels in muted tones for variety

**Design Principles:**
* High contrast for readability (dark text on light backgrounds)
* Avoid bright, saturated colors
* Use whitespace generously
* Smooth gradients and subtle shadows for depth

---

## 4. Core Experience Loop (MVP)

1. Open the web app on mobile
2. Enter **AR Hunt Mode**

   * Camera opens
   * A custom image marker becomes the “Money Zone”
   * Three floating coins appear around the marker
3. Tap a coin to collect it
4. A **lesson modal** appears

   * Short story (2–3 lines)
   * Choice A / Choice B
5. Coin-drop animation into piggy bank
6. Wallet / piggy values update
7. Repeat until all 3 coins are collected
9. **Shop unlocks**

   * Kid chooses to spend or save
10. **AR Placement**

* Purchased item can be placed into the real world using AR

This entire loop is designed to complete in **under 2 minutes** during a demo.

---

## 5. Lesson Philosophy

### Structure

* Lessons are **choose-your-path micro stories**
* Both choices are valid
* No moral framing

### Emphasis

* Outcomes, not correctness
* Time tradeoffs (now vs later)

---

## 6. Wallet, Piggy, and “Grow”

### Concepts

* **Wallet:** spendable coins
* **Piggy:** locked savings
* **Grow:** value increases when money is left alone

No real investing concepts are introduced.

---

### Grow Visuals (MVP)

* Semi-transparent piggy bank
* Gold coins appear inside over time
* Growth shown visually, not numerically

**Implementation note:**

* Coins are added incrementally (count-based)
* No physics or liquid simulation required

---

### Demo Control

* “Fast-forward 24h” button
* Instantly shows piggy growth
* Exists only for demo purposes

---

## 7. Shop

* 6–10 items total
* Clear price tiers:

  * Cheap (instant gratification)
  * Mid-tier
  * One large goal item
* Items tagged as Want / Need / Goal
* Purchases deduct from wallet

---

## 8. AR Placement

* Purchased items can be placed into the real world
* Tap to place
* Drag to reposition
* Pinch to scale (nice-to-have)

---

## 9. Parent View

* **Out of scope for MVP demo**
* May be stubbed or hidden
* Future versions may include summaries and learning insights

---

## 10. AR Technology Stack (Final)

### Stack

| Layer        | Technology           | Purpose                       |
| ------------ | -------------------- | ----------------------------- |
| 3D Viewer    | `<model-viewer>`     | Render and preview GLB models |
| AR (iOS)     | Apple Quick Look     | Native AR + surface detection |
| AR (Android) | WebXR / Scene Viewer | In-browser AR                 |
| 3D Format    | GLB (glTF)           | Cross-platform standard       |

---

### How AR Works

* `<model-viewer>` shows a rotatable 3D preview
* User taps **View in AR**
* OS handles AR placement and tracking
* No custom AR code is written

**Accepted tradeoff:**

* Limited UI overlays during AR on iOS
* Chosen for maximum reliability and demo safety

---

## 11. Success Criteria (MVP)

The MVP is considered complete if:

* AR launches reliably on iOS and Android
* 3 coins can be collected
* Each coin triggers a lesson and reward animation
* At least one item can be purchased
* Item can be placed into AR
* Demo runs end-to-end without explanation

---

## 12. Explicit Non-Goals

* Markerless plane detection
* Real investing concepts
* Accounts or logins
* Cloud persistence
* Open-ended AI chat
* Additional features beyond polish

---

## 13. Stretch Goals (Post-MVP)

### Mascot Guide (Optional Enhancement)

A friendly guide character that appears after choices to explain outcomes.

**Mascot Role:**
* Confirms what just happened
* Explains the consequence of a choice
* Reinforces tradeoffs without judgment

**Tone: Calm-Playful**
* Friendly wording ("Nice choice!", "That means…")
* Neutral response to both choices
* No right/wrong language
* Simple one-line TL;DRs (max 15 words)

**Example TL;DRs:**
* "You got something now, but your big goal is farther away."
* "Waiting helps your piggy grow for bigger upgrades later."

### Other Post-MVP Features

* Mascot voice/animations
* AI-generated lessons
* Parent dashboards

Only pursued if MVP is fully polished early.
