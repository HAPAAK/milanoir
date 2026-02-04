/**
 * audioEvents - Cross-component events for controlling theme music.
 *
 * We keep these event names in a single place to avoid circular imports
 * (e.g., modal/hooks importing UI components).
 */

export const PAUSE_THEME_MUSIC = "pauseThemeMusic";
export const RESUME_THEME_MUSIC = "resumeThemeMusic";
