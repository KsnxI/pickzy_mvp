import { useCallback, useEffect, useState } from 'react'
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

function App() {
    const [user, setUser] = useState<User | null>(null)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
        const token = getToken()

        if (!token) {
            setIsCheckingAuth(false)
            return
        }

        getCurrentUser(token)
            .then((currentUser) => {
                setUser(currentUser)
            })
            .catch(() => {
                logout()
                setUser(null)
            })
            .finally(() => {
                setIsCheckingAuth(false)
            })
    }, [])

    const handleAuthenticated = useCallback(
        (currentUser: User) => {
            setUser(currentUser)
        },
        [],
    )

    function handleLogout() {
        logout()
        setUser(null)
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
                        <Navigate
                            to={user ? '/home' : '/auth'}
                            replace
                        />
                    }
                />

                <Route
                    path="/auth"
                    element={
                        user ? (
                            <Navigate
                                to="/home"
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
                            <Navigate to="/auth" replace />
                        )
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={user ? '/home' : '/auth'}
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App