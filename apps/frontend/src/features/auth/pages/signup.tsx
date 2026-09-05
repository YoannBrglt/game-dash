// src/features/auth/signup-page.tsx
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSignup } from '../hooks/useSignup'
import { ApiError } from '@/lib/api'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'

const signupSchema = z
    .object({
        fullName: z.string().min(1, 'Nom requis'),
        email: z.string().email('Email invalide'),
        password: z.string().min(8, 'Minimum 8 caractères'),
        passwordConfirmation: z.string().min(8, 'Minimum 8 caractères'),
    })
    .refine((values) => values.password === values.passwordConfirmation, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['passwordConfirmation'],
    })

export function SignupPage() {
    const signup = useSignup()
    const form = useForm({
        defaultValues: { fullName: '', email: '', password: '', passwordConfirmation: '' },
        validators: {
            onSubmit: signupSchema,
        },
        onSubmit: async ({ value }) => { return signup.mutate(value) },
    })

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Créer un compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        id="signup-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.Field name="fullName">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                autoComplete="name"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
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
                                                autoComplete="new-password"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                            <form.Field name="passwordConfirmation">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Confirmer le mot de passe</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                type="password"
                                                autoComplete="new-password"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            </form.Field>
                        </FieldGroup>

                        {signup.isError && (
                            <p className="text-sm text-destructive">
                                {signup.error instanceof ApiError && signup.error.status === 409
                                    ? 'Cet email est déjà utilisé.'
                                    : "Une erreur est survenue, réessaie."}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={signup.isPending}>
                            {signup.isPending ? 'Création...' : 'Créer mon compte'}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="underline underline-offset-4">
                            Se connecter
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
