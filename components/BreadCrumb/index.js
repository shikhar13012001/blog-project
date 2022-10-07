import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { Typography } from '@mui/material'

function handleClick(event) {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
}

export default function ActiveLastBreadcrumb(props) {
    const { path } = props
    //size of path array
    const size = path.length
    // last
    const last = path[size - 1]
    // first n-1
    const first = path.slice(0, size - 1)
    return (
        <div
            role="presentation"
            onClick={handleClick}
            style={{ marginBottom: 20 }}
        >
            <Breadcrumbs aria-label="breadcrumb">
                {first.map((item, index) => {
                    return (
                        <Link
                            underline="hover"
                            key={index}
                            color="inherit"
                            href={item.link}
                        >
                            <Typography variant="h6"> {item.name} </Typography>
                        </Link>
                    )
                })}
                <Link
                    underline="hover"
                    color="text.primary"
                    href={last.link}
                    aria-current="page"
                >
                    <Typography variant="h6"> {last.name} </Typography>
                </Link>
            </Breadcrumbs>
        </div>
    )
}
