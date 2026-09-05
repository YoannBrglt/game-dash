// src/features/auth/api.ts
import { apiFetch, ApiError } from '@/lib/api'
import type { User, LoginPayload, SignupPayload } from '@/types/auth'

// Le backend wrappe toutes les réponses `serialize()` dans { data: ... }
// (voir apps/backend/providers/api_provider.ts).
interface Envelope<T> {
    data: T
}

export async function login(payload: LoginPayload): Promise<User> {
    const { data } = await apiFetch<Envelope<{ user: User }>>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    return data.user
}

export async function signup(payload: SignupPayload): Promise<User> {
    const { data } = await apiFetch<Envelope<{ user: User }>>('/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    return data.user
}

export async function logout(): Promise<void> {
    await apiFetch<void>('/api/v1/account/logout', { method: 'POST' })
}

export async function getProfile(): Promise<User> {
    const { data } = await apiFetch<Envelope<User>>('/api/v1/account/profile')
    return data
}

export function isUnauthorized(error: unknown): boolean {
    return error instanceof ApiError && error.status === 401
}