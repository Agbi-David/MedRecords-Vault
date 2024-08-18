import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
                <p className="mb-4">You do not have permission to access this page.</p>
                <Link href="/login" className="text-blue-500 hover:underline">
                    Return to Login
                </Link>
            </div>
        </div>
    )
}
