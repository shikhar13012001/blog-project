import React from 'react'
import PostGrid from '../PostGrid'
import CategoryTitle from '../CategoryTitle'
import { Grid, Typography, Button, Box } from '@mui/material'
import { auth, db } from '../../firebase'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CONSTANTS } from '../../config/CONSTANTS'
import Loader from '../Loading'
import { Tags } from '../../utils/constants'
import { sortPosts } from '../../utils/constants'
const Home = ({ limit }) => {
    const [posts, loading, error] = useCollectionData(
        collection(db, CONSTANTS.COLLECTION_POSTS),
        {
            query: (query) => query.orderBy('createdAt', 'desc').limit(4),
            snapshotListenOptions: {
                includeMetadataChanges: true,
                limit: limit,
            },
        }
    )
    if (loading) {
        return <Loader />
    }

    const PostMap = Tags.map((tag) => {
        return { post: sortPosts(posts, tag), tag: tag }
    })
    // console.log(
    //     posts,
    //     sortPosts(posts, 'Design'),
    //     PostMap.filter((T) => T.length)
    // )
    return (
        <React.Fragment>
            {PostMap.filter((T) => T.post.length).map((post, index) => {
                return (
                    <>
                        <CategoryTitle title={post.tag} color="#f5f5f5" />
                        <PostGrid posts={post.post} tag={post.tag} />
                    </>
                )
            })}
        </React.Fragment>
    )
}

export default Home
