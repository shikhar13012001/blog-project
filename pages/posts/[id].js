// post id
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { CONSTANTS } from '../../config/CONSTANTS'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Loader from '../../components/Loading'
import { Container, Grid, Typography, Box, Chip } from '@mui/material'
import { FontSizes } from '../../fonts'
import ReadingTime from 'reading-time'
import Avatar from '@mui/material/Avatar'
import RTE from '../../components/RichTextEditor'
import BreadCrumb from '../../components/BreadCrumb'
import MediaShare from '../../components/MediaShare'
import { IoPricetagsOutline } from 'react-icons/io5'
import Likes from '../../components/Likes'
import Comments from '../../components/Comments'
import UpNext from '../../components/UpNext'
import Image from 'next/image'
import TestImage from '../../public/images/testCover.jpg'
import Link from 'next/link'
import ViewCounter from '../../components/viewCounter'
import { AiOutlineEye } from 'react-icons/ai'
const PostView = () => {
    // post id from url
    const router = useRouter()
    const { id } = router.query

    const postRef = id && doc(db, CONSTANTS.COLLECTION_POSTS, id)
    const [post, loading, error] = useDocumentData(postRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    const authorRef = post && doc(db, CONSTANTS.COLLECTION_NAME, post.author)
    const [author, authorLoading, authorError] = useDocumentData(authorRef, {
        snapshotListenOptions: { includeMetadataChanges: true },
    })
    console.log(post)
    if (loading || authorLoading) {
        return <Loader />
    }
    const path = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: post?.title,
            link: `/posts/${id}`,
        },
    ]
    return (
        post &&
        author && (
            <React.Fragment>
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '100vh',
                        position: 'relative',
                    }}
                >
                    <Image
                        src={post?.image || TestImage}
                        alt="post image"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                </Box>
                <Container sx={{ width: '60%', minHeight: '100vh' }}>
                    <BreadCrumb path={path} />
                    <Typography variant="h1" fontSize={FontSizes.Heading}>
                        {post.title}
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid
                            item
                            xs={12}
                            md={10}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                            }}
                        >
                            <Avatar
                                alt={author.name}
                                src={author.image}
                                sx={{ width: 46, height: 46 }}
                            />
                            <Typography
                                variant="body1"
                                fontSize={FontSizes.body}
                            >
                                {author.name} /{' '}
                                <span className="GrayColor">
                                    {post.date || new Date().toDateString()}{' '}
                                </span>{' '}
                                <span className="GrayColor center-text">
                                    <AiOutlineEye
                                        size={20}
                                        style={{ marginRight: 10 }}
                                    />
                                    <ViewCounter slug={post.id} method="POST" />
                                    views
                                </span>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={2}>
                            <Typography
                                variant="body1"
                                fontSize={FontSizes.body}
                            >
                                {ReadingTime(post.content).text}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
                        <IoPricetagsOutline color="#39FF14" size={20} />{' '}
                        {post.tags.map((t, i) => {
                            return (
                                <Link href={`/tags/${t.name}`} key={i}>
                                    <Chip
                                        label={t.name}
                                        sx={{ fontSize: 10, cursor: 'pointer' }}
                                        size="medium"
                                        className="GrayColor"
                                    />
                                </Link>
                            )
                        })}
                    </Box>
                    <RTE
                        value={post.content}
                        readOnly
                        style={{ marginTop: '5em' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            mt: 4,
                            alignItems: 'center',
                            gap: 3,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Likes id={id} counters={post.reactions} />{' '}
                        <MediaShare
                            url={`${window.location.host}/posts/${id}`}
                        />
                    </Box>
                </Container>
                <UpNext />
                <Container sx={{ width: '60%' }}>
                    <Comments />
                </Container>
            </React.Fragment>
        )
    )
}

export default PostView
