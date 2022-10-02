import React, { useState, useRef } from 'react'
import {
    Grid,
    Typography,
    Button,
    Box,
    Container,
    TextField,
} from '@mui/material'
import BreadCrumb from '../components/BreadCrumb'
import { FontSizes } from '../fonts'
import RTE from '../components/RichTextEditor'
import { handleImageUpload } from '../utils/FileUpload'
import { setDoc, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'
import AutoComplete from '../components/AutoComplete/bail'
import { db, auth } from '../firebase'
import { CONSTANTS } from '../config/CONSTANTS'
import { v4 as uuidv4 } from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth'
import Backdrop from '../components/BackDrop'
import { useRouter } from 'next/router'
const IndexPage = () => {
    const [content, setContent] = useState('')
    const [backdrop, setBackdrop] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const hiddenFileInput = useRef(null)
    const [user] = useAuthState(auth)
    const [tags, setTags] = useState([])
    const router = useRouter()
    const handleUpload = () => {
        hiddenFileInput.current.click()
    }
    const handleCover = (e) => {
        const file = e.target.files[0]
        handleImageUpload(file).then((data) => {
            setImage(data)
        })
    }
    const handleSubmitPost = async () => {
        const id = uuidv4()
        const postRef = doc(db, CONSTANTS.COLLECTION_POSTS, id)
        const userRef = doc(db, CONSTANTS.COLLECTION_NAME, user.uid)

        setBackdrop(true)
        await setDoc(postRef, {
            title,
            description,
            content,
            image,
            tags,
            date: new Date().toDateString(),
            id: id,
            author: user?.uid,
        })
        //update user doc
        await updateDoc(userRef, {
            posts: arrayUnion(id),
        })

        setBackdrop(false)
        router.push(`/posts/${id}`)
    }
    const path = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Create Post',
            link: '/create-post',
        },
    ]

    return (
        <Container>
            <BreadCrumb path={path} />
            <Backdrop open={backdrop} setOpen={setBackdrop} />
            <TextField
                variant="filled"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your post a title"
                fullWidth
                sx={{ mb: 3 }}
            />
            <TextField
                variant="filled"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                placeholder="Summarize your post in a few sentences"
                minRows={6}
                fullWidth
                sx={{ mb: 3 }}
            />
            <AutoComplete value={tags} setValue={setTags} />
            <Box sx={{ display: 'grid', placeContent: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt="image"
                        width="100%"
                        style={{ maxHeight: '80vh' }}
                    />
                )}
            </Box>

            <RTE
                style={{ minHeight: '60vh', width: '100%', marginTop: '2em' }}
                value={content}
                onChange={setContent}
            />
            <Button
                variant="outlined"
                onClick={handleUpload}
                sx={{
                    mt: 2,
                    mb: 3,
                    backgroundColor: '#393e46',
                    color: 'white',
                    mr: 2,
                }}
            >
                Upload Cover
            </Button>
            <Button
                variant="standard"
                onClick={handleSubmitPost}
                sx={{
                    mt: 2,
                    mb: 3,
                    color: 'white',
                    width: '10em',
                    backgroundColor: '#7971ea',
                }}
            >
                Publish
            </Button>
            <input
                type="file"
                ref={hiddenFileInput}
                hidden={true}
                accept={'image/*'}
                onChange={handleCover}
            />
        </Container>
    )
}

export default IndexPage
