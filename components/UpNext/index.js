import React from 'react'
import Grid from '@mui/material/Grid'
import { Box, Typography } from '@mui/material'
import { FontSizes } from '../../fonts'
import UpNextImage from '../../public/images/upnext.png'
import Image from 'next/image'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { collection } from 'firebase/firestore'
import Post from '../Post'
const UpNext = () => {
    const [posts, loading, error] = useCollectionData(collection(db, 'posts'), {
        query: (query) => query.orderBy('createdAt', 'desc').limit(4),
        snapshotListenOptions: { includeMetadataChanges: true, limit: 4 },
    })
    if (loading) {
        return <></>
    }
    const firstPost = posts[0]
    const restPosts = posts.slice(1, 4)
    return (
        <Grid
            container
            columns={12}
            spacing={2}
            sx={{
                minHeight: '60vh',
                padding: 0,
                mt: 8,
                mb: 10,
                borderTop: '1px solid #191919',
            }}
        >
            <Grid
                item
                xs={6}
                sx={{ padding: 0, position: 'relative', minHeight: '60vh' }}
            >
                <Image
                    src={firstPost?.image || UpNextImage}
                    alt="UpNext"
                    layout="fill"
                    objectFit="cover"
                    objectPosition={'center'}
                    style={{ width: '100%', height: '100%' }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography
                    variant="h1"
                    fontSize={FontSizes.subHeading}
                    className="SpaceFont"
                >
                    Up Next
                </Typography>
                <Typography
                    variant="h1"
                    fontSize={FontSizes.para}
                    className="SpaceFont"
                    sx={{ color: '#7971ea' }}
                >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    WHAT'S NEW
                </Typography>
                <Typography
                    variant="h1"
                    fontSize={FontSizes.about}
                    className="SpaceFont"
                    sx={{ mt: 3, width: '80%' }}
                >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    {firstPost?.title}
                </Typography>
                <BsBoxArrowUpRight size={30} style={{ marginTop: 10 }} />
            </Grid>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 10,
                    pb: 10,
                    borderBottom: '1px solid #191919',
                    borderTop: '1px solid #191919',
                }}
            >
                <Typography
                    variant="h1"
                    fontSize={FontSizes.Heading}
                    sx={{ fontWeight: 'bold!important' }}
                >
                    Discover More
                </Typography>
            </Box>
            {restPosts.map((t, i) => (
                <Grid
                    key={i}
                    item
                    xs={4}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Post post={t} />
                </Grid>
            ))}
        </Grid>
    )
}
export default UpNext
