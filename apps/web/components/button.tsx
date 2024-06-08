import React from "react";

interface SharedProps
  extends Partial<
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">
  > {
  className?: string;
}

interface ButtonProps extends SharedProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode | React.ReactNode[];
  href?: string;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement | null, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "medium", ...otherProps } = props;

    const classes = "primary";
    const defaultEl = props.href ? "a" : "button";

    return React.createElement(defaultEl, {
      ref,
      size,
      variant,
      className: classes,
      "data-testid": "root",
      ...otherProps,
    } as ButtonProps);
  },
);

export { Button };
