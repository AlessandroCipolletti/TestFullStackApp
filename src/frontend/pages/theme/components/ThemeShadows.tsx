import { useCallback } from 'react'
import theme from '@/frontend/theme'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getObjectKeys } from '@/utils/typescriptUtils'

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

const ShadowBox = styled(Box)<{ shadow: string }>`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: inline-block;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ shadow }) => shadow};
  margin: 10px 0px;
`

const ShadowLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.8rem;
  line-height: 1.4;
`
