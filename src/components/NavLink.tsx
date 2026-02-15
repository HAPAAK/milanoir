import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  isActive?: boolean;
  isPending?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, isActive, isPending, ...props }, ref) => {
    const computedClassName = cn(
      className,
      isActive && activeClassName,
      isPending && pendingClassName,
    );

    return <Link ref={ref} {...props} className={computedClassName} />;
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
