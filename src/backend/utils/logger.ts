import pino from 'pino'
import fs from 'fs'
import path from 'path'
import pretty from 'pino-pretty'
import { multistream } from 'pino-multi-stream'
import { createStream } from 'rotating-file-stream'

const DEBUG_FILE_LOGS = false

const getPinoStreams = () => {
  const streams = []

  // log in console
  if (process.env.NODE_ENV === 'production') {
    streams.push({ stream: process.stdout })
  } else {
    streams.push({ stream: pretty({ colorize: true }) })
  }

  // log in file
  let logDirectory = ''
  if (process.env.NODE_ENV === 'production') {
    logDirectory = process.env.LOGS_DIRECTORY || '/usr/src'
  } else if (DEBUG_FILE_LOGS) {
    logDirectory = path.join(
      process.cwd(),
      process.env.LOGS_DIRECTORY || 'logs'
    )
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory) // create log directory if it does not exist
    }
  }
  if (logDirectory) {
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
        size: '10M', // rotate every 10 MegaBytes written
        path: logDirectory,
        // maxFiles: 7,
      }
    )

    streams.push({
      stream,
    })
  }

  return streams
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
  multistream(getPinoStreams())
)

export default logger
