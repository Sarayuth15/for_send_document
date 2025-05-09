"use client"

import { getAllLogins } from "@/lib/api"
import { useEffect, useState } from "react"

type Login = {
    id: number,
    username: string,
    loginDate: string
}

export default function LoginsPage() {

    const [logins, setLogin] = useState<Login[]>([])

    useEffect(() => {
        getAllLogins().then(setLogin)
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Login history</h2>
            <ul className="space-y-2">
                {logins.map(entry => (
                    <li key={entry.id} className="border p-3 rounded bg-white shadow">
                        {entry.username} logged in on {entry.loginDate}
                    </li>
                ))}
            </ul>
        </div>
    )
}