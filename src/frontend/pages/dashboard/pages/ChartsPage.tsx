'use client'
import React from 'react'
import { Typography } from '@mui/material'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const data = [
  { nome: 'Gen', uv: 4000, pv: 2400, amt: 2400 },
  { nome: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { nome: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { nome: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { nome: 'Mag', uv: 1890, pv: 4800, amt: 2181 },
  { nome: 'Giu', uv: 2390, pv: 3800, amt: 2500 },
  { nome: 'Lug', uv: 3490, pv: 4300, amt: 2100 },
]

export default function ChartsPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Grafici
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" name="PV" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="UV" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
