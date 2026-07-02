import { useEffect, useState } from 'react'
import useCurrentUser from '../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import SideBar from '../components/SideBar';
import Default from '/home/yassine/Projects/GymTracker/backend/media/profiles/default.jpg'

function Profile() {

    const token = localStorage.getItem("token")
    const currentUser = useCurrentUser()
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token");

        navigate("/")
    }

    

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('login')
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
                backdrop-blur-xl w-[500px]
                border border-white/15
                shadow-2xl p-2 text-lg font-semibold tracking-tight justify-center gap-8">

                    <div className='flex items-center gap-4'>
                        <img
                            src={currentUser?.profile_pic_path || Default}
                            className='md:w-[15vw] lg:w-[10vw] rounded-full object-cover hover:scale-[1.05] transition-all duration-300 ease-in-out'
                        
                        />
                        <h2 className='flex-1 md:text-4xl lg:text-5xl'>{currentUser?.full_name}</h2>

                    </div>

                    <section
                        className="flex flex-col gap-4 border border-stroke rounded-xl md:p-4 lg:p-18 bg-white/8
                    backdrop-blur-xl
                    border border-white/15"
                    >
                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Full Name</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.full_name}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Username</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.username}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Age</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.age || "N/A"}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Height</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.height || "N/A"}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Weight</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.weight || "N/A"}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-lg items-center">
                            <p className="col-span-1 font-medium text-text-muted">Email</p>
                            <h2 className="col-span-2 font-bold text-2xl tracking-wide text-end">{currentUser?.email}</h2>
                        </div>
                    </section>

                    <button className='
                            rounded-lg
                            bg-white/5
                            text-red-400
                            border border-red-400/20
                            hover:border-red-400/40
                            hover:bg-red-500/10
                            duration-300
                            w-[20vw] text-center'
                    onClick={handleLogout}        
                    >
                        Logout


                    </button>
                </section>

            </div>
        </main>
    )
}


export default Profile;