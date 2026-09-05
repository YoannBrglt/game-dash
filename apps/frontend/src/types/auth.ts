// src/types/auth.ts
export interface User {
    id: number
    email: string
    fullName: string | null
    initials: string
    createdAt: string
    updatedAt: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface SignupPayload {
    email: string
    password: string
    passwordConfirmation: string
    fullName: string
}