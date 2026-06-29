import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-wider uppercase transition-all duration-500 ease-out";

  const variants = {
    primary:
      "bg-bronze text-background hover:bg-bronze/90 hover:shadow-[0_0_30px_rgba(184,138,90,0.3)]",
    outline:
      "border border-bronze/60 text-bronze hover:bg-bronze/10 hover:border-bronze",
    ghost: "text-silver hover:text-white",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-xs",
    md: "px-8 py-3.5 text-xs md:text-sm",
    lg: "px-10 py-4 text-sm md:text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
