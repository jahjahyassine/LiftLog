import Log from '/home/yassine/Projects/GymTracker/frontend/src/assets/mockups/Log.png'
import Progress from "/home/yassine/Projects/GymTracker/frontend/src/assets/mockups/Progress.png"
import Record from "/home/yassine/Projects/GymTracker/frontend/src/assets/mockups/Record.png"

function Demo() {
    return (
        <section id="demo" className="h-screen text-text-primary mx-auto flex justify-center items-center gap-4 flex flex-col gap-10">
            <div className="text-center flex flex-col gap-3">
                <h2 className="text-3xl font-bold">
                    Built to{" "}
                    <span className="bg-gradient-to-r from-text-primary to-brand bg-clip-text text-transparent">
                        track real progress
                    </span>
                </h2>

                <p className="text-text-muted max-w-[520px]">
                    A simple system that helps you log workouts, track strength, and stay consistent over time.
                </p>

                <p className="text-xs text-text-muted tracking-widest uppercase">
                    Workout logging • Progress tracking • Personal records
                </p>
            </div>

            <div className='flex gap-4'>
            <div className="lg:w-[310px] md:w-[270px] w-[220px] lg:h-[400px] md:h-[380px] p-4 border border-stroke rounded-xl bg-surface-1/20 backdrop-blur-xl hover:scale-[1.05] duration-300 ease-in-out ">

                <img
                    src={Log}
                    className="w-full aspect-square object-cover rounded-lg"
                />

                <h2 className="mt-3 text-lg font-semibold bg-gradient-to-r to-brand from-text-primary bg-clip-text text-transparent">
                    Workout Logging
                </h2>

                <p className="text-text-muted">
                    Log every set in seconds without interrupting your workout.
                </p>

            </div>

            <div className="lg:w-[310px] md:w-[270px] w-[220px] lg:h-[400px] md:h-[380px] p-4 border border-stroke rounded-xl bg-surface-1/20 backdrop-blur-xl hover:scale-[1.05] duration-300 ease-in-out ">

                <img
                    src={Progress}
                    className="w-full aspect-square object-cover rounded-lg"
                />

                <h2 className="mt-3 text-lg font-semibold bg-gradient-to-r to-brand from-text-primary bg-clip-text text-transparent">
                    Progress Tracking
                </h2>

                <p className="text-text-muted">
                    See measurable strength gains instead of guessing your progress.
                </p>

            </div>

            <div className="lg:w-[310px] md:w-[270px] w-[220px] lg:h-[400px] md:h-[380px] p-4 border border-stroke rounded-xl bg-surface-1/20 backdrop-blur-xl hover:scale-[1.05] duration-300 ease-in-out ">

                <img
                    src={Record}
                    className="w-full aspect-square object-cover rounded-lg"
                />

                <h2 className="mt-3 text-lg font-semibold bg-gradient-to-r to-brand from-text-primary bg-clip-text text-transparent">
                    Personal Records
                </h2>

                <p className="text-text-muted">
                    Never lose track of your best performances.
                </p>

            </div>
            
            </div>
            <p className="text-text-muted text-sm text-center mt-6">
        Train with structure. Improve with data. Stay consistent.
      </p>
        </section>
    )
}

export default Demo;