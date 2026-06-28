import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar.jsx"
import useCurrentUser from "../hooks/useCurrentUser.jsx"

function Workouts() {

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const BASE_URL = import.meta.env.VITE_BACKEND_URL

    const [workouts, setWorkouts] = useState([])

    const currentUser = useCurrentUser()

    const fetchWorkouts = async () => {
        const response = await fetch(
            `${BASE_URL}/workouts`,
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

        setWorkouts(data)
    }

    const deleteWorkout = async (id) => {
        const response = await fetch(
            `${BASE_URL}/workouts/${id}`,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    workout_id: id
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const data = await response.json()

        if (!response.ok) throw new Error(data.detail)
        
        window.alert("Workout Deleted Successfully!")

        await fetchWorkouts()
    }


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        Promise.all([
            fetchWorkouts(),
        ])

    }, [])

    return (
        <main className="h-screen bg-bg-primary p-4 gap-4 flex font-sora">

            <SideBar user={currentUser} />


            <section className="flex-1 flex flex-col items-center border border-stroke text-text-primary bg-gradient-to-tr from-bg-primary to-bg-secondary rounded-xl p-2 text-lg font-semibold tracking-tight justify-around">

                {
                    workouts.map((workout, index) => (
                        <div key={index}
                            className="flex flex-col bg-surface-1 p-4 rounded-lg w-[350px] hover:scale-[1.05] duration-300 ease-in-out"
                        >
                            <h2 className="border-b border-stroke pb-1 tracking-wide text-highlight text-xl">{workout.exercice}</h2>
                            <div className="flex justify-around mt-4 mb-4 text-text-muted">
                                <p className="text-sm">SET</p>
                                <p className="text-sm">WEIGHT</p>
                                <p className="text-sm">REPS</p>
                            </div>
                            {
                                workout.sets.map((set, setIndex) => (
                                    <div className="flex justify-around" key={setIndex}>
                                        <p>{setIndex + 1}</p>
                                        <p className="text-end">{set.weight}
                                            <span className="text-xs text-text-muted ml-1">kg</span>
                                        </p>
                                        <p>{set.reps}</p>
                                    </div>
                                ))
                            }
                            <button className="mt-4 px-2 py-1 text-sm
                            rounded-lg
                            bg-white/5
                            text-red-400
                            border border-red-400/20
                            hover:border-red-400/40
                            hover:bg-red-500/10
                            duration-300"
                            onClick={() => deleteWorkout(workout.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                }


                <button
                    className="bg-brand-soft py-2 px-10 text-xl text-text-primary font-bold rounded-xl
                hover:bg-brand-soft/80
                hover:text-text-secondary
                hover:scale-[1.05]
                transition-all durationn-300 ease-in-out
                "
                    onClick={() => navigate("/workouts/new")}
                >Add Workout</button>
            </section>

        </main>
    )
}

export default Workouts;