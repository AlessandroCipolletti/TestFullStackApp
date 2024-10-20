'use client'
import React, { useState } from 'react'
import {
  DataGridPremium,
  GridColDef,
  GridToolbar,
  GridRowModesModel,
  MuiEvent,
  GridRowEditStartParams,
  // GridRowEditStopParams,
  GridRowOrderChangeParams,
} from '@mui/x-data-grid-premium'
import { itIT } from '@mui/x-data-grid-premium/locales'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'

const rows = [
  {
    id: 1,
    name: 'Leanne',
    surname: 'Graham',
    age: 28,
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin',
    surname: 'Howell',
    age: 35,
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine',
    surname: 'Bauch',
    age: 32,
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia',
    surname: 'Lebsack',
    age: 40,
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey',
    surname: 'Dietrich',
    age: 27,
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Dennis',
    surname: 'Schulist',
    age: 45,
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis',
    surname: 'Weissnat',
    age: 31,
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas',
    surname: 'Runolfsdottir',
    age: 29,
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna',
    surname: 'Reichert',
    age: 38,
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina',
    surname: 'DuBuque',
    age: 26,
    email: 'Rey.Padberg@karina.biz',
  },
]

type UserRow = {
  id: number
  name: string
  surname: string
  age: number
  email: string
}

type DataTableProps = {
  // rows: UserRow[]
}

export default function DataPage({}: DataTableProps) {
  const [rowData, setRowData] = useState<UserRow[]>(rows)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  console.log({ rowModesModel })

  const columns: GridColDef<UserRow>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'surname', headerName: 'Surname', width: 150, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
      editable: true,
    },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
  ]

  const handleRowEditStart = (
    params: GridRowEditStartParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true
  }

  // const handleRowEditStop = (
  //   params: GridRowEditStopParams,
  //   event: MuiEvent<React.SyntheticEvent>
  // ) => {
  //   event.defaultMuiPrevented = true
  // }

  const processRowUpdate = (newRow: UserRow) => {
    console.log('processRowUpdate', newRow)
    setRowData((prevRows) =>
      prevRows.map((row) => (row.id === newRow.id ? newRow : row))
    )
    return newRow
  }

  const handleRowModesModelChange = (newModel: GridRowModesModel) => {
    console.log('handleRowModesModelChange', newModel)
    setRowModesModel(newModel)
  }

  const handleRowOrderChange = (params: GridRowOrderChangeParams) => {
    const { oldIndex, targetIndex } = params
    setRowData((prevRows) => {
      const updatedRows = [...prevRows]
      const movedRow = updatedRows.splice(oldIndex, 1)[0]
      updatedRows.splice(targetIndex, 0, movedRow)
      console.log(updatedRows)
      return updatedRows
    })
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Data Table
      </Typography>
      <Box style={{ height: '100%', width: '100%' }}>
        <DataGridPremium<UserRow>
          localeText={itIT.components.MuiDataGrid.defaultProps.localeText}
          rows={rowData}
          columns={columns}
          pagination
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          sortingOrder={['asc', 'desc']}
          processRowUpdate={processRowUpdate}
          rowReordering
          // columnSelection
          cellSelection
          onRowEditStart={handleRowEditStart}
          // onRowEditStop={handleRowEditStop}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowOrderChange={handleRowOrderChange}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: { disableToolbarButton: false },
              printOptions: { disableToolbarButton: false },
              excelOptions: { disableToolbarButton: false },
            },
          }}
        />
      </Box>
    </div>
  )
}
