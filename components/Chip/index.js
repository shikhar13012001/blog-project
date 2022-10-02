import React from 'react'

import { Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
const ChipComp = ({ label }) => {
    const theme = useTheme()
    return (
        <Link href={`/tags/${label.name}`}>
            <Chip
                key={label.name}
                sx={{
                    mt: '3px',
                    height: 20,
                    padding: '1em 4px',
                    fontWeight: 600,
                    mr: 2,
                    lineHeight: '15px',
                }}
                label={label.name}
                style={{
                    backgroundColor: label.color,
                    color: theme.palette.getContrastText(label.color),
                }}
            />
        </Link>
    )
}

export default ChipComp
