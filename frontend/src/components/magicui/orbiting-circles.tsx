import { cn } from "/Users/ngoni/Desktop/Summer 2025 Projects/ZimFIP/frontend/src/lib/utils.js";
import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number; // seconds
  delay?: number; // seconds (optional, unused currently)
  radius?: number; // pixels
  path?: boolean;
  iconSize?: number; // pixels
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  radius = 100,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const count = React.Children.count(children);
        const angle = (360 / count) * index;

        return (
          <div
            style={
              {
                "--duration": `${calculatedDuration}s`, // add seconds unit!
                "--radius": `${radius}px`, // add px unit!
                "--angle": `${angle}`, // angle is number, no unit
                "--icon-size": `${iconSize}px`, // add px unit!
              } as React.CSSProperties
            }
            className={cn(
              "absolute flex transform-gpu items-center justify-center rounded-full",
              "animate-orbit",
              { "[animation-direction:reverse]": reverse },
              className,
              `w-[var(--icon-size)] h-[var(--icon-size)]` // size from var
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
