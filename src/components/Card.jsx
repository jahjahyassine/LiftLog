import "../style.css"

function Card(props) {
    return (
        <div className="relative overflow-hidden lg:w-[300px] lg:h-[167px] md:w-[270px] md:h-[167px] text-text-primary bg-surface-1/10 backdrop-blur-md rounded-lg p-4 border border-stroke/50 font-sora flex flex-col gap-4 hover:scale-[1.05] duration-300 ease-in-out text-center justify-center">

            {/* Bubble */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-brand-soft/20 blur-3xl" />

            <h2 className="relative z-10 flex items-center gap-2 text-xl font-bold justify-center">
                {props.icon}
                <span className="bg-gradient-to-r to-brand from-[#BFC1C2] bg-clip-text text-transparent">
                    {props.title}
                </span>
            </h2>

            <p className="relative z-10">
                {props.description}
            </p>

        </div>
    )
}

export default Card;