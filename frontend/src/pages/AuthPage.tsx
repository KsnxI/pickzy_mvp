import '../App.css'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    getCurrentUser,
    getToken,
    loginUser,
    logout,
    registerUser,
    type User,
} from '../api'

type Mode = 'register' | 'login'

type AuthPageProps = {
    onAuthenticated: (
        user: User,
        isNewRegistration: boolean,
    ) => void
}

export default function AuthPage({
                                     onAuthenticated,
                                 }: AuthPageProps) {
    const navigate = useNavigate()

    const [mode, setMode] = useState<Mode>('register')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const token = getToken()

        if (!token) {
            return
        }

        getCurrentUser(token)
            .then((currentUser) => {
                // Пользователь уже был авторизован ранее.
                // Это не новая регистрация.
                onAuthenticated(currentUser, false)
                navigate('/home', { replace: true })
            })
            .catch(() => {
                logout()
            })
    }, [navigate, onAuthenticated])

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()
        setMessage('')
        setIsLoading(true)

        try {
            if (mode === 'register') {
                // 1. Регистрируем нового пользователя
                await registerUser({
                    email,
                    password,
                })

                // 2. Сразу выполняем вход
                const tokenData = await loginUser({
                    email,
                    password,
                })

                // 3. Сохраняем токен
                localStorage.setItem(
                    'access_token',
                    tokenData.access_token,
                )

                // 4. Получаем созданного пользователя
                const currentUser = await getCurrentUser(
                    tokenData.access_token,
                )

                // 5. Сообщаем App, что это НОВАЯ регистрация
                onAuthenticated(currentUser, true)

                // 6. После регистрации открываем опрос
                navigate('/survey', { replace: true })

                return
            }

            // Обычный вход существующего пользователя
            const tokenData = await loginUser({
                email,
                password,
            })

            localStorage.setItem(
                'access_token',
                tokenData.access_token,
            )

            const currentUser = await getCurrentUser(
                tokenData.access_token,
            )

            // Это НЕ новая регистрация
            onAuthenticated(currentUser, false)

            // При обычном входе сразу идём на главную
            navigate('/home', { replace: true })
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : 'Произошла неизвестная ошибка.',
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="app">
            <header className="header">
                <div className="header__inner">
                    <a
                        className="logo"
                        href="/"
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        <span className="logo__mark">P</span>
                        <span>Pickzy</span>
                    </a>

                    <span className="header__tagline">
                        Находите события рядом
                    </span>
                </div>
            </header>

            <main className="page">
                <section className="auth-layout">
                    <div className="intro">
                        <span className="intro__eyebrow">
                            PICKZY EVENTS
                        </span>

                        <h1>Планы начинаются здесь</h1>

                        <p>
                            Находите интересные мероприятия,
                            сохраняйте понравившиеся места
                            и собирайте свой личный список событий.
                        </p>

                        <div
                            className="event-preview"
                            aria-hidden="true"
                        >
                            <div className="event-preview__date">
                                <span>24</span>
                                <small>МАЯ</small>
                            </div>

                            <div>
                                <p className="event-preview__type">
                                    ГОРОДСКОЕ СОБЫТИЕ
                                </p>

                                <p className="event-preview__title">
                                    Найдите своё следующее впечатление
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="auth-card">
                        <div className="auth-card__content">
                            <div className="tabs">
                                <button
                                    type="button"
                                    className={`tabs__button ${
                                        mode === 'register'
                                            ? 'tabs__button--active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setMode('register')
                                        setMessage('')
                                    }}
                                >
                                    Регистрация
                                </button>

                                <button
                                    type="button"
                                    className={`tabs__button ${
                                        mode === 'login'
                                            ? 'tabs__button--active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setMode('login')
                                        setMessage('')
                                    }}
                                >
                                    Вход
                                </button>
                            </div>

                            <p className="auth-card__eyebrow">
                                {mode === 'register'
                                    ? 'НОВЫЙ АККАУНТ'
                                    : 'С ВОЗВРАЩЕНИЕМ'}
                            </p>

                            <h2>
                                {mode === 'register'
                                    ? 'Создайте аккаунт'
                                    : 'Войдите в Pickzy'}
                            </h2>

                            <p className="auth-card__description">
                                {mode === 'register'
                                    ? 'Сохраните понравившиеся события и возвращайтесь к ним в любое время.'
                                    : 'Войдите, чтобы продолжить поиск мероприятий.'}
                            </p>

                            <form
                                className="auth-form"
                                onSubmit={handleSubmit}
                            >
                                <label className="field">
                                    <span className="field__label">
                                        Email
                                    </span>

                                    <input
                                        className="field__input"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                    />
                                </label>

                                <label className="field">
                                    <span className="field__label">
                                        Пароль
                                    </span>

                                    <input
                                        className="field__input"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        placeholder="Минимум 6 символов"
                                        autoComplete={
                                            mode === 'register'
                                                ? 'new-password'
                                                : 'current-password'
                                        }
                                        required
                                        minLength={6}
                                    />
                                </label>

                                <button
                                    className="button button--primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? 'Пожалуйста, подождите...'
                                        : mode === 'register'
                                            ? 'Создать аккаунт'
                                            : 'Войти'}
                                </button>
                            </form>

                            <p className="auth-card__switch">
                                {mode === 'register'
                                    ? 'Уже есть аккаунт?'
                                    : 'Ещё нет аккаунта?'}{' '}

                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => {
                                        setMode(
                                            mode === 'register'
                                                ? 'login'
                                                : 'register',
                                        )

                                        setMessage('')
                                    }}
                                >
                                    {mode === 'register'
                                        ? 'Войти'
                                        : 'Зарегистрироваться'}
                                </button>
                            </p>
                        </div>

                        {message && (
                            <p
                                className="message"
                                role="status"
                            >
                                {message}
                            </p>
                        )}
                    </section>
                </section>
            </main>
        </div>
    )
}