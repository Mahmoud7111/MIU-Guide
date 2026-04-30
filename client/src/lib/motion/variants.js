/**
 * @fileoverview Framer Motion animation variant definitions for MIU.
 *
 * Usage pattern:
 *   import { fadeUp, staggerContainer } from '@/lib/motion/variants';
 *   <motion.div variants={fadeUp} initial="hidden" animate="visible" />
 *
 * Rules:
 *  - Parent containers that orchestrate children use staggerContainer.
 *  - Individual list/grid items use staggerItem.
 *  - Page-level wrappers use pageTransition.
 *  - Card hover effects use cardHover with whileHover="hover".
 *  - Modal dialogs use modalVariant + backdropVariant.
 */

/* -------------------------------------------------------------------------- */
/*                              ENTRANCE VARIANTS                               */
/* -------------------------------------------------------------------------- */

/**
 * Fades an element in while sliding it up 24 px.
 * Use on hero headings, section intros, and standalone cards.
 * @type {import('framer-motion').Variants}
 */
export const fadeUp = {
  offscreen: {
    opacity: 0,
    y: 40,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Simple opacity fade — no positional movement.
 * Use on images, background overlays, or decorative elements where
 * movement would be distracting.
 * @type {import('framer-motion').Variants}
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Slides an element in from the right (positive x).
 * Use on drawer panels, right-side content, or sequential list items
 * entering from the trailing edge.
 * @type {import('framer-motion').Variants}
 */
export const slideInRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Slides an element in from the left (negative x).
 * Use on sidebar entrances, back-navigation reveals, or left-aligned
 * content blocks in alternating layouts..
 * @type {import('framer-motion').Variants} 
 */
export const slideInLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/**
 * Scales an element up from 90 % while fading in.
 * Use on badges, chips, avatar bubbles, and small pop-in elements.
 * @type {import('framer-motion').Variants}
 */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                             STAGGER VARIANTS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Parent container that orchestrates staggered children.
 * Wrap lists, grids, or any group of staggerItem children with this variant.
 * Apply to the <motion.ul>, <motion.div>, etc. that directly wraps the items.
 * @type {import('framer-motion').Variants}
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Individual child of a staggerContainer.
 * Identical motion to fadeUp but with a shorter duration so rapid
 * staggered sequences feel crisp rather than slow.
 * @type {import('framer-motion').Variants}
 */
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                              HOVER VARIANTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Card lift-and-shadow hover effect.
 * Use with `whileHover="hover"` (NOT initial/animate) on card wrappers.
 * Raises the card 6 px and applies the CSS custom property shadow.
 *
 * Example:
 *   <motion.div variants={cardHover} whileHover="hover" whileTap={{ scale: 0.98 }}>
 * @type {import('framer-motion').Variants}
 */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: 'var(--shadow-card)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  hover: {
    y: -6,
    boxShadow: 'var(--shadow-hover)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

/* -------------------------------------------------------------------------- */
/*                              MODAL VARIANTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Dialog / modal panel animation.
 * Scales the panel from 95 % to 100 % while fading in.
 * Pair with backdropVariant on the overlay element.
 * @type {import('framer-motion').Variants}
 */
export const modalVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Semi-transparent backdrop for modals and drawers.
 * Fades from fully transparent to 50 % opacity.
 * Always use with AnimatePresence so the exit transition runs on unmount.
 * @type {import('framer-motion').Variants}
 */
export const backdropVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.5,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/* -------------------------------------------------------------------------- */
/*                            PAGE TRANSITION                                   */
/* -------------------------------------------------------------------------- */

/**
 * Top-level page wrapper animation driven by React Router route changes.
 * Wrap each page component's root element with this variant.
 * Slides content up 16 px on enter, slides up -16 px (upward exit) on leave.
 *
 * Example:
 *   <motion.main variants={pageTransition} initial="hidden" animate="visible" exit="exit">
 * @type {import('framer-motion').Variants}
 */
export const pageTransition = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                             PROGRESS BAR                                     */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal progress / attendance bar fill animation.
 * Apply to the inner fill element; set transform-origin to left so the bar
 * grows from its leading edge.
 *
 * Usage:
 *   <motion.div
 *     className="bar-fill"
 *     variants={progressBar}
 *     initial="hidden"
 *     animate="visible"
 *     style={{ transformOrigin: 'left', scaleX: attendancePercent / 100 }}
 *   />
 *
 * Note: combine with a custom `transition` override when you need to match
 * a specific percentage width, since scaleX is relative to the element width.
 * @type {import('framer-motion').Variants}
 */
export const progressBar = {
  hidden: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                            COMPONENT SPECIFIC                                */
/* -------------------------------------------------------------------------- */

/**
 * Animated underline for Navbar links.
 * @type {import('framer-motion').Variants}
 */
export const navIndicator = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    scaleX: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

/**
 * Active indicator for Sidebar items.
 * @type {import('framer-motion').Variants}
 */
export const sidebarIndicator = {
  hidden: { opacity: 0, x: -5 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    x: -5,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

/** Hamburger top bar variant */
export const hamburgerTop = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

/** Hamburger middle bar variant */
export const hamburgerMiddle = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

/** Hamburger bottom bar variant */
export const hamburgerBottom = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};
