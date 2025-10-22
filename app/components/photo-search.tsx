"use client";

import { useSearchParams } from "next/navigation";

export default function PhotoSearch() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    return (
        <form action="/" method="GET" className="flex">
            <input
                name="query"
                defaultValue={query || ""}
                type="text"
                placeholder="Search free high-res photos"
                className="flex-1 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                autoComplete="off"
            />
        </form>
    );
}