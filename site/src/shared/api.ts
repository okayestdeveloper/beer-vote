/**
 * Convert an API path to a full API URL.
 *
 * @param {string} path the path to the resource, starting after <host>/api
 * @returns {string}
 */
export function apiUrl(path: string): string {
  const host = `${process.env.REACT_APP_API_HOST}`;
  const project = process.env.REACT_APP_FIREBASE_PROJECT
    ? `/${process.env.REACT_APP_FIREBASE_PROJECT}`
    : '';
  const region = process.env.REACT_APP_FIREBASE_REGION
    ? `/${process.env.REACT_APP_FIREBASE_REGION}`
    : '';
  return `//${host}${project}${region}/api${path}`;
}
