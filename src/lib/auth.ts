// // app/lib/auth.ts
// 'use server'
//
// import {cookies} from 'next/headers'
// import {redirect} from 'next/navigation'
//
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//
// export async function login(prevState: any, formData: FormData) {
//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//     const role = formData.get('role') as string // Get role from form data if provided
//
//     console.log('Attempting login for email:', email, 'with role:', role);
//
//     try {
//         const response = await fetch(`${API_URL}/api/users/login`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({email, password, role}), // Include role in the request
//         });
//
//         console.log('API response status:', response.status);
//
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Login failed. Server response:', JSON.stringify(errorData));
//             return {error: errorData.errors?.[0]?.message || 'Login failed. Please check your credentials and try again.'};
//         }
//
//         const data = await response.json();
//         console.log('Login successful. User data:', data.user);
//
//         if (!data.user.role) {
//             console.error('User role not provided in login response');
//             return {error: 'Unable to determine user role. Please contact support.'};
//         }
//
//         cookies().set('authToken', data.token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 60 * 60 * 24 * 7 // 1 week
//         });
//
//         // Redirect based on user role
//         if (data.user.role === 'admin') {
//             redirect('/hospital/dashboard');
//         } else if (data.user.role === 'institution') {
//             redirect('/institution/dashboard');
//         } else {
//             redirect('/dashboard');
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         return {error: 'An unexpected error occurred. Please try again.'};
//     }
// }
//
//
// export async function logout() {
//     cookies().delete('authToken');
//     redirect('/login');
// }
//
// export async function getCurrentUser() {
//     const authToken = cookies().get('authToken')?.value;
//     if (!authToken) return null;
//
//     try {
//         const response = await fetch(`${API_URL}/api/users/me`, {
//             headers: {
//                 Authorization: `Bearer ${authToken}`,
//                 'Content-Type': 'application/json'
//             },
//         });
//
//         if (!response.ok) return null;
//
//         const userData = await response.json();
//         return userData.user;
//     } catch (error) {
//         console.error('Error getting current user:', error);
//         return null;
//     }
// }
//
//

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "@/payload-types";

export async function getCurrentUser(): Promise<{ user: User } | null> {
  const cookieStore = cookies();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error("Failed to fetch current user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function requireAuth(user: User | null) {
  if (!user || user.role !== "institution-user") {
    redirect("/institution/auth/login");
  }
}

export async function logout() {
  const cookieStore = cookies();
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  redirect("/institution/auth/login");
}
