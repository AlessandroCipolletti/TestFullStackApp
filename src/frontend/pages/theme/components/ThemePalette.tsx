import { useCallback } from 'react'
import theme from '@/frontend/theme'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import getObjectKeys from '@/utils/getObjectKeys'

export default function ThemePalette() {
  const renderPaletteColor = useCallback(
    (color: keyof typeof theme.palette) => {
      const paletteColor = theme.palette[color]
      if (typeof paletteColor !== 'object') {
        return null
      }

      return (
        <Box key={color}>
          <Typography variant="h6">{color}</Typography>
          {getObjectKeys(paletteColor).map((key) => (
            <ColorWrapper key={key}>
              <ColorLabel>{key}</ColorLabel>
              <Color color={paletteColor[key]} />
              <ColorLabel>{paletteColor[key]}</ColorLabel>
            </ColorWrapper>
          ))}
        </Box>
      )
    },
    []
  )

  return <Box>{getObjectKeys(theme.palette).map(renderPaletteColor)}</Box>
}

const ColorWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`

const Color = styled(Box)<{ color: string }>`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color};
  display: inline-block;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows[2]};
  margin: 10px 0px;
`

const ColorLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.8rem;
  line-height: 1.4;
`
