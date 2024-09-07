'use client'
import theme from '@/frontend/theme'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ControlledAccordion from '@/frontend/components/ControlledAccordion'
import ThemePalette from './components/ThemePalette'
import ThemeShadows from './components/ThemeShadows'
import ThemeSpacing from './components/ThemeSpacing'

export default function ThemePage() {
  console.log(theme)
  const items = [
    {
      title: 'Palette',
      content: <ThemePalette />,
    },
    {
      title: 'Shadows',
      content: <ThemeShadows />,
    },
    {
      title: 'Spacing',
      content: <ThemeSpacing />,
    },
  ]

  return (
    <PageWrapper>
      <PageTitle variant="h3">Theme</PageTitle>
      <ControlledAccordion items={items} />
    </PageWrapper>
  )
}

const PageWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 900px;
  padding-top: 40px;
`

const PageTitle = styled(Typography)`
  margin-bottom: ${theme.spacing(4)};
`
