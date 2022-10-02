import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import Styles from '../../styles/Category.module.css'
import { FontSizes, fontSizes } from '../../fonts'
const CategoryTitle = ({ title, description, color, style }) => {
    return (
        <Box
            className={Styles.CategoryBanner}
            sx={{ backgroundColor: color, mt: 5, mb: 3, ...style }}
        >
            <Typography
                variant="h1"
                fontSize={FontSizes.Heading}
                sx={{ textAlign: 'center', fontWeight: 'bold!important' }}
            >
                {title || 'Behind the Mic'}
            </Typography>
            <Typography
                variant="h6"
                sx={{ textAlign: 'center' }}
                color="GrayText"
            >
                {description ||
                    'Up close and personal with the creators of your favorite songs, podcasts, and more'}
            </Typography>
        </Box>
    )
}

export default CategoryTitle
