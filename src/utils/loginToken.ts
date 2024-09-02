export const getTokenCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${process.env.TOKEN_COOKIE_NAME}=`)

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null
  }

  return null
}

export const setTokenCookie = (token: string) => {
  // document.cookie = `${process.env.TOKEN_COOKIE_NAME}=${token}; path=/; max-age=3600; Secure; SameSite=Strict`;
  document.cookie = `${process.env.TOKEN_COOKIE_NAME}=${token}; path=/; max-age=3600; SameSite=Strict`
}

export const emptyTokenCookie = () => {
  document.cookie = `${process.env.TOKEN_COOKIE_NAME}=; Max-Age=0`
}
