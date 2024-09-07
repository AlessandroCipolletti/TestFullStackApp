import { useCallback } from 'react'
import theme from '@/frontend/theme'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'

const SPACING_KEYS = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24, 28,
  32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
] as const

export default function ThemeSpacing() {
  const renderSpacing = useCallback((spacingKey: number) => {
    console.log(spacingKey)
    const spacing = theme.spacing(spacingKey)

    return (
      <SpacingWrapper key={spacing}>
        <SpacingLabel>spacing({spacingKey})</SpacingLabel>
        <SpacingBox width={spacing} />
        <SpacingLabel>{theme.spacing(spacingKey)}</SpacingLabel>
      </SpacingWrapper>
    )
  }, [])

  return <Box>{SPACING_KEYS.map(renderSpacing)}</Box>
}

const SpacingWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`

const SpacingBox = styled(Box)<{ width: string }>(({ width }) => ({
  width,
  height: 10,
  display: 'inline-block',
  backgroundColor: theme.palette.divider,
  margin: '10px 0px',
}))

const SpacingLabel = styled.span`
  color: ${theme.palette.text.primary};
  font-size: 0.8rem;
  line-height: 1.4;
`
