import React from 'react'
import _ from 'lodash'
import { SlackCounter, GithubSelector } from '@charkour/react-reactions'
import { auth, db } from '../../firebase'
import { GoSmiley } from 'react-icons/go'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc } from 'firebase/firestore'
const Component = ({ counters, id }) => {
    counters = counters || []
    id = id || ''
    const [countersState, setCountersState] = React.useState(counters)
    const [user, loading, error] = useAuthState(auth)
    const [showSelector, setShowSelector] = React.useState(false)
    const handleAdd = () => setShowSelector(true)
    const handleSelect = async (emoji) => {
        const index = _.findIndex(counters, {
            emoji,
            by: user?.displayName || 'Anonymous',
        })
        if (index > -1) {
            const arr = [
                ...counters.slice(0, index),
                ...counters.slice(index + 1),
            ]
            await updateDoc(
                doc(db, 'posts', id),
                {
                    reactions: arr,
                },
                { merge: true }
            )
            setShowSelector(false)
            setCountersState([...arr])
        } else {
            const arr = [
                ...counters,
                { emoji, by: user?.displayName || 'Anonymous' },
            ]
            await updateDoc(doc(db, 'posts', id), {
                reactions: arr,
            })
            setShowSelector(false)
            setCountersState([...arr])
        }
    }
    return (
        <div style={{ position: 'relative' }} className="emoji-slide">
            <div onClick={handleAdd}>
                <GoSmiley color="#444c56" size={24} style={{ margin: 0 }} />
            </div>
            <SlackCounter
                counters={countersState || []}
                user={user?.displayName || 'anonymous'}
                onAdd={handleAdd}
                onSelect={handleSelect}
            />

            {showSelector ? (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '100%',
                        marginBottom: '10px',
                    }}
                >
                    <GithubSelector onSelect={handleSelect} />
                </div>
            ) : null}
        </div>
    )
}

export default Component
