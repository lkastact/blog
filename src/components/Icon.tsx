import type { SVGProps } from "react";

type Shape = ["path", { d: string }] | ["circle", { cx: number; cy: number; r: number }] | ["rect", { x: number; y: number; width: number; height: number; rx: number }];

const ICONS = {
  plane: [["path", { d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" }]],
  bus: [["path", { d: "M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3M9 18h5" }], ["circle", { cx: 7, cy: 18, r: 2 }], ["circle", { cx: 16, cy: 18, r: 2 }]],
  map: [["path", { d: "M14.1 5.55a2 2 0 0 0 1.8 0l3.65-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.55 2.27a2 2 0 0 1-1.8 0l-4.2-2.1a2 2 0 0 0-1.8 0l-3.65 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9L8.1 3.45a2 2 0 0 1 1.8 0zM15 5.76v15M9 3.24v15" }]],
  backpack: [["path", { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM8 10h8M8 18h8M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" }]],
  compass: [["circle", { cx: 12, cy: 12, r: 10 }], ["path", { d: "m16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27L7.76 16.24l1.8-5.41a2 2 0 0 1 1.27-1.27z" }]],
  search: [["circle", { cx: 11, cy: 11, r: 7.5 }], ["path", { d: "m21 21-4.6-4.6" }]],
  menu: [["path", { d: "M4 7h16M4 12h16M4 17h16" }]],
  close: [["path", { d: "M18 6 6 18M6 6l12 12" }]],
  "arrow-right": [["path", { d: "M5 12h14M13 6l6 6-6 6" }]],
  "arrow-left": [["path", { d: "M19 12H5M11 18l-6-6 6-6" }]],
  mail: [["rect", { x: 2.5, y: 4.5, width: 19, height: 15, rx: 2 }], ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }]],
  phone: [["path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" }]],
  pin: [["path", { d: "M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0" }], ["circle", { cx: 12, cy: 10, r: 3 }]],
  check: [["circle", { cx: 12, cy: 12, r: 10 }], ["path", { d: "m8 12 3 3 5-6" }]],
  alert: [["circle", { cx: 12, cy: 12, r: 10 }], ["path", { d: "M12 7v6M12 16.5v.5" }]],
  clock: [["circle", { cx: 12, cy: 12, r: 9.5 }], ["path", { d: "M12 7v5l3 2" }]],
  calendar: [["rect", { x: 3, y: 4.5, width: 18, height: 17, rx: 2 }], ["path", { d: "M16 2.5v4M8 2.5v4M3 10h18" }]],
  link: [["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof ICONS;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & { name: IconName; size?: number; label?: string };

/** Ícones de traço da marca. Herdam a cor do texto (currentColor). */
export function Icon({ name, size = 20, label, className, ...rest }: IconProps) {
  const shapes: Shape[] = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={["inline-block shrink-0", className].filter(Boolean).join(" ")}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      {...rest}
    >
      {shapes.map(([tag, attrs], i) => {
        if (tag === "path") return <path key={i} {...attrs} />;
        if (tag === "circle") return <circle key={i} {...attrs} />;
        return <rect key={i} {...attrs} />;
      })}
    </svg>
  );
}
