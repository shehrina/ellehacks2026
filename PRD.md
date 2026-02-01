# Product Requirements Document (PRD)

## Product Name (Working)

TBD (see naming options below)

---

## 1. Overview

This product is a **web-based AR learning experience for kids** that teaches core money tradeoffs — *spend, save, and see it grow* — through immersive AR interactions and a gamified High Yield Savings Account (HYSA).

Kids earn coins by completing **AR-based lessons** where they solve problems using interactive elements in their real-world space. They then decide how to use those coins: spending them in a simple shop to build their AR room, or saving them in a High Yield Piggy Bank to watch their wealth grow over time.

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

1. Open the web app on mobile.
2. Enter **AR Lesson Mode**:
   * Camera opens, plane detection finds a surface.
   * Interactive elements appear (e.g., a broken backpack or an enticing candy shop).
   * Kid interacts with the AR elements to make a choice.
3. Earn coins based on the outcome.
4. Coins are added to the **Wallet**.
5. The kid chooses to:
   * **Spend**: Go to the Shop and buy 3D items.
   * **Save**: Move coins to the **HYSA Piggy Bank** to earn interest (Grow).
6. **AR Room Builder**:
   * Enter the AR Room.
   * Select purchased items from the inventory.
   * Place **multiple items** in the same real-world frame to decorate the space.

This entire loop is designed to complete in **under 2 minutes** during a demo.

---

## 5. Lesson Philosophy

### Structure

* Lessons are **AR-based micro stories**
* Interactive 3D elements representing the scenario are placed in the user's space.
* Kids make choices by interacting with these AR objects.
* Both choices are valid, focusing on learning tradeoffs.

### Emphasis

* Outcomes, not correctness
* Time tradeoffs (now vs later)

---

## 6. Wallet, Piggy, and “Grow”

### Concepts

* **Wallet:** Spendable coins for immediate purchases in the Shop.
* **Piggy Bank (HYSA):** A High Yield Savings Account where money is locked but earns interest over time.
* **Grow:** The "High Yield" component where savings increase automatically at a visible rate.

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

* Multiple items from the inventory can be placed simultaneously in the same frame.
* Tap the floor/surface to place the selected 3D item.
* Drag to reposition items (implemented via WebXR touch interactions).
* Clear all items to start fresh.

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
| 3D Engine    | Three.js             | Core 3D rendering and scene management |
| WebXR        | WebXR Device API     | Hit-testing and immersive AR sessions |
| AR (iOS)     | WebXR / Model Viewer | Browser-based AR (with WebXR support) |
| AR (Android) | WebXR / Scene Viewer | Native-like in-browser AR     |
| 3D Format    | GLB (glTF)           | Cross-platform standard       |

---

### How AR Works

* The app utilizes the **WebXR Device API** for persistent AR scenes.
* **Hit-testing** is used to detect surfaces (floors, tables) for accurate placement.
* Unlike standard Quick Look, this allows for **multiple models** to be rendered in the same session, enabling users to "decorate" their real-world space.

---

## 11. Success Criteria (MVP)

The MVP is considered complete if:

* AR sessions launch reliably with plane detection.
* Interactive AR lessons trigger upon starting a module.
* Kids can earn coins through AR-based decision making.
* Multiple items can be purchased and placed in the same AR frame.
* HYSA logic correctly calculates and displays growth in the Piggy Bank.
* Demo runs end-to-end without explanation.

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
