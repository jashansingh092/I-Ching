import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  BookOpen,
  Layers,
  Grid3X3,
  Shuffle,
  Network,
  Database,
  Menu,
} from "lucide-react";

import Logo from "./Logo";

const navItems = [
  { to: "/", label: "Foundations", icon: BookOpen },
  { to: "/trigrams", label: "Trigrams", icon: Layers },
  { to: "/hexagrams", label: "Hexagrams", icon: Grid3X3 },
  { to: "/lab", label: "Transformation Lab", icon: Shuffle },
  { to: "/graph", label: "Graph", icon: Network },
  { to: "/ontology", label: "Ontology", icon: Database },
];

export default function Sidebar() {
  const [width, setWidth] = useState(260);

  const minWidth = 80;
  const maxWidth = 400;
  const collapsed = width < 200;

  return (
    <div
      style={{ width }}
      className="sticky top-0  shrink-0 flex flex-col bg-neutral-950 border-r border-neutral-800 p-4 transition-[width] duration-200"
    >
      {/* ===== Top Bar ===== */}
      <div className="flex items-center justify-between mb-6">
        <Logo
          collapsed={collapsed}
          onToggle={() => setWidth(collapsed ? 260 : minWidth)}
        />

        {!collapsed && (
          <button
            onClick={() => setWidth(minWidth)}
            className="p-2 rounded-lg hover:bg-neutral-800 transition"
          >
            <Menu size={18} />
          </button>
        )}
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex flex-col gap-2 text-sm">
        {navItems.map((item, i) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                group flex items-center gap-3 px-3 py-2 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }
              `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon */}
                  <div
                    className={`
                      transition-all
                      ${
                        isActive
                          ? "text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]"
                          : "group-hover:text-white"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Label */}
                  {!collapsed && (
                    <span className="whitespace-nowrap">
                      {i + 1}. {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ===== Footer ===== */}
      {!collapsed && (
        <div className="mt-auto pt-6 text-xs text-neutral-500">
          v0.1 • System Explorer
        </div>
      )}

      {/* ===== Resize Handle ===== */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();

          const startX = e.clientX;
          const startWidth = width;

          const handleMouseMove = (e: MouseEvent) => {
            const newWidth = Math.min(
              maxWidth,
              Math.max(minWidth, startWidth + (e.clientX - startX))
            );

            setWidth(newWidth);
          };

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
        className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize bg-neutral-800 hover:bg-blue-500 transition"
      />
    </div>
  );
}