import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import useCurrentUser from "../hooks/useCurrentUser";

function AddWorkout() {

    const token = localStorage.getItem("token")
    const URL_BASE = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const currentUser = useCurrentUser()
    const [nameExercice, setNameExercice] = useState("")
    const [numSets, setNumSets] = useState(3)
    const [sets, setSets] = useState([
        { weight: "", reps: "" },
        { weight: "", reps: "" },
        { weight: "", reps: "" }
    ])


    const saveWorkout = async () => {
        const response = await fetch(
            `${URL_BASE}/workouts`,
            {
                method: 'POST',
                body: JSON.stringify({
                    exercice: nameExercice,
                    sets: sets
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const data = await response.json()

        if (!response.ok) throw new Error(data.detail)

        window.alert('Workout Saved successfully!')
        navigate('/workouts')
    }


    function handleSets(number) {
        setNumSets(Number(number))
        const newSets = Array.from(
            { length: Number(number) },
            () => ({ weight: "", reps: "" })
        )

        setSets(newSets)
    }


    function handleWeightChange(index, value) {
        const newSets = [...sets]
        newSets[index].weight = value

        setSets(newSets)
    }

    function handleRepsChange(index, value) {
        const newSets = [...sets]
        newSets[index].reps = value

        setSets(newSets)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await saveWorkout()
        } catch (err) {
            alert(err.message)
        }

    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/login')
            return;
        }
    }, [])

    return (
        <main className="h-screen bg-bg-primary p-4 gap-4 flex font-sora">

            <SideBar user={currentUser} />

            <section className="flex-1 flex flex-col items-center border border-stroke text-text-primary bg-gradient-to-tr from-bg-primary to-bg-secondary rounded-xl p-2 text-lg font-semibold tracking-tight justify-around">
                <h1
                    className="
                text-4xl font-bold tracking-wide
                bg-gradient-to-l from-highlight to-text-primary
                bg-clip-text text-transparent
                hover:tracking-widest
                hover:cursor-pointer
                duration-300 ease-in-out
                ">Add Workout</h1>

                <form
                    className="flex flex-col text-text-muted gap-4 border border-stroke rounded-xl md:p-4 lg:p-18"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="grid grid-cols-3 gap-4 text-lg items-center">
                        <label htmlFor="exercice" className="col-span-1 font-medium hover:text-text-primary duration-300 ease-in-out">Name of the Exercice</label>
                        <input type="text" id="exercice"
                            className="col-span-2  border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg placeholder:font-sm
                            focus:outline-none 
                            focus:border-brand-soft
                            focus:ring-2
                            focus:ring-brand-soft/20"
                            placeholder="Bench Press"
                            value={nameExercice}
                            onChange={(e) => setNameExercice(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-lg items-center">
                        <label htmlFor="numSets" className="col-span-1 font-medium hover:text-text-primary duration-300 ease-in-out">Number of Sets</label>
                        <input type="number" id="numSets" value={numSets}
                            className="col-span-2 border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg
                            focus:outline-none
                            focus:border-brand-soft
                            focus:ring-2
                            focus:ring-brand-soft/20"
                            onChange={(e) => handleSets(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-around mt-4">
                        <p className="text-md">SET</p>
                        <p className="text-md">WEIGHT</p>
                        <p className="text-md">REPS</p>
                    </div>
                    {sets.map((set, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-4 items-center mb-2"
                        >
                            <p className="flex justify-center">{index + 1}</p>

                            <input
                                type="number"
                                placeholder="Weight"
                                className="border border-stroke bg-brand-soft/10 rounded-lg px-2 py-1
                                border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg placeholder:font-sm
                                focus:outline-none 
                                focus:border-brand-soft
                                focus:ring-2
                                focus:ring-brand-soft/20"
                                value={set.weight}
                                onChange={(e) => handleWeightChange(index, e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Reps"
                                className="border border-stroke bg-brand-soft/10 rounded-lg px-2 py-1
                                border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg placeholder:font-sm
                                focus:outline-none 
                                focus:border-brand-soft
                                focus:ring-2
                                focus:ring-brand-soft/20"
                                value={set.reps}
                                onChange={(e) => handleRepsChange(index, e.target.value)}
                            />
                        </div>
                    ))}

                    <button className="bg-brand text-bg-primary p-2 rounded-lg hover:bg-brand-hover duration-300 ease-in-out"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </section>

        </main>
    )
}

export default AddWorkout;