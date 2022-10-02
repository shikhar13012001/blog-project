import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import styles from '../../styles/PostGrid.module.css'
import IMAGE from '../../public/images/test.jpg'
import Image from 'next/image'
import { FontSizes } from '../../fonts'
import { AiOutlineEye } from 'react-icons/ai'
import Post from '../Post'
import readingTime from 'reading-time'
import Link from 'next/link'
import ViewCounter from '../viewCounter'
const PostGrid = ({ posts, tag }) => {
    const FirstPost = posts[0]
    console.log(FirstPost)
    const remaingPosts = posts.slice(1) || []
    return (
        <Grid container columns={12} className={styles.PostGrid}>
            <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                className={styles.PostGridItemParent}
            >
                <Grid container columns={12} spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={7}
                        lg={7}
                        className={styles.PostGridItemImage}
                    >
                        <Link href={`/posts/${FirstPost.id}`}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                }}
                            >
                                <Image
                                    src={FirstPost?.image || IMAGE}
                                    alt=""
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </Box>
                        </Link>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={5}
                        md={5}
                        lg={5}
                        className={styles.PostGridItemText}
                    >
                        <Typography
                            variant="h6"
                            className="SpaceFont GrayColor"
                            fontSize={FontSizes.ProjectDescription}
                            sx={{ mt: 8 }}
                        >
                            {tag}
                        </Typography>
                        <Typography
                            variant="body1"
                            className="SpaceFont"
                            fontSize={FontSizes.HighLight}
                        >
                            {FirstPost?.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.2em',
                            }}
                            className="GrayColor"
                        >
                            <AiOutlineEye
                                size={30}
                                style={{ marginRight: 10 }}
                            />
                            <ViewCounter slug={FirstPost.id} /> views .{' '}
                            {readingTime(FirstPost.content).text} read
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {remaingPosts.map((t, i) => (
                <Grid
                    key={i}
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    lg={4}
                    className={styles.ExtraPost}
                >
                    <Post post={t} />
                </Grid>
            ))}
        </Grid>
    )
}

export default PostGrid
