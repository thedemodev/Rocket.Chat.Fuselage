import { useMediaQueries } from './useMediaQueries';

/**
 * Hook to listen to a media query.
 *
 * @param query - the CSS3 media query expression
 * @return `true` if the media query matches; `false` is it does not match or the query is not defined
 */
export const useMediaQuery = (query?: string): boolean =>
  !!useMediaQueries(...query ? [query] : [])[0];
