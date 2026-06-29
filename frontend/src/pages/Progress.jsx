import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar.jsx"
import useCurrentUser from "../hooks/useCurrentUser.jsx"
import LiquidEther from "../components/LiquidEther.jsx"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


function Progress() {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

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
    const [exercisesLogs, setExercisesLogs] = useState([])
    const [chartData, setChartData] = useState(null)
    const currentUser = useCurrentUser()


    const fetchExerciseLogs = async (name) => {

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

        setExercisesLogs(data)

        const tmpChartData = data.map((log) => {
            const bestSet = log.sets.reduce((max, current) =>
                Number(current.weight) > Number(max.weight) ? current : max
            );

            return {
                week: log.week,
                weight: Number(bestSet.weight)
            }
        });

        setChartData(tmpChartData)
    }

    function ProgressLineChart() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#00E5FF"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

    }, [])


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
                                <h2 className=" tracking-wide text-text-primary text-lg bg-white/8
                            backdrop-blur-2xl
                            border border-white/15
                            rounded-2xl py-1 px-6  rounded-lg hover:scale-[1.05] duration-300 ease-in-out text-center"
                                    onClick={() => fetchExerciseLogs(exercise)}
                                >{exercise}</h2>
                            ))
                        }
                    </div>

                    <div className="w-[70vw] h-[300px]">
                        {
                            chartData &&
                            <ProgressLineChart />
                        }
                    </div>
                </section>

            </div>


        </main>
    )
}

export default Progress;