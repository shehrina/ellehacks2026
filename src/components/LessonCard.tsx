import { useState } from 'react'
import type { Lesson } from '../data/lessons'
import { useGameStore } from '../store/gameStore'

interface LessonCardProps {
  lesson: Lesson
  onComplete: () => void
}

type LessonState = 'story' | 'feedback' | 'complete'

export function LessonCard({ lesson, onComplete }: LessonCardProps) {
  const [state, setState] = useState<LessonState>('story')
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const addCoins = useGameStore((s) => s.addCoins)
  const completeLesson = useGameStore((s) => s.completeLesson)

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex)
    setState('feedback')
  }

  const handleContinue = () => {
    // Award coins regardless of choice (they learn either way)
    addCoins(lesson.coinReward)
    completeLesson(lesson.id)
    setState('complete')
  }

  const choice = selectedChoice !== null ? lesson.choices[selectedChoice] : null

  if (state === 'complete') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson Complete!</h3>
        <p className="text-gray-600 mb-4">You earned {lesson.coinReward} coins!</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
          <p className="text-yellow-800 font-medium">💡 {lesson.principle}</p>
        </div>
        <button
          onClick={onComplete}
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all active:scale-95"
        >
          Continue
        </button>
      </div>
    )
  }

  if (state === 'feedback' && choice) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className={`text-5xl mb-4 text-center ${choice.isCorrect ? '' : ''}`}>
          {choice.isCorrect ? '⭐' : '🤔'}
        </div>
        <p className="text-gray-700 text-lg mb-6">{choice.feedback}</p>
        <button
          onClick={handleContinue}
          className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-all active:scale-95"
        >
          Got it! (+{lesson.coinReward} 🪙)
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="text-4xl mb-4 text-center">📖</div>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">{lesson.story}</p>
      <div className="space-y-3">
        {lesson.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(index)}
            className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-98"
          >
            <span className="font-medium">{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
