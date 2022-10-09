import { useEffect } from 'react'
import useSWR from 'swr'

async function fetcher(...args) {
    const res = await fetch(...args)

    return res.json()
}

export default function ViewCounter({ slug, method: verb }) {
    const { data } = useSWR(`/api/views/${slug}`, fetcher)
    const views = new Number(data?.views)

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/views/${slug}`, {
                method: 'POST',
            })

        if (verb === 'POST') registerView()
    }, [slug, verb])

    return `${views > 0 ? views.toLocaleString() : 0}`
}
