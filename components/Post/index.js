import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import styles from '../../styles/Post.module.css'
import ImageTest from '../../public/images/test2.png'
import Image from 'next/image'
import { AiOutlineEye } from 'react-icons/ai'
import { FontSizes } from '../../fonts'
import readingTime from 'reading-time'
import ViewCounter from '../viewCounter'
const center = {
    display: 'flex',
    alignItems: 'center',
}
const Post = ({ post }) => {
    return (
        <Grid container columns={12} className={styles.PostContainer}>
            <Grid item xs={12}>
                <Box sx={{ position: 'relative', minHeight: 280 }}>
                    <Image
                        src={post?.image || ImageTest}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="subtitle1"
                    className="SpaceFont GrayColor"
                    sx={center}
                >
                    <AiOutlineEye size={20} style={{ marginRight: 10 }} />
                    <ViewCounter slug={post.id} /> views .{' '}
                    {readingTime(post?.content || '')?.text} read
                </Typography>
                <Typography
                    variant="body1"
                    fontSize={FontSizes.para}
                    className="SpaceFont"
                    sx={{ fontWeight: 0 }}
                >
                    {post?.title}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Post
