import React, {
  FC,
  PropsWithChildren,
  Children,
  RefObject,
  CSSProperties,
} from 'react'
// import styled from 'styled-components';
import { styled } from '@mui/material/styles'

export type DynamicGridConfig = {
  columnGap?: number
  rowGap?: number
  templateRows: {
    height: number | string
    areas: number[]
  }[]
}

interface DynamicGridProps {
  refProp?: RefObject<HTMLDivElement>
  style?: CSSProperties
  config: DynamicGridConfig
  className?: string
}

const DynamicGrid: FC<PropsWithChildren<DynamicGridProps>> = ({
  refProp,
  config,
  style,
  className,
  children,
}) => {
  return (
    <Grid
      ref={refProp}
      config={config}
      style={style}
      className={className}
      childrenCount={Children.toArray(children).length}
    >
      {children}
    </Grid>
  )
}

export default DynamicGrid

// const Grid = styled.div<{ config: DynamicGridConfig; childrenCount: number }>`
//   display: grid;
//   column-gap: ${({ config }) => config.columnGap || 0}px;
//   row-gap: ${({ config }) => config.rowGap || 0}px;
//   grid-template: ${({ config, childrenCount }) =>
//       formatGridTemplateRows(config, childrenCount)} / ${({ config }) =>
//       formatGridTemplateColumns(config)};
// `;

const Grid = styled('div')<{
  config: DynamicGridConfig
  childrenCount: number
}>(({ config, childrenCount }) => ({
  display: 'grid',
  columnGap: `${config.columnGap || 0}px`,
  rowGap: `${config.rowGap || 0}px`,
  gridTemplate: `${formatGridTemplateRows(config, childrenCount)} / ${formatGridTemplateColumns(config)}`,
}))

const formatGridTemplateRows = (
  config: DynamicGridConfig,
  childrenCount: number
) => {
  const maxIndexInConfig =
    Math.max(...config.templateRows.map((row) => Math.max(...row.areas))) + 1
  const gridTemplateIterations = Math.ceil(childrenCount / maxIndexInConfig)

  return Array(gridTemplateIterations)
    .fill('')
    .map((_, iterationIndex) => {
      return config.templateRows
        .map((row) => {
          return `'${row.areas
            .map((area) => `A${area + maxIndexInConfig * iterationIndex}`)
            .join(' ')}' ${
            Math.min(...row.areas) + maxIndexInConfig * iterationIndex <
            childrenCount
              ? `${
                  typeof row.height === 'number'
                    ? `${row.height}px`
                    : row.height
                }`
              : '0px'
          } `
        })
        .filter((row) => !row.endsWith(' 0px '))
        .join('\n')
    })
    .join('\n')
}

const round = (value: number, precision: number) => {
  const multiplier = 10 ** precision
  return Math.round(value * multiplier) / multiplier
}

const formatGridTemplateColumns = (config: DynamicGridConfig) => {
  return config.templateRows[0].areas
    .map(
      (_, __, arr) =>
        `calc(${round(100 / arr.length, 2)}% - ${
          arr.length === 1
            ? 0
            : round(
                ((config.columnGap || 0) * (arr.length - 1)) / arr.length,
                0
              )
        }px)`
    )
    .join(' ')
}
