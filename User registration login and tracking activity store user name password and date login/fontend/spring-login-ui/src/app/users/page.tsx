"use client"

type User = {
    id: number,
    username: string,
    password: string
}

import { getAllUsers } from "@/lib/api"
import { useEffect, useState } from "react"

export default function UsersPage() {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getAllUsers().then(setUsers)
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="border p-3 rounded bg-white shadow">
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    )
}