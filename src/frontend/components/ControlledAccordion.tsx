import { ReactNode, SyntheticEvent, useState } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Box from '@mui/material/Box'

type AccordionItem = {
  title: string
  content: ReactNode
}

type ControlledAccordionProps = {
  items: AccordionItem[]
}

export default function ControlledAccordion({
  items,
}: ControlledAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <AccordionWrapper>
      {items.map(({ title, content }) => (
        <Accordion
          key={title}
          expanded={expanded === title}
          onChange={handleChange(title)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
      ))}
    </AccordionWrapper>
  )
}

const AccordionWrapper = styled(Box)`
  width: 100%;
`
