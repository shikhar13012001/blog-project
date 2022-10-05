// implentation of withAuth HOC
import React from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { CONSTANTS } from '../config/CONSTANTS'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const withAuth = (Component) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const router = useRouter()
        const [user, loading, error] = useAuthState(auth)
        React.useEffect(() => {
            if (loading) return
            if (!user) {
                router.replace('/')
            } else {
                const userRef = doc(db, CONSTANTS.COLLECTION_NAME, user.uid)
                getDoc(userRef).then((docSnap) => {
                    if (!docSnap.exists()) {
                        router.replace('/')
                    }
                })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user, loading])
        if (typeof window !== 'undefined' && loading) return null
        if (!user) return null
        return <Component {...props} />
    }
}

export default withAuth
