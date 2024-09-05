const ACCESS_TOKEN_COOKIE_NAME = 'access_token' // process.env.ACCESS_TOKEN_COOKIE_NAME
const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token' // process.env.REFRESH_TOKEN_COOKIE_NAME

export const getAccessTokenCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${ACCESS_TOKEN_COOKIE_NAME}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null
  }

  return null
}

export const setAccessTokenCookie = (token: string) => {
  // document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60}; Secure; SameSite=Strict`;
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60}; SameSite=Strict`
}

export const emptyAccessTokenCookie = () => {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; Max-Age=0`
}

export const getRefreshTokenCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${REFRESH_TOKEN_COOKIE_NAME}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null
  }

  return null
}

export const setRefreshTokenCookie = (token: string) => {
  // document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`
  document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
}

export const emptyRefreshTokenCookie = () => {
  document.cookie = `${REFRESH_TOKEN_COOKIE_NAME}=; Max-Age=0`
}
