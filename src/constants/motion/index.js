export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const defaultFadeInScaleVariants = {
  initial: {
    scale: 0.4,
    opacity: 0,
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: "opacity, transform",
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: defaultEasing },
    willChange: "opacity, transform",
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.8, ease: defaultEasing },
    willChange: "opacity, transform",
  },
};

export const FadeInUpVariants = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.8, ease: defaultEasing },
    willChange: "opacity, transform",
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: defaultEasing },
    willChange: "opacity, transform",
  },
};
