import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

interface DayProps {
  filled?: boolean
  outlined?: boolean
  highlighted?: boolean
  disabled?: boolean
  startOfRange?: boolean
  endOfRange?: boolean
  onClick?: () => void
  onHover?: () => void
  value: number | string
}

const Day: React.FunctionComponent<DayProps> = (props) => {
  const theme = useTheme()
  return (
    <div
      style={{
        display: 'flex',
        ...(props.startOfRange && { borderRadius: '50% 0 0 50%' }),
        ...(props.endOfRange && { borderRadius: '0 50% 50% 0' }),
        ...(!props.disabled && props.highlighted && { backgroundColor: theme.palette.action.hover }),
      }}>
      <IconButton
        style={{
          height: 36,
          width: 36,
          padding: 0,
          ...(!props.disabled && props.outlined && { border: `1px solid ${theme.palette.primary.dark}` }),
          ...(!props.disabled && props.filled && {
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            backgroundColor: theme.palette.primary.dark,
          }),
        }}
        disabled={props.disabled}
        onClick={props.onClick}
        onMouseOver={props.onHover}>
        <Typography
          color={!props.disabled ? 'text.primary' : 'text.disabled'}
          style={{
            lineHeight: 1.6,
            ...(!props.disabled && props.filled && { color: theme.palette.primary.contrastText }),
          }}
          variant="body2">
          {props.value}
        </Typography>
      </IconButton>
    </div>
  )
}

export default Day
