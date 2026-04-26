import { useEffect, useRef } from "react";

export default function HexGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // clear
    svg.innerHTML = "";

    // test node
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "200");
    circle.setAttribute("cy", "200");
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "#60a5fa");

    svg.appendChild(circle);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full h-[600px]"
    />
  );
}