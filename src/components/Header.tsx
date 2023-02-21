import React from 'react'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { setMonth, getMonth, setYear, getYear } from 'date-fns'

interface HeaderProps {
  date: Date
  setDate: (date: Date) => void
  nextDisabled: boolean
  prevDisabled: boolean
  onClickNext: () => void
  onClickPrevious: () => void
}

const styles = {
  iconbutton: {
    padding: 10,
    '&:hover': {
      background: 'none',
    },
  } as React.CSSProperties,
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2)
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i) // TODO: make part of the state
}

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}) => {

  const handleMonthChange = (event: SelectChangeEvent<unknown>) => {
    setDate(setMonth(date, parseInt(event.target.value as string)))
  }

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    setDate(setYear(date, parseInt(event.target.value as string)))
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item style={{ padding: 5 }}>
        <IconButton
          style={styles.iconbutton}
          disabled={prevDisabled}
          onClick={onClickPrevious}>
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            MenuProps={{ disablePortal: true }}>
            {MONTHS.map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl variant="standard">
          <Select
            value={getYear(date)}
            onChange={handleYearChange}
            MenuProps={{ disablePortal: true }}>
            {generateYears(date, 30).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item style={{ padding: 5 }}>
        <IconButton
          style={styles.iconbutton}
          disabled={nextDisabled}
          onClick={onClickNext}>
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Header
