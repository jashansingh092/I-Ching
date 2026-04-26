import { useHexagramStore } from "../../store/useHexagramStore";

type Props = {
  lines?: (0 | 1)[];
  changing?: boolean[];
};

export default function HexagramView({
  lines: propLines,
  changing: propChanging,
}: Props) {
  const {
    lines: storeLines,
    changing: storeChanging,
    toggleLine,
    toggleChanging,
  } = useHexagramStore();

  const lines = propLines ?? storeLines;
  const changing = propChanging ?? storeChanging;

  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => {
        const isChanging = changing?.[i];

        return (
          <div
            key={i}
            onClick={(e) => {
              if (propLines) return; // disable interaction for transformed

              if (e.shiftKey) toggleChanging(i);
              else toggleLine(i);
            }}
            className="cursor-pointer"
          >
            {/* YANG (solid line) */}
            {line === 1 ? (
              <div
                className={`h-2 w-40 rounded transition-all duration-500 ${
                  isChanging
                    ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
                    : "bg-white/90"
                }`}
              />
            ) : (
              /* YIN (broken line) */
              <div className="flex gap-2">
                <div
                  className={`
                    h-2 w-16 rounded transition-all duration-300
                    ${
                      isChanging
                        ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)] scale-105"
                        : "bg-white"
                    }
                  `}
                />
                <div
                  className={`
                    h-2 w-16 rounded transition-all duration-300
                    ${
                      isChanging
                        ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)] scale-105"
                        : "bg-white"
                    }
                  `}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
