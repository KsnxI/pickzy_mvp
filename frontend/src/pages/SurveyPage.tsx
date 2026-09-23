import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { UserPreferences } from '../data/preferences'

type SurveyPageProps = {
    onComplete: (preferences: UserPreferences | null) => void
}

const questions = [
    {
        key: 'atmosphere',
        title: 'Какая атмосфера вам больше нравится?',
        options: [
            'Тихая',
            'Спокойная',
            'Активная',
            'Неважно',
            'Другое',
        ],
    },
    {
        key: 'format',
        title: 'Как вы обычно отдыхаете?',
        options: [
            'Один',
            'Друзья',
            'Свидание',
            'Неважно',
            'Другое',
        ],
    },
    {
        key: 'category',
        title: 'Какие места вам интересны?',
        options: [
            'Кофейня',
            'Ресторан',
            'Бар',
            'Парк',
            'Кино',
            'Другое',
        ],
    },
    {
        key: 'price',
        title: 'Какой бюджет вам подходит?',
        options: [
            '₽',
            '₽₽',
            '₽₽₽',
            'Неважно',
            'Другое',
        ],
    },
] as const

export default function SurveyPage({
                                       onComplete,
                                   }: SurveyPageProps) {
    const navigate = useNavigate()

    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [answers, setAnswers] = useState<
        Record<string, string>
    >({})

    const question = questions[currentQuestion]

    function selectAnswer(answer: string) {
        setAnswers((previous) => ({
            ...previous,
            [question.key]: answer,
        }))
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((previous) => previous + 1)
            return
        }

        const preferences: UserPreferences = {
            atmosphere: answers.atmosphere ?? 'Неважно',
            format: answers.format ?? 'Неважно',
            category: answers.category ?? 'Неважно',
            price: answers.price ?? 'Неважно',
        }

        onComplete(preferences)
        navigate('/home', { replace: true })
    }

    function skipSurvey() {
        onComplete(null)
        navigate('/home', { replace: true })
    }

    const selectedAnswer = answers[question.key]

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl items-center justify-center">
                <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                    <div className="mb-8">
                        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-blue-600">
                            PICKZY
                        </p>

                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
                            Подберём места для вас
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Ответьте на несколько коротких вопросов,
                            чтобы рекомендации лучше соответствовали
                            вашим предпочтениям.
                        </p>

                        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{
                                    width: `${
                                        ((currentQuestion + 1) /
                                            questions.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>

                        <p className="mt-2 text-xs font-semibold text-slate-400">
                            Вопрос {currentQuestion + 1} из{' '}
                            {questions.length}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {question.title}
                        </h2>

                        <div className="mt-5 grid gap-3">
                            {question.options.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() =>
                                        selectAnswer(option)
                                    }
                                    className={`rounded-xl border px-4 py-4 text-left text-sm font-semibold transition ${
                                        selectedAnswer === option
                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                            type="button"
                            onClick={skipSurvey}
                            className="text-sm font-semibold text-slate-400 transition hover:text-slate-700"
                        >
                            Пропустить тестирование
                        </button>

                        <button
                            type="button"
                            onClick={nextQuestion}
                            disabled={!selectedAnswer}
                            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {currentQuestion ===
                            questions.length - 1
                                ? 'Получить рекомендации'
                                : 'Далее'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}