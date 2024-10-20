'use client'
import { useState, useMemo, useEffect, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, TextField, Button, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from '@/frontend/store/hooks'
import { loginUser, verifyUserToken } from '@/frontend/store/user/userActions'
import {
  selectUserIsLogged,
  selectUserLoginHasFailed,
  selectUserLoginLoading,
} from '@/frontend/store/user/userSelectors'
import LoginEndpoint from '@/endpoints/LoginEndpoint'

const DEFAULT_PAGE_AFTER_LOGIN = '/dashboard'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogged = useSelector(selectUserIsLogged)
  const isLoading = useSelector(selectUserLoginLoading)
  const hasFailed = useSelector(selectUserLoginHasFailed)

  useEffect(() => {
    dispatch(verifyUserToken({ canRetryWithRefreshToken: false }))
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
    // await dispatch(createNewUser({ email, password, firstName: 'firstName' }))
    await dispatch(loginUser({ email, password }))
  }

  const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (canSubmit && event.key === 'Enter') {
      handleSubmit()
    }
  }

  const goToSignup = () => {
    router.push('/signup')
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
      <ButtonWithMargin
        variant="contained"
        color="primary"
        fullWidth
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Login
      </ButtonWithMargin>
      <ButtonWithMargin
        variant="contained"
        color="primary"
        fullWidth
        onClick={goToSignup}
        biggerMargin
      >
        Or create an account
      </ButtonWithMargin>
      {hasFailed && <ErrorMessage color="error">Error message</ErrorMessage>}
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

const ButtonWithMargin = styled(Button)<{ biggerMargin?: boolean }>`
  margin-top: ${({ biggerMargin }) => (biggerMargin ? '48px' : '16px')};
`

const ErrorMessage = styled(Typography)`
  margin-top: 16px;
`
