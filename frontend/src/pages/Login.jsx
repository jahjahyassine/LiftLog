import "../style.css"

import { useState } from 'react'
import { Link } from 'react-router-dom'

import Side from "/home/yassine/Projects/GymTracker/frontend/src/assets/side.jpg"

function Login() {

    const URL_BASE = import.meta.env.VITE_BACKEND_URL

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberOption, setRememberOption] = useState(false)
    const [userData, setUserData] = useState({})


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                `${URL_BASE}/login`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )

            const data = await response.json()

            if (!response.ok) throw new Error(data.detail || "Login failed!")

            console.log(data)

        } catch (err) {
            window.alert(err.message)
        }
        

        
    }

    return (
        <main className="relative h-screen flex justify-center items-center font-sora">
            <div className="fixed -z-10 inset-0 h-full w-full bg-gradient-to-tr from-brand to-bg-primary" />

            <section className="border border-stroke max-h-[90vh] w-[80vw] lg:grid lg:grid-cols-2 items-center overflow-hidden p-10 rounded-2xl gap-4 bg-text-primary/10 backdrop-blur-xl md:flex md:justify-center">

                <div className="text-text-primary p-8 flex flex-col ">
                    <div className="text-center">
                        <h2 className="font-bold text-4xl tracking-wide">Welcome back, <span className="bg-gradient-to-l from-brand-soft to-white bg-clip-text text-transparent">Champ</span></h2>
                        <p className="text-text-muted">Your progress doesn’t stop here. Let’s make today count.</p>
                    </div>


                    <form
                        className="flex flex-col p-10 gap-6" onSubmit={(e)=> handleSubmit(e)}
                    >
                        <div className="grid grid-cols-3 gap-4 text-lg">
                            <label htmlFor="email" className="col-span-1 font-medium">Email Address</label>
                            <input type="email" id="email" value={email}
                                className="col-span-2  border border-stroke bg-brand-soft/10 backdrop-blur-md px-2 py-1 rounded-lg placeholder:font-sm
                                focus:outline-none 
focus:border-brand-soft
focus:ring-2
focus:ring-brand-soft/20"
                                placeholder="example@gmail.com"
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
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-text-muted flex justify-between">
                            <div>
                                <input type="checkbox" checked={rememberOption} id="rememberOption"
                                    onChange={e => setRememberOption(e.target.checked)}

                                />
                                <label htmlFor="rememberOption"> Remember me</label>
                            </div>


                            <p className="hover:text-text-primary hover:cursor-pointer duration-300 ease-in-out">Forgot password?</p>
                        </div>

                        <button type="submit" className="bg-brand-soft text-lg p-1 rounded-lg hover:bg-brand-soft/80 duration-300 ease-in-out font-medium">Login</button>

                        <p className="text-center text-sm text-text-muted font-semibold tracking-wider">Don’t have an account → <Link to='/register' className="hover:text-text-primary duration-300 ease-in-out">Register</Link></p>
                    </form>
                </div>

                <div className="h-[80vh] grid overflow-hidden rounded-xl md:hidden lg:block">
                   <img
    src={Side}
    className="w-full h-full object-cover"
/>
                </div>



            </section>
        </main>
    )
}

export default Login;