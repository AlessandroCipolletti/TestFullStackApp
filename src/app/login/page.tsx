'use client'
import { useState, useMemo, useEffect } from 'react'
import { Container, TextField, Button, Typography, styled } from '@mui/material'
import { useDispatch, useSelector } from '@/store/hooks'
import { loginUser, LoginStatus } from '@/store/user/userReducer'
import { selectUserLoginStatus } from '@/store/user/userSelectors'
import LoginEndpoint from '@/app/api/user/login/LoginEndpoint'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const loginStatus = useSelector(selectUserLoginStatus)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (loginStatus === LoginStatus.LOGGED) {
      router.push('/dashboard')
    }
  }, [loginStatus, router])

  const canSubmit = useMemo(() => {
    return (
      email &&
      password &&
      loginStatus !== LoginStatus.LOADING &&
      loginStatus !== LoginStatus.LOGGED &&
      LoginEndpoint.requestSchema.safeParse({ email, password }).success ===
        true
    )
  }, [loginStatus, email, password])

  const handleSubmit = async () => {
    await dispatch(loginUser({ email, password }))
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
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
      {loginStatus === LoginStatus.ERROR && (
        <ErrorMessage color="error">Error message</ErrorMessage>
      )}
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
