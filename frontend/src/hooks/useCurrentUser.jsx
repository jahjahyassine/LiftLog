import { useState, useEffect } from "react"

export default function useCurrentUser() {

    const [currentUser, setCurrentUser] = useState(null)
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        async function fetchUser() {

            const token = localStorage.getItem("token")

            const response = await fetch(
                `${BASE_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            const data = await response.json()

            setCurrentUser(data)
        }

        fetchUser()
    }, [])

    return currentUser
}