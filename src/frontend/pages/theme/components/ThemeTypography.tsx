import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const TYPOGRAPHY_VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'overline',
  'inherit',
] as const

export default function ThemeTypography() {
  return (
    <Wrapper>
      {TYPOGRAPHY_VARIANTS.map((typographyKey) => {
        return (
          <TypographyWrapper id="WRAPPEEEER" key={typographyKey}>
            <Typography variant={typographyKey}>{typographyKey}</Typography>
          </TypographyWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`

const TypographyWrapper = styled(Box)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
`
