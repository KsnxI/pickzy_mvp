import { useCallback, useEffect, useState } from 'react'
import type { UserPreferences } from './data/preferences'

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'

import {
    getCurrentUser,
    getToken,
    logout,
    type User,
} from './api'

import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import PlacePage from './pages/PlacePage'
import SurveyPage from './pages/SurveyPage'

function App() {
    const [user, setUser] = useState<User | null>(null)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [showSurvey, setShowSurvey] = useState(false)

    useEffect(() => {
        const token = getToken()

        if (!token) {
            setIsCheckingAuth(false)
            return
        }

        getCurrentUser(token)
            .then((currentUser) => {
                setUser(currentUser)
                setShowSurvey(false)
            })
            .catch(() => {
                logout()
                setUser(null)
                setShowSurvey(false)
            })
            .finally(() => {
                setIsCheckingAuth(false)
            })
    }, [])

    const handleAuthenticated = useCallback(
        (
            currentUser: User,
            isNewRegistration: boolean,
        ) => {
            setUser(currentUser)
            setShowSurvey(isNewRegistration)
        },
        [],
    )

    function handleSurveyComplete(
        preferences: UserPreferences | null,
    ) {
        if (preferences && user) {
            localStorage.setItem(
                `pickzy_preferences_${user.id}`,
                JSON.stringify(preferences),
            )
        }

        setShowSurvey(false)
    }

    function handleLogout() {
        logout()
        setUser(null)
        setShowSurvey(false)
    }

    if (isCheckingAuth) {
        return (
            <div className="grid min-h-screen place-items-center bg-slate-50">
                <p className="text-sm font-semibold text-slate-500">
                    Загрузка Pickzy...
                </p>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <Navigate
                                to={
                                    showSurvey
                                        ? '/survey'
                                        : '/home'
                                }
                                replace
                            />
                        ) : (
                            <Navigate
                                to="/auth"
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/auth"
                    element={
                        user ? (
                            <Navigate
                                to={
                                    showSurvey
                                        ? '/survey'
                                        : '/home'
                                }
                                replace
                            />
                        ) : (
                            <AuthPage
                                onAuthenticated={
                                    handleAuthenticated
                                }
                            />
                        )
                    }
                />

                <Route
                    path="/survey"
                    element={
                        user && showSurvey ? (
                            <SurveyPage
                                onComplete={
                                    handleSurveyComplete
                                }
                            />
                        ) : (
                            <Navigate
                                to={
                                    user
                                        ? '/home'
                                        : '/auth'
                                }
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/home"
                    element={
                        user ? (
                            <HomePage
                                user={user}
                                onLogout={handleLogout}
                            />
                        ) : (
                            <Navigate
                                to="/auth"
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="/place/:id"
                    element={
                        user ? (
                            <PlacePage />
                        ) : (
                            <Navigate
                                to="/auth"
                                replace
                            />
                        )
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                user
                                    ? showSurvey
                                        ? '/survey'
                                        : '/home'
                                    : '/auth'
                            }
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App