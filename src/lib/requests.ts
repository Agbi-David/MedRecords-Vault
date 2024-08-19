import { cookies } from "next/headers";
import { Institution, Request } from "@/payload-types";

export async function getDocumentRequests(): Promise<Request[]> {
  const cookieStore = cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/requests`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch requests");
  const data = await response.json();
  // if (data.docs.length === 0) throw new Error('No institution found for user');
  return data.docs;
}
