export interface LessonChoice {
  text: string
  isCorrect: boolean
  feedback: string
}

export interface Lesson {
  id: string
  story: string
  choices: [LessonChoice, LessonChoice]
  principle: string
  coinReward: number
}

export const lessons: Lesson[] = [
  {
    id: 'candy-vs-lamp',
    story: "You have 10 coins saved up. You're walking by a candy store and see your favorite treat for 5 coins. But you've been saving for a cool lamp that costs 15 coins.",
    choices: [
      {
        text: "Buy the candy now!",
        isCorrect: false,
        feedback: "The candy tastes great, but now you're further from your lamp goal. You have to save 10 more coins instead of just 5."
      },
      {
        text: "Keep saving for the lamp",
        isCorrect: true,
        feedback: "Nice! You resisted the temptation. You're only 5 coins away from your lamp now!"
      }
    ],
    principle: "Saving delays fun, but gets you bigger rewards.",
    coinReward: 10
  },
  {
    id: 'need-vs-want',
    story: "Your backpack strap just broke and you need a new one for school. You also really want a new toy that all your friends have. You only have enough for one.",
    choices: [
      {
        text: "Buy the toy",
        isCorrect: false,
        feedback: "The toy is fun, but now you have to carry your books in your arms! Needs should come before wants."
      },
      {
        text: "Buy the backpack",
        isCorrect: true,
        feedback: "Smart choice! You took care of what you needed first. You can save up for the toy later."
      }
    ],
    principle: "Needs come before wants.",
    coinReward: 10
  },
  {
    id: 'patience-pays',
    story: "You put 20 coins in your piggy bank last week. Today you check and see it grew to 22 coins! Your friend wants you to take it all out to buy stickers together.",
    choices: [
      {
        text: "Take it all out for stickers",
        isCorrect: false,
        feedback: "Stickers are fun, but your money stopped growing. If you had waited, it would keep getting bigger!"
      },
      {
        text: "Leave it to keep growing",
        isCorrect: true,
        feedback: "Great patience! Your money will keep growing. This is how saving really pays off over time."
      }
    ],
    principle: "Money grows when you give it time.",
    coinReward: 10
  },
  {
    id: 'plan-your-spending',
    story: "You have 25 coins and want to decorate your room! A cozy armchair costs 30 coins, a plant costs 10 coins, and a cute cat costs 20 coins. You can't afford everything at once.",
    choices: [
      {
        text: "Spend it all on the plant and cat now",
        isCorrect: false,
        feedback: "You got two items, but now you have no coins left and still want the armchair. Planning helps you get what matters most!"
      },
      {
        text: "Save a bit more to get the armchair first",
        isCorrect: true,
        feedback: "Smart planning! By waiting just 5 more coins, you'll get the biggest item you want. Then you can save for the others!"
      }
    ],
    principle: "Planning your spending helps you get what you really want.",
    coinReward: 10
  },
  {
    id: 'earning-opportunity',
    story: "Your neighbor offers to pay you 15 coins to help clean their yard. It will take 2 hours of work. You were planning to play games all afternoon.",
    choices: [
      {
        text: "Play games instead",
        isCorrect: false,
        feedback: "Games are fun, but you missed a chance to earn coins! Earning money helps you reach your goals faster."
      },
      {
        text: "Help clean the yard",
        isCorrect: true,
        feedback: "Great choice! You earned 15 coins and learned that work can help you get the things you want. Now you're closer to your goals!"
      }
    ],
    principle: "Earning money through work helps you reach your goals.",
    coinReward: 10
  }
]
