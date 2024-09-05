import pino from 'pino'
import { multistream } from 'pino-multi-stream'
import fs from 'fs'
import path from 'path'
import { createStream } from 'rotating-file-stream'
import pretty from 'pino-pretty'

const streams = []

// log in console
if (process.env.NODE_ENV === 'production') {
  streams.push({ stream: process.stdout })
} else {
  streams.push({ stream: pretty({ colorize: true }) })
}

// log in file
if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.join(process.cwd(), 'logs')
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory) // create log directory if it does not exist
  }

  const stream = createStream(
    (time, index = 0) => {
      if (!time || typeof time === 'number') {
        time = new Date()
      }
      const date = time.toISOString().slice(0, 10) // date format YYYY-MM-DD
      return `${date}_${index}.log`
    },
    {
      interval: '1d', // auto daily rotation at midnight
      size: '1K', // rotate every 10 MegaBytes written
      path: logDirectory,
      // maxFiles: 7,
    }
  )

  streams.push({
    stream,
  })
}

const logger = pino(
  {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    formatters: {
      bindings: () => ({}),
      level: (label, number) => {
        return { severity: label.toUpperCase(), level: number }
      },
    },
  },
  multistream(streams)
)

export default logger
