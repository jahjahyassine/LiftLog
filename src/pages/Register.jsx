import "../style.css"

import { useState } from 'react'
import { Link } from 'react-router-dom'

import Side from "/home/yassine/Projects/GymTracker/src/assets/side.jpg"

function Register() {

    const URL_BASE = import.meta.env.VITE_BACKEND_URL

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [userData, setUserData] = useState({})


    async function handleSubmit() {
        e.preventDefault();

        const validationResponse = await fetch(
            `${URL_BASE}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: { email },
                    password: { password }
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )

        if (!validationResponse.ok) throw new Error("Incorrect Credentials")

        const data = await validationResponse.json()
    }

    return (
        <main className="relative h-screen flex justify-center items-center font-sora">
            <div className="fixed -z-10 inset-0 h-full w-full bg-gradient-to-tr from-brand to-bg-primary" />

            <section className="border border-stroke lg:h-[90vh] md:h-[60vh] w-[80vw] lg:grid lg:grid-cols-2 items-center overflow-hidden p-10 rounded-2xl gap-4 bg-text-primary/10 backdrop-blur-xl md:flex md:justify-center">

                <div className="h-full grid overflow-hidden rounded-xl md:hidden lg:block">
                    <img
                        src={Side}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="text-text-primary p-8 flex flex-col ">
                    <div className="text-center">
                        <h2 className="font-bold text-4xl tracking-wide">Start your <span className="bg-gradient-to-l from-brand-soft to-white bg-clip-text text-transparent">journey</span></h2>
                        <p className="text-text-muted">Create your account and begin tracking the progress you'll be proud of tomorrow.</p>
                    </div>


                    <form
                        className="flex flex-col p-10 gap-6" onSubmit={handleSubmit}
                    >

                        <div className="grid grid-cols-3 gap-4 text-lg">
                            <label htmlFor="fullName" className="col-span-1 font-medium">Full Name</label>
                            <input type="fullName" id="fullName" value={fullName}
                                className="col-span-2  border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg
                                focus:outline-none
focus:border-brand-soft
focus:ring-2
focus:ring-brand-soft/20"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg">
                            <label htmlFor="email" className="col-span-1 font-medium">Email Address</label>
                            <input type="email" id="email" value={email}
                                className="col-span-2  border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg
                                focus:outline-none
focus:border-brand-soft
focus:ring-2
focus:ring-brand-soft/20"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg">
                            <label htmlFor="password" className="col-span-1 font-medium">Password</label>
                            <input type="password" id="password" value={password}
                                className="col-span-2 border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg
                                focus:outline-none
focus:border-brand-soft
focus:ring-2
focus:ring-brand-soft/20"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg">
                            <label htmlFor="password" className="col-span-1 font-medium">Confirm Password</label>
                            <input type="password" id="password" value={password}
                                className="col-span-2 border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg
                                focus:outline-none
focus:border-brand-soft
focus:ring-2
focus:ring-brand-soft/20"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-text-muted flex justify-between">
                            <div>
                                <input type="checkbox" checked={agreeTerms} id="agreeTerms"
                                    onChange={e => setRememberOption(e.target.checked)}

                                />
                                <label htmlFor="agreeTerms"> I agree to the Terms & Conditions</label>
                            </div>


                        </div>

                        <button type="submit" className="bg-brand-soft text-lg p-1 rounded-lg hover:bg-brand-soft/80 duration-300 ease-in-out font-medium">Register</button>

                        <p className="text-center text-sm text-text-muted font-semibold tracking-wider">Already have an account → <Link to='/login' className="hover:text-text-primary duration-300 ease-in-out">Login</Link></p>
                    </form>
                </div>




            </section>
        </main>
    )
}

export default Register;