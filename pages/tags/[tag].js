import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { sortPosts } from '../../utils/constants'
import PostGrid from '../../components/PostGrid'
import CategoryTitle from '../../components/CategoryTitle'
import { useRouter } from 'next/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CONSTANTS } from '../../config/CONSTANTS'
import { auth, db } from '../../firebase'
import { collection } from 'firebase/firestore'
import Loader from '../../components/Loading'
const TagComponent = () => {
    const router = useRouter()
    const { tag } = router.query
    // get all posts from firestore which have the tag
    // sort them by date
    // pass them to PostGrid
    const [posts, loading, error] = useCollectionData(
       // TODO: implement fireabse query to get posts with tag
       // TODO: use react-firestore-hooks to get posts

    )
    if (loading) {
        return <Loader />
    }

    return (
        <Box width="100%" height="100%">
            <CategoryTitle title={tag} color="#f5f5f5" style={{ mt: 0 }} />
            {sortPosts(posts, tag).length ? (
                <PostGrid posts={sortPosts(posts, tag)} tag={tag} />
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <Typography variant="h4" color="white">
                        No posts found
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default TagComponent
