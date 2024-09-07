import { useCallback } from 'react'
import theme from '@/frontend/theme'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import getObjectKeys from '@/utils/getObjectKeys'

export default function ThemeShadows() {
  const renderShadow = useCallback(
    (shadowKey: keyof typeof theme.shadows, index: number) => {
      const shadow = theme.shadows[shadowKey]
      if (typeof shadow !== 'string') {
        return null
      }

      return (
        <ShadowWrapper key={shadow}>
          <ShadowBox shadow={shadow} />
          <ShadowLabel>shadow[{index}]</ShadowLabel>
        </ShadowWrapper>
      )
    },
    []
  )

  return <Box>{getObjectKeys(theme.shadows).map(renderShadow)}</Box>
}

const ShadowWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`

const ShadowBox = styled(Box)<{ shadow: string }>(({ shadow }) => ({
  width: 50,
  height: 50,
  backgroundColor: theme.palette.background.paper,
  display: 'inline-block',
  borderRadius: theme.shape.borderRadius,
  boxShadow: shadow,
  margin: '10px 0px',
}))

const ShadowLabel = styled.span`
  color: ${theme.palette.text.primary};
  font-size: 0.8rem;
  line-height: 1.4;
`
