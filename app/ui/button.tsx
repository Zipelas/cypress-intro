'use client';

import Link from 'next/link';
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';

type Variants = 'primary' | 'outline' | 'ghost';
type Sizes = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: Variants;
  size?: Sizes;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | AnchorProps;

export default function Button(props: Props) {
  const {
    variant = 'outline',
    size = 'md',
    fullWidth,
    className,
    children,
    ...rest
  } = props as Props;

  const base =
    'inline-flex items-center justify-center rounded-3xl transition disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes: Record<Sizes, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-xl px-5 py-3',
  };
  const variants: Record<Variants, string> = {
    primary: 'bg-sky-600 text-black border border-sky-600',
    outline: 'text-sky-600 border-4 border-sky-600',
    ghost: 'text-sky-600',
  };

  const classes = [
    base,
    sizes[size],
    variants[variant],
    fullWidth ? 'w-full' : '',
    className ?? '',
  ]
    .join(' ')
    .trim();

  // Om href finns → rendera en länk som ser ut som en knapp
  if ('href' in props && props.href) {
    const { href, ...linkRest } = rest as AnchorProps;
    return (
      <Link
        href={href}
        className={classes}
        {...linkRest}>
        {children}
      </Link>
    );
  }

  // Annars → vanlig knapp
  const { type = 'button', ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={type}
      className={classes}
      {...buttonRest}>
      {children}
    </button>
  );
}

// 'use client';

// import { PropsWithChildren } from 'react';

// // interface

// export default function Button(props: PropsWithChildren) {
//   return (
//     <button className=' text-sky-600 text-2xl border-4 border-sky-600 rounded-4xl p-2'>
//       {props.children}
//     </button>
//   );
// }
