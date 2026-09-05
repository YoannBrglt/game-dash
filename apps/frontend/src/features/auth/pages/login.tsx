// src/features/auth/login-page.tsx
import { useForm } from "@tanstack/react-form"
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLogin } from '../hooks/useLogin'
import { ApiError } from '@/lib/api'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
})

export function LoginPage() {
    const login = useLogin()
    const form = useForm({
        defaultValues: { email: '', password: '' },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => { return login.mutate(value) },
    })


    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Connexion</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="login-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.Field name="email">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="vous@exemple.com"
                                                type="email"
                                                autoComplete="email"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                            <form.Field name="password">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                        </FieldGroup>

                        {login.isError && (
                            <p className="text-sm text-destructive">
                                {login.error instanceof ApiError && login.error.status === 401
                                    ? 'Email ou mot de passe incorrect.'
                                    : "Une erreur est survenue, réessaie."}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={login.isPending}>
                            {login.isPending ? 'Connexion...' : 'Se connecter'}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Pas encore de compte ?{' '}
                        <Link to="/signup" className="underline underline-offset-4">
                            Créer un compte
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div >
    )
}