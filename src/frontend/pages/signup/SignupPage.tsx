'use client'
import { useState, useMemo, useEffect, KeyboardEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, TextField, Button, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from '@/frontend/store/hooks'
import {
  createNewUser,
  verifyUserToken,
} from '@/frontend/store/user/userActions'
import {
  selectUserIsLogged,
  selectUserLoginHasFailed,
  selectUserLoginLoading,
} from '@/frontend/store/user/userSelectors'
import CreateUserEndpoint from '@/endpoints/CreateUserEndpoint'

const DEFAULT_PAGE_AFTER_SIGNUP = '/dashboard'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const isLogged = useSelector(selectUserIsLogged)
  const isLoading = useSelector(selectUserLoginLoading)
  const hasFailed = useSelector(selectUserLoginHasFailed)

  useEffect(() => {
    dispatch(verifyUserToken({ canRetryWithRefreshToken: false }))
  }, [dispatch])

  useEffect(() => {
    if (isLogged) {
      const nextPage = searchParams.get('redirect') || DEFAULT_PAGE_AFTER_SIGNUP
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
      password1 &&
      password1 === password2 &&
      !isLoading &&
      !isLogged &&
      CreateUserEndpoint.requestSchema.safeParse({
        email,
        password: password1,
        firstName,
        lastName,
      }).success === true
    )
  }, [isLoading, isLogged, email, password1, password2, firstName, lastName])

  const handleSubmit = async () => {
    await dispatch(
      createNewUser({ email, password: password1, firstName, lastName })
    )
  }

  const onEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (canSubmit && event.key === 'Enter') {
      handleSubmit()
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  return (
    <PageWrapper maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
      </Typography>
      <TextField
        label="Email *"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onKeyDown={onEnter}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password *"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password1}
        onKeyDown={onEnter}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <TextField
        label="Repeat Password *"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password2}
        onKeyDown={onEnter}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={firstName}
        onKeyDown={onEnter}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={lastName}
        onKeyDown={onEnter}
        onChange={(e) => setLastName(e.target.value)}
      />
      <ButtonWithMargin
        variant="contained"
        color="primary"
        fullWidth
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Signup
      </ButtonWithMargin>
      <ButtonWithMargin
        variant="contained"
        fullWidth
        onClick={goToLogin}
        biggerMargin
      >
        Or Login
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
