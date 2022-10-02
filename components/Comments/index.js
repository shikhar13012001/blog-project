import Giscus from '@giscus/react'

export default function MyApp() {
    return (
        <Giscus
            id="comments"
            repo="shikhar13012001/test-r"
            repoId="R_kgDOHNHGhA"
            category="General"
            categoryId="DIC_kwDOHNHGhM4CRgWQ"
            mapping="url"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang="en"
            loading="lazy"
        />
    )
}
