/**
 * redirectHelper.js
 * Preserves and restores intended URL across authentication flow
 */

const REDIRECT_KEY = 'adaptui_intended_url'

const saveIntendedUrl = (url) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(REDIRECT_KEY, url)
  }
}

const getIntendedUrl = (fallback = '/dashboard') => {
  if (typeof sessionStorage !== 'undefined') {
    const url = sessionStorage.getItem(REDIRECT_KEY)
    sessionStorage.removeItem(REDIRECT_KEY)
    return url || fallback
  }
  return fallback
}

module.exports = { saveIntendedUrl, getIntendedUrl }
