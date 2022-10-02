// TODO: implement serverless function to increment view counter
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns {Promise<void>}
 * @see https://nextjs.org/docs/api-routes/introduction
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * 
 * *create a db collection "views" with a document for each post
 * *create a field "viewCount" in the document
 * *increment the viewCount field by 1 when the post is viewed
 * *use the post slug as the document id
 * *use the firebase-admin sdk to access the db
 * *use the firebase-admin sdk to increment the viewCount field
 *  
 */