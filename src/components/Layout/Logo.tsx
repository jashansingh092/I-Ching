export default function Logo({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={`
        flex items-center cursor-pointer group
        ${collapsed ? "justify-center w-full" : "gap-4"}
      `}
    >
      {/* ICON */}
      <div className="relative">
        <svg
          width={collapsed ? 42 : 58}
          height={collapsed ? 42 : 58}
          viewBox="0 0 100 100"
          className="group-hover:scale-110 transition-transform duration-300"
        >
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="#020617"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Yin-Yang base */}
          {/* <path d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 0 50 2" fill="#f8fafc" />
          <path
            d="M50 98 A48 48 0 0 1 50 2 A24 24 0 0 0 50 98"
            fill="#020617"
          /> */}

          {/* ORBIT SYSTEM */}
          <g className="animate-orbit">
            {/* subtle glow behind colored dot */}
            <circle cx="50" cy="75" r="8" fill="#a78bfa" opacity="0.15" />

            {/* dots */}
            <circle cx="50" cy="25" r="5" fill="#f8fafc" />
            <circle cx="50" cy="75" r="5" fill="url(#orbGrad)" />
          </g>

          {/* Gradient */}
          <defs>
            <radialGradient id="orbGrad">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a78bfa" />
            </radialGradient>

            {/* smoother directional fade */}
            <linearGradient id="trailGrad" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
              <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="trailGradWhite" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>

            {/* blur = removes “rectangular stroke feel” */}
            <filter id="trailBlur">
              <feGaussianBlur stdDeviation="100" />
            </filter>
          </defs>
        </svg>

        {/* glow aura */}
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
      </div>

      {/* TEXT */}
      {!collapsed && (
        <span className="text-3xl font-bold text-white tracking-tight whitespace-nowrap opacity-90 group-hover:opacity-100 transition">
          I Ching
        </span>
      )}
    </div>
  );
}
