'use client'
import React from 'react'
import { Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'

export default function ChartsPage() {
  const dataset = [
    { x: 1, y: 2 },
    { x: 2, y: 5.5 },
    { x: 3, y: 2 },
    { x: 5, y: 8.5 },
    { x: 8, y: 1.5 },
    { x: 10, y: 5 },
  ]

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Grafici
      </Typography>
      <div style={{ height: 500 }}>
        <LineChart
          dataset={dataset}
          xAxis={[{ dataKey: 'x' }]}
          series={[{ dataKey: 'y' }]}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
          tooltip={{}}
        />
      </div>
    </div>
  )
}
