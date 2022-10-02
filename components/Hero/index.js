import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import HeroStyles from '../../styles/Home.module.css'
import { fontSizes, FontSizes } from '../../fonts'
import LightN from '../../public/skribbles/22.svg'
import Triangle from '../../public/images/Group 5.png'
import Image from 'next/image'
const Hero = () => {
    return (
        <Container className={HeroStyles.Container}>
            <Typography
                variant="h1"
                fontSize={fontSizes}
                className={HeroStyles.HeroText}
            >
                Marvellous Minds{' '}
                <Image src={LightN} alt="Hero" width={100} height={100} />
            </Typography>
            <Typography
                fontSize={FontSizes.ProjectDescription}
                className={`${HeroStyles.HeroPara} SpaceFont GrayColor`}
            >
                Helping developers build a faster web. Teaching about web
                development, serverless, and React / Next.js.
            </Typography>
            <Box className={HeroStyles.HeroImage}>
                <Image src={Triangle} alt="Hero" />
            </Box>
        </Container>
    )
}

export default Hero
