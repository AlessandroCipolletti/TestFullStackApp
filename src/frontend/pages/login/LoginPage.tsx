'use client'
import { useState, useMemo, useEffect, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, TextField, Button, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from '@/frontend/store/hooks'
import { loginUser } from '@/frontend/store/user/userReducer'
import {
  selectUserIsLogged,
  selectUserLoginHasError,
  selectUserLoginLoading,
} from '@/frontend/store/user/userSelectors'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import { verifyUserToken } from '@/frontend/store/user/userReducer'

const DEFAULT_PAGE_AFTER_LOGIN = '/dashboard'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogged = useSelector(selectUserIsLogged)
  const isLoading = useSelector(selectUserLoginLoading)
  const hasError = useSelector(selectUserLoginHasError)

  console.log({ isLogged })

  useEffect(() => {
    dispatch(verifyUserToken())
  }, [dispatch])

  useEffect(() => {
    if (isLogged) {
      const nextPage = searchParams.get('redirect') || DEFAULT_PAGE_AFTER_LOGIN
      const nextParams = new URLSearchParams(searchParams.toString())
      nextParams.delete('redirect')

      if (nextParams.size > 0) {
        router.push(`${nextPage}?${nextParams.toString()}`)
      } else {
        router.push(
          `${nextPage}${nextParams.size > 0 ? `?${nextParams.toString()}` : ''}`
        )
      }
    }
  }, [isLogged, router, searchParams])

  const canSubmit = useMemo(() => {
    return (
      email &&
      password &&
      !isLoading &&
      !isLogged &&
      LoginEndpoint.requestSchema.safeParse({ email, password }).success ===
        true
    )
  }, [isLoading, isLogged, email, password])

  const handleSubmit = async () => {
    await dispatch(loginUser({ email, password }))
  }

  const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (canSubmit && event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <PageWrapper maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onKeyDown={onEnter}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onKeyDown={onEnter}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Login
      </Button>
      {hasError && <ErrorMessage color="error">Error message</ErrorMessage>}
    </PageWrapper>
  )
}

const PageWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const ErrorMessage = styled(Typography)`
  margin-top: 16px;
`
