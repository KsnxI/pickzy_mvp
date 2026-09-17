import { FormEvent, useEffect, useState } from 'react';
import {
    getCurrentUser,
    getToken,
    loginUser,
    logout,
    registerUser,
    type User,
} from './api';
import './App.css';

type Mode = 'register' | 'login';

function App() {
    const [mode, setMode] = useState<Mode>('register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            return;
        }

        getCurrentUser(token)
            .then((currentUser) => {
                setUser(currentUser);
                setMessage('Сессия восстановлена: вы уже авторизованы.');
            })
            .catch(() => {
                logout();
                setMessage('Сохранённый токен недействителен. Войдите заново.');
            });
    }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            if (mode === 'register') {
                const registeredUser = await registerUser({ email, password });

                setMessage(
                    `Аккаунт для ${registeredUser.email} создан. Теперь войдите.`,
                );
                setMode('login');
                setPassword('');
                return;
            }

            const tokenData = await loginUser({ email, password });

            localStorage.setItem('access_token', tokenData.access_token);

            const currentUser = await getCurrentUser(tokenData.access_token);

            setUser(currentUser);
            setPassword('');
            setMessage('Вход выполнен. Добро пожаловать в Pickzy!');
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : 'Произошла неизвестная ошибка.',
            );
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        logout();
        setUser(null);
        setMessage('Вы вышли из аккаунта.');
    }

    return (
        <div className="app">
            <header className="header">
                <div className="header__inner">
                    <a className="logo" href="/">
                        <span className="logo__mark">P</span>
                        <span>Pickzy</span>
                    </a>

                    <span className="header__tagline">Находите события рядом</span>
                </div>
            </header>

            <main className="page">
                <section className="auth-layout">
                    <div className="intro">
                        <span className="intro__eyebrow">PICKZY EVENTS</span>

                        <h1>Планы начинаются здесь</h1>

                        <p>
                            Находите интересные мероприятия, сохраняйте понравившиеся места
                            и собирайте свой личный список событий.
                        </p>

                        <div className="event-preview" aria-hidden="true">
                            <div className="event-preview__date">
                                <span>24</span>
                                <small>МАЯ</small>
                            </div>

                            <div>
                                <p className="event-preview__type">ГОРОДСКОЕ СОБЫТИЕ</p>
                                <p className="event-preview__title">Найдите своё следующее впечатление</p>
                            </div>
                        </div>
                    </div>

                    <section className="auth-card">
                        {user ? (
                            <div className="auth-card__content">
                                <span className="status-icon">✓</span>
                                <p className="auth-card__eyebrow">ВЫ В СИСТЕМЕ</p>
                                <h2>Добро пожаловать!</h2>

                                <div className="profile-info">
                                    <span className="profile-info__label">Ваш email</span>
                                    <span className="profile-info__value">{user.email}</span>
                                </div>

                                <div className="profile-info">
                                    <span className="profile-info__label">Статус</span>
                                    <span className="status-badge">
                    {user.is_active ? 'Активен' : 'Неактивен'}
                  </span>
                                </div>

                                <button
                                    className="button button--secondary"
                                    type="button"
                                    onClick={handleLogout}
                                >
                                    Выйти из аккаунта
                                </button>
                            </div>
                        ) : (
                            <div className="auth-card__content">
                                <div className="tabs">
                                    <button
                                        type="button"
                                        className={`tabs__button ${
                                            mode === 'register' ? 'tabs__button--active' : ''
                                        }`}
                                        onClick={() => {
                                            setMode('register');
                                            setMessage('');
                                        }}
                                    >
                                        Регистрация
                                    </button>

                                    <button
                                        type="button"
                                        className={`tabs__button ${
                                            mode === 'login' ? 'tabs__button--active' : ''
                                        }`}
                                        onClick={() => {
                                            setMode('login');
                                            setMessage('');
                                        }}
                                    >
                                        Вход
                                    </button>
                                </div>

                                <p className="auth-card__eyebrow">
                                    {mode === 'register' ? 'НОВЫЙ АККАУНТ' : 'С ВОЗВРАЩЕНИЕМ'}
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

                                <form className="auth-form" onSubmit={handleSubmit}>
                                    <label className="field">
                                        <span className="field__label">Email</span>
                                        <input
                                            className="field__input"
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            required
                                        />
                                    </label>

                                    <label className="field">
                                        <span className="field__label">Пароль</span>
                                        <input
                                            className="field__input"
                                            type="password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            placeholder="Минимум 6 символов"
                                            autoComplete={
                                                mode === 'register' ? 'new-password' : 'current-password'
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
                                            setMode(mode === 'register' ? 'login' : 'register');
                                            setMessage('');
                                        }}
                                    >
                                        {mode === 'register' ? 'Войти' : 'Зарегистрироваться'}
                                    </button>
                                </p>
                            </div>
                        )}

                        {message && (
                            <p className="message" role="status">
                                {message}
                            </p>
                        )}
                    </section>
                </section>
            </main>
        </div>
    );
}

export default App;