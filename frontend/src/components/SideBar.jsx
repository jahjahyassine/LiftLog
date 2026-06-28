import { Link } from 'react-router-dom'
import { useState } from 'react'
import Logo from '/home/yassine/Projects/GymTracker/frontend/src/assets/logo.png'
import Default from '/home/yassine/Projects/GymTracker/backend/media/profiles/default.jpg'

function SideBar({ user }) {

    const [expanded, setExpanded] = useState(false)

    return (
        <section className="h-full font-sora  text-text-primary">

            <aside
                className={`
                    h-full flex flex-col bg-white/10
                    backdrop-blur-2xl
                    border-r border-white/15
                    shadow-xl
                    items-center rounded-xl p-2 transition-all duration-300
                    ${expanded ? "w-[200px]" : "w-[70px]"}
                    border border-stroke
                `}
            >

                <div className={`flex items-center w-full
                    ${expanded ? "justify-between rounded-lg" : "justify-center"} w-full border-b border-stroke pb-3 p-1`
                }>
                    <Link
                        to="/"
                        className={`text-2xl
                        text-brand-soft font-bold tracking-widest
                        hover:scale-[1.05]
                        transition-all duration-300
                        ${expanded ? "text-2xl" : "hidden"}
                        `}
                    >
                        LiftLog
                    </Link>
                    <button className='bg-white/10 backdrop-blur-md p-1 rounded-md hover:scale-[1.05] hover:text-text-primary duration-300 ease-in-out'
                        onClick={() => setExpanded(curr => !curr)}
                    >
                        {

                            expanded ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>
                        }
                    </button>


                </div>




                <ul className='flex flex-col justify-center text-bg-background flex-1 gap-3 w-full'>
                    <li className='p-2 px-3 hover:bg-bg-secondary hover:text-text-primary rounded-lg duration-300 ease-in-out'>
                        <Link to="/workouts" className='flex items-center font-bold gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                            </svg>
                            <span className={`${expanded ? "text-lg" : "hidden"}`}>
                                Workouts
                            </span>
                        </Link>
                    </li>

                    <li className='p-2 px-3 hover:bg-bg-secondary hover:text-text-primary rounded-lg duration-300 ease-in-out'>
                        <Link to="/workouts/new" className='flex items-center font-bold gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className={`${expanded ? "text-lg" : "hidden"}`}>
                                Add Workout
                            </span>
                        </Link>
                    </li>

                    <li className='p-2 px-3 hover:bg-bg-secondary rounded-lg duration-300 ease-in-out'>
                        <Link to="/progress" className='flex items-center font-bold gap-2' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg>

                            <span className={`${expanded ? "text-lg" : "hidden"}`}>
                                Progress
                            </span>
                        </Link>
                    </li>

                    <li className='p-2 px-3 hover:bg-bg-secondary rounded-lg duration-300 ease-in-out'>
                        <Link to="/records" className='flex items-center font-bold gap-2' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                            </svg>

                            <span className={`${expanded ? "text-lg" : "hidden"}`}>
                                Records
                            </span>
                        </Link>
                    </li>
                </ul>
                <div className='w-full'>
                    {
                        expanded ?
                            <div className='flex items-center gap-2 border-t border-stroke pt-2 pb-2 px-2 w-full hover:bg-bg-secondary rounded-lg duration-300 ease-in-out'>
                                <img
                                    src={user?.profile_pic_path || Default}
                                    alt="Profile"
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                                <p className='hover:text-text-primary'>
                                    {user?.username || "Loading..."}
                                </p>
                            </div> :
                            <div className='flex items-center gap-2 border-t border-stroke pt-2 pb-2 px-2 w-full hover:scale-[1.05] rounded-b-xl transition-all duration-300 ease-in-out'>
                                <img
                                    src={user?.profile_pic_path || Default}
                                    alt="Profile"
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            </div>
                    }

                </div>
            </aside>


        </section>
    )
}

export default SideBar;