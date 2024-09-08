import { useCallback } from 'react'
import * as Colors from '@mui/material/colors'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import getObjectKeys from '@/utils/getObjectKeys'

export default function ThemeColors() {
  const renderColor = useCallback((color: keyof typeof Colors) => {
    const colorShades = Colors[color]
    if (typeof colorShades !== 'object') {
      return null
    }

    return (
      <Box key={color}>
        <Typography variant="h6">{color}</Typography>
        {getObjectKeys(colorShades).map((key) => (
          <ColorWrapper key={key}>
            <ColorLabel>{key}</ColorLabel>
            <Color color={colorShades[key]} />
            <ColorLabel>{colorShades[key]}</ColorLabel>
          </ColorWrapper>
        ))}
      </Box>
    )
  }, [])

  return <Box>{getObjectKeys(Colors).map(renderColor)}</Box>
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
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  margin: 10px 0px;
`

const ColorLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.8rem;
  line-height: 1.4;
`
