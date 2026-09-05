// src/features/auth/api.ts
import { apiFetch, ApiError } from '@/lib/api'
import type { User, LoginPayload, SignupPayload } from '@/types/auth'

export async function login(payload: LoginPayload): Promise<User> {
    return apiFetch<User>('api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function signup(payload: SignupPayload): Promise<User> {
    return apiFetch<User>('api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function logout(): Promise<void> {
    await apiFetch<void>('api/v1/account/logout', { method: 'POST' })
}

export async function getProfile(): Promise<User> {
    return apiFetch<User>('api/v1/account/profile')
}

export function isUnauthorized(error: unknown): boolean {
    return error instanceof ApiError && error.status === 401
}