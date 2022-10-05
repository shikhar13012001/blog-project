import { db } from '../../../lib/firebase'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    if (req.method === 'POST') {
        const { slug } = req.query
        const ref = db.collection('views').doc(slug)
        // if doc exists, increment views by 1 else create doc with views = 1
        const doc = await ref.get()
        if (doc.exists) {
            await ref.update({
                views: doc.data().views + 1,
            })
        } else {
            await ref.set({
                views: 1,
            })
        }
        //send view count to client
        const newDoc = await ref.get()
        return res.status(200).json({ views: newDoc.data().views })
    }
    if (req.method === 'GET') {
        const { slug } = req.query
        const ref = db.collection('views').doc(slug)
        const doc = await ref.get()
        if (doc.exists) {
            return res.status(200).json({ views: doc.data().views })
        } else {
            return res.status(200).json({ views: 0 })
        }
    }
    res.status(400).json({ message: 'Invalid request' })
}