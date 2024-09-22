import React, {
  PropsWithChildren,
  RefObject,
  CSSProperties,
  useMemo,
  forwardRef,
  isValidElement,
  Children,
  HTMLAttributes,
} from 'react'
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

const DynamicGrid = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DynamicGridProps>
>(({ config, style, className, children }, ref) => {
  const childrenCount = Children.count(children)

  const gridTemplateRows = useMemo(
    () => formatGridTemplateRows(config, childrenCount),
    [config, childrenCount]
  )

  const gridTemplateColumns = useMemo(
    () => formatGridTemplateColumns(config),
    [config]
  )

  return (
    <Grid
      ref={ref}
      style={style}
      className={className}
      columnGap={config.columnGap}
      rowGap={config.rowGap}
      gridTemplateRows={gridTemplateRows}
      gridTemplateColumns={gridTemplateColumns}
    >
      {Children.map(
        children,
        (child, index) =>
          isValidElement<HTMLAttributes<HTMLElement>>(child) && (
            <child.type
              {...child.props}
              style={{ ...(child.props.style || {}), gridArea: `A${index}` }}
            />
          )
      )}
    </Grid>
  )
})
DynamicGrid.displayName = 'DynamicGrid'

export default DynamicGrid

interface GridProps {
  columnGap?: number
  rowGap?: number
  gridTemplateRows: string
  gridTemplateColumns: string
}

const Grid = styled('div')<GridProps>`
  ${({ columnGap = 0, rowGap = 0, gridTemplateRows, gridTemplateColumns }) => `
    display: grid;
    column-gap: ${columnGap}px;
    row-gap: ${rowGap}px;
    grid-template: ${gridTemplateRows} / ${gridTemplateColumns}; 
  `}
`

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
