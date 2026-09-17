const API_URL = 'http://127.0.0.1:8000';

export type AuthData = {
    email: string;
    password: string;
};

export type User = {
    id: number;
    email: string;
    is_active: boolean;
};

export type TokenResponse = {
    access_token: string;
    token_type: string;
};

async function getErrorMessage(response: Response): Promise<string> {
    const data = await response.json().catch(() => null);

    if (typeof data?.detail === 'string') {
        return data.detail;
    }

    if (Array.isArray(data?.detail)) {
        return data.detail
            .map((item: { msg?: string }) => item.msg ?? 'Некорректные данные')
            .join(', ');
    }

    return `Ошибка сервера: ${response.status}`;
}

export async function registerUser(data: AuthData): Promise<User> {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    return response.json();
}

export async function loginUser(data: AuthData): Promise<TokenResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    return response.json();
}

export async function getCurrentUser(token: string): Promise<User> {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    return response.json();
}

export function getToken(): string | null {
    return localStorage.getItem('access_token');
}

export function logout(): void {
    localStorage.removeItem('access_token');
}