'use client'
import React from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import DynamicGrid from '@/frontend/components/DynamicGrid'
import PageWrapper from '@/frontend/components/PageWrapper'

export default function DashboardPage() {
  const gridConfig = {
    columnGap: 10,
    rowGap: 10,
    templateRows: [
      {
        height: 300,
        areas: [1, 2, 2],
      },
      {
        height: 300,
        areas: [3, 4, 5],
      },
      {
        height: 300,
        areas: [6, 6, 7],
      },
    ],
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Benvenuto nel Dashboard
      </Typography>
      <Typography>
        Seleziona un&apos;opzione dal menu a sinistra per iniziare.
      </Typography>
      <PageWrapper>
        <DynamicGrid config={gridConfig}>
          <Element index={1}>
            <img
              src="https://cms.imgworlds.com/assets/e3873302-212a-4c3a-aab3-c3bee866903c.jpg"
              alt=""
            />
          </Element>
          <Element index={2}>
            <img
              src="https://world-schools.com/fr/wp-content/uploads/sites/13/2023/05/IMG-Academy-cover-WS.webp"
              alt=""
            />
          </Element>
          <Element index={3}>
            <img
              src="https://www.ideawebtv.it/wp-content/uploads/2023/06/OASIS-PHOTOCONTEST2.jpg"
              alt=""
            />
          </Element>
          <Element index={4}>
            <img
              src="https://img.freepik.com/photos-premium/belle-illustration-coeur-paysage-ai-generative_791316-7419.jpg"
              alt=""
            />
          </Element>
          <Element index={5}>
            <img
              src="https://www.keblog.it/wp-content/uploads/2019/12/le-piu-belle-foto-del-2019-15.jpg"
              alt=""
            />
          </Element>
          <Element index={6}>
            <img
              src="https://i0.wp.com/fotografinviaggio.it/wp-content/uploads/2023/04/Immagine-copertina-per-blog-2-21.jpg"
              alt=""
            />
          </Element>
          <Element index={7}>
            <img
              src="https://www.nationalgeographic.it/upload/ngi-hero/cover-1685960847724-Hero_100.jpg"
              alt=""
            />
          </Element>
        </DynamicGrid>
      </PageWrapper>
    </div>
  )
}

const Element = styled('div')<{ index: number }>(({ index }) => ({
  position: 'relative',
  gridArea: `A${index}`,
  borderRadius: 10,
  overflow: 'hidden',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}))
