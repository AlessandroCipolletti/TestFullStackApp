export const getAccessTokenCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(
    `; ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_NAME}=`
  )

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null
  }

  return null
}

export const setAccessTokenCookie = (token: string) => {
  // document.cookie = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60}; Secure; SameSite=Strict`;
  document.cookie = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60}; SameSite=Strict`
}

export const emptyAccessTokenCookie = () => {
  document.cookie = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_NAME}=; Max-Age=0`
}

export const getRefreshTokenCookie = () => {
  const value = `; ${document.cookie}`
  const parts = value.split(
    `; ${process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME}=`
  )

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null
  }

  return null
}

export const setRefreshTokenCookie = (token: string) => {
  // document.cookie = `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`
  document.cookie = `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
}

export const emptyRefreshTokenCookie = () => {
  document.cookie = `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME}=; Max-Age=0`
}
