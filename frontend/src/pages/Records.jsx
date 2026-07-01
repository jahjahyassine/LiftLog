import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar.jsx"
import useCurrentUser from "../hooks/useCurrentUser.jsx"
import LiquidEther from "../components/LiquidEther.jsx"


function Records() {

    const currentUser = useCurrentUser()

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

    const [item, setItem] = useState("")
    const [records, setRecords] = useState(null)

    const exercises = [
        "Bench Press",
        "Incline Bench Press",
        "Chest Fly",
        "Pull Up",
        "Lat Pulldown",
        "Barbell Row",
        "Shoulder Press",
        "Lateral Raise",
        "Barbell Curl",
        "Hammer Curl",
        "Triceps Pushdown",
        "Squat",
        "Deadlift",
        "Leg Press",
        "Leg Curl",
        "Crunch",
        "Plank",
        "Hanging Leg Raise"
    ]

    const fetchRecord = async (name) => {

        setItem(name)
        const response = await fetch(
            `${BASE_URL}/workouts/${name}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const data = await response.json()

        if (!response.ok) throw new Error(data.detail)

        const record = data.map((record) => {
            const bestSets = record.sets.reduce((max, current) =>
                Number(current.weight) > Number(max.weight) ? current : max
            )

            return {
                weight: Number(bestSets.weight),
                reps: Number(bestSets.reps),
                week: record.week
            }
        }).sort((a, b) => a.week - b.week);

        setRecords(record)
    }

    return (
        <main className="relative h-screen bg-bg-primary overflow-hidden font-sora">

            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={[
                        "#00E5FF",
                        "#7C4DFF",
                        "#4FC3F7"
                    ]}
                    mouseForce={35}
                    cursorSize={120}
                    autoDemo={true}
                    autoSpeed={1.8}
                    autoIntensity={4}
                    autoResumeDelay={300}
                />
            </div>

            <div className="relative z-10 h-full p-4 gap-4 flex">

                <SideBar user={currentUser} />

                <section className="flex-1 flex flex-col items-center border border-stroke text-text-primary bg-white/10 rounded-xl
                backdrop-blur-xl
                border border-white/15
                shadow-2xl p-2 text-lg font-semibold tracking-tight justify-around">

                    <div className="flex gap-2 flex-wrap justify-around border-b border-stroke pb-2">
                        {
                            exercises.map((exercise, index) => (
                                <h2 className={`tracking-wide text-text-primary text-lg 
                            backdrop-blur-2xl
                            border border-white/15
                            rounded-2xl py-1 px-6  rounded-lg hover:scale-[1.05] duration-300 ease-in-out text-center
                            ${exercise == item ? "bg-brand/15" : "bg-white/8"
                                    }
                            `}
                                    onClick={() => {
                                        setRecords(null)
                                        fetchRecord(exercise)

                                    }
                                    }
                                >{exercise}</h2>
                            ))
                        }
                    </div>

                    <div className="flex-1 p-6 flex flex-col gap-2">

                        {
                            records &&
                            records.map((record) => (
                                <div
                                    className="flex justify-between bg-white/8
                                backdrop-blur-xl
                                border border-white/15
                                rounded-2xl p-4 rounded-lg w-[250px] hover:scale-[1.05] duration-300 ease-in-out"
                                >
                                    <h2>Week {record.week}:</h2>
                                    <p>{record.weight} x {record.reps} reps</p>
                                </div>
                            ))
                        }
                    </div>


        </section>


            </div >


        </main >
    )
}

export default Records;