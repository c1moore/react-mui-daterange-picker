import React from 'react'
import { Paper, Grid, Typography, Divider, useTheme } from '@mui/material'
import { format, differenceInCalendarMonths } from 'date-fns'
import { ArrowRightAlt } from '@mui/icons-material'
import Month from './Month'
import DefinedRanges from './DefinedRanges'
import { DateRange, DefinedRange, Setter, NavigationAction } from '../types'
import { MARKERS } from '..'

interface MenuProps {
  dateRange: DateRange
  ranges: DefinedRange[]
  minDate: Date
  maxDate: Date
  firstMonth: Date
  secondMonth: Date
  setFirstMonth: Setter<Date>
  setSecondMonth: Setter<Date>
  setDateRange: Setter<DateRange>
  helpers: {
    inHoverRange: (day: Date) => boolean
  }
  handlers: {
    onDayClick: (day: Date) => void
    onDayHover: (day: Date) => void
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void
  }
}

const Menu: React.FunctionComponent<MenuProps> = (props) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
  } = props

  const theme = useTheme()
  const { startDate, endDate } = dateRange
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2
  const commonProps = { dateRange, minDate, maxDate, helpers, handlers }
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <Grid container style={{ padding: '20px 70px' }} alignItems="center">
            <Grid item style={{
              flex: 1,
              textAlign: 'center',
            }}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'MMMM dd, yyyy') : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item style={{
              flex: 1,
              textAlign: 'center',
            }}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item style={{
              flex: 1,
              textAlign: 'center',
            }}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'MMMM dd, yyyy') : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            {/* @ts-ignore */}
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <div style={{
              borderLeft: `1px solid ${theme.palette.action.hover}`,
              marginBottom: 20,
            }} />
            {/* @ts-ignore */}
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <div style={{
          borderLeft: `1px solid ${theme.palette.action.hover}`,
          marginBottom: 20,
        }} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Menu
