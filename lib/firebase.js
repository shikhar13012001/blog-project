import * as admin from 'firebase-admin'
import keys from '../key.json'
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: keys.project_id,
            clientEmail: keys.client_email,
            privateKey: keys.private_key.replace(/\\n/g, '\n'),
        }),
    })
}

const db = admin.firestore()

export { db }
