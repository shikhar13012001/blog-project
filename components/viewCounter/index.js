import { useEffect } from 'react'
import useSWR from 'swr'

async function fetcher(...args) {
    const res = await fetch(...args)

    return res.json()
}

export default function ViewCounter({ slug, method: verb }) {
    // TODO: implement view counter using SWR and fetcher function        
}
