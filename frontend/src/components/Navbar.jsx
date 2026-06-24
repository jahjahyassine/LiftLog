import { Link } from "react-router-dom";
import "../style.css";

function NavBar() {
  return (
    <nav className="relative w-full px-6 mt-4 flex items-center justify-between text-sm font-sora font-medium tracking-wider text-text-muted">

      <Link
        to="/"
        className="
          px-4 py-2 rounded-2xl
          border border-brand-soft/40
          bg-gradient-to-r from-brand/15 to-brand-soft/10
          text-brand-soft font-bold tracking-widest
          shadow-[0_0_15px_rgba(74,111,165,0.15)]
          hover:shadow-[0_0_25px_rgba(74,111,165,0.3)]
          hover:scale-[1.05]
          transition-all duration-300
        "
      >
        LiftLog
      </Link>

      <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8 px-5 py-2 bg-text-primary/10 backdrop-blur-md rounded-2xl border border-stroke">
        <li className="hover:text-text-primary/80 transition">
          <a href="#home">Home</a>
        </li>
        <li className="hover:text-text-primary/80 transition">
          <a href="#features">Features</a>
        </li>
        <li className="hover:text-text-primary/80 transition">
          <a href="#demo">Demo</a>
        </li>
      </ul>

      <div className="flex gap-2">
        <Link
          to="/login"
          className="
            px-4 py-2 rounded-2xl
            bg-text-primary/10 border border-stroke
            hover:text-text-primary/80 hover:scale-[1.05]
            transition-all duration-300
          "
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
            px-4 py-2 rounded-2xl
            bg-brand text-text-primary/80
            hover:bg-brand-hover
            hover:text-text-primary
            hover:scale-[1.05]
            transition-all duration-300
          "
        >
          Get Started →
        </Link>
      </div>

    </nav>
  );
}

export default NavBar;