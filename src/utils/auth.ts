// utils/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Attempting login for email:", email);

  try {
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed. Server response:", errorText);
      return {
        error: "Login failed. Please check your credentials and try again.",
      };
    }

    const data = await response.json();
    console.log("Login successful. User data:", data.user);

    cookies().set("authToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Redirect based on user role
    if (data.user.role === "admin") {
      redirect("/hospital/dashboard");
    } else if (data.user.role === "institution") {
      redirect("/institution/dashboard");
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Attempting login for email:", email);

  try {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login failed. Server response:", errorText);
      return {
        error: "Login failed. Details already exist",
      };
    }

    const data = await response.json();
    console.log("Login successful. User data:", data.user);

    cookies().set("authToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Redirect based on user role
    if (data.user.role === "admin") {
      redirect("/hospital/dashboard");
    } else if (data.user.role === "institution") {
      redirect("/institution/dashboard");
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logout() {
  cookies().delete("authToken");
  redirect("/login");
}

export async function getCurrentUser() {
  const authToken = cookies().get("authToken")?.value;
  if (!authToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to get current user. Status:", response.status);
      return null;
    }

    const userData = await response.json();
    console.log("Current user data:", userData);
    return userData.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
