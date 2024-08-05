'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'
import { login } from "@/utils/auth"
import { useRouter } from 'next/navigation'
import {useActionState, useEffect} from 'react'

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Logging in...' : 'Login'}
        </Button>
    )
}

export default function LoginForm() {
    const router = useRouter()
    const [state, formAction] = useActionState(login, null)

    useEffect(() => {
        if (state?.success) {
            if (state.user?.role === 'admin') {
                router.push('admin/dashboard')
            } else if (state.user?.role === 'institution') {
                router.push('/institution/dashboard')
            } else {
                router.push('/dashboard')
            }
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                <CardDescription className="text-center">
                    Enter your credentials to access the system
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    {state?.error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                    <LoginButton />
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                </Link>
            </CardFooter>
        </Card>
    )
}
