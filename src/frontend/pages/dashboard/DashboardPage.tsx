'use client'
import React from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import DynamicGrid from '@/frontend/components/DynamicGrid'
import PageWrapper from '@/frontend/components/PageWrapper'

export default function DashboardPage() {
  const urls = [
    'https://www.nationalgeographic.it/upload/ngi-hero/cover-1685960847724-Hero_100.jpg',
    'https://www.ideawebtv.it/wp-content/uploads/2023/06/OASIS-PHOTOCONTEST2.jpg',
    'https://world-schools.com/fr/wp-content/uploads/sites/13/2023/05/IMG-Academy-cover-WS.webp',
    'https://img.freepik.com/photos-premium/belle-illustration-coeur-paysage-ai-generative_791316-7419.jpg',
    'https://www.keblog.it/wp-content/uploads/2019/12/le-piu-belle-foto-del-2019-15.jpg',
    'https://i0.wp.com/fotografinviaggio.it/wp-content/uploads/2023/04/Immagine-copertina-per-blog-2-21.jpg',
    'https://www.nationalgeographic.it/upload/ngi-hero/cover-1685960847724-Hero_100.jpg',
    'https://cms.imgworlds.com/assets/e3873302-212a-4c3a-aab3-c3bee866903c.jpg',
    'https://world-schools.com/fr/wp-content/uploads/sites/13/2023/05/IMG-Academy-cover-WS.webp',
    'https://www.ideawebtv.it/wp-content/uploads/2023/06/OASIS-PHOTOCONTEST2.jpg',
    'https://img.freepik.com/photos-premium/belle-illustration-coeur-paysage-ai-generative_791316-7419.jpg',
    'https://www.keblog.it/wp-content/uploads/2019/12/le-piu-belle-foto-del-2019-15.jpg',
    'https://i0.wp.com/fotografinviaggio.it/wp-content/uploads/2023/04/Immagine-copertina-per-blog-2-21.jpg',
  ]
  const gridConfig = {
    columnGap: 10,
    rowGap: 10,
    templateRows: [
      {
        height: 200,
        areas: [0, 1, 1, 2],
      },
      {
        height: 200,
        areas: [3, 1, 1, 4],
      },
      {
        height: 200,
        areas: [3, 5, 5, 4],
      },
      {
        height: 200,
        areas: [6, 6, 7, 8],
      },
    ],
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Benvenuto nella Dashboard
      </Typography>
      <Typography>
        Seleziona un&apos;opzione dal menu a sinistra per iniziare.
      </Typography>
      <PageWrapper>
        <DynamicGrid config={gridConfig}>
          {urls.map((url) => (
            <Element key={`${url}-${Math.random()}`}>
              <img src={url} alt="" />
            </Element>
          ))}
        </DynamicGrid>
      </PageWrapper>
    </div>
  )
}

const Element = styled('div')`
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
