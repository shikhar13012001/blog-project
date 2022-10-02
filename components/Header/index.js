import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import HeaderStyles from '../../styles/Header.module.css'
import { BsGithub } from 'react-icons/bs'
import { FontSizes } from '../../fonts'
import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import LOGO from '../../public/favicon.ico'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { CONSTANTS } from '../../config/CONSTANTS'
import Link from 'next/link'
const Header = () => {
    const isMobile = useMediaQuery('(max-width:600px)')
    const handleAuth = async () => {
        const provider = new GoogleAuthProvider()
        const data = await signInWithPopup(auth, provider)
        const user = data.user
        const userRef = doc(db, CONSTANTS.COLLECTION_NAME, user.uid)
        const docSnap = await getDoc(userRef)
        if (!docSnap.exists()) {
            await setDoc(userRef, {
                posts: [],
                bookmarks: [],
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                id: user.uid,
            })
        }
    }
    const handleLogout = () => {
        auth.signOut()
    }
    const [user] = useAuthState(auth)

    const { photoUrl } = user?.reloadUserInfo || {}
    return (
        <Grid container columns={12} className={HeaderStyles.headerSize}>
            <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                className={HeaderStyles.Logo}
            >
                <Image src={LOGO} alt="Logo" width={50} height={50} />
                <Typography variant="h6" className="SpaceFont GrayColor">
                    Black-bird-Blog
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                className={HeaderStyles.NavLinks}
            >
                <Typography
                    variant="body1"
                    className={`${HeaderStyles.NavLink} SpaceFont`}
                >
                    <Link href={'/'}> Home</Link>
                </Typography>
                <Typography
                    variant="body1"
                    className={`${HeaderStyles.NavLink} SpaceFont`}
                >
                    <Link href={'/feed'}> Feed </Link>
                </Typography>

                <Typography
                    variant="body1"
                    className={`${HeaderStyles.NavLink} SpaceFont`}
                >
                    Snippets
                </Typography>
                <Typography
                    variant="body1"
                    className={`${HeaderStyles.NavLink} SpaceFont`}
                >
                    <Link href="/create-post"> Create Post</Link>
                </Typography>

                {user ? (
                    <Box className={HeaderStyles.profile}>
                        <Image
                            src={photoUrl}
                            width={40}
                            height={40}
                            alt="profile"
                            className={HeaderStyles.profile}
                        />
                        <Typography
                            variant="body1"
                            className={`${HeaderStyles.NavLink} SpaceFont`}
                            onClick={handleLogout}
                        >
                            Logout
                        </Typography>
                    </Box>
                ) : (
                    <Button
                        variant="standard"
                        size="md"
                        className="Purple"
                        onClick={handleAuth}
                    >
                        Login
                    </Button>
                )}
                {/* Auth Links */}
            </Grid>
        </Grid>
    )
}

export default Header
