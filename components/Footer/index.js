import Footer from 'rc-footer'
import 'rc-footer/assets/index.css' // import 'rc-footer/asssets/index.less';

const FootComponent = () => {
    return (
        <Footer
            columns={[
                {
                    title: 'Black Bird',
                    items: [
                        {
                            title: 'Home',
                            url: 'https://pro.ant.design/',
                            openExternal: true,
                        },
                        {
                            title: 'About',
                            url: 'https://mobile.ant.design/',
                            openExternal: true,
                        },
                        {
                            title: 'News',
                            url: 'Newsletter',
                            description: 'Get the latest news',
                        },
                    ],
                },
                {
                    title: 'Social',
                    items: [
                        {
                            title: 'Facebook',
                            url: '/facebook',
                        },
                        {
                            title: 'Twitter',
                            url: '/twitter',
                        },
                        {
                            title: 'Instagram',
                            url: '/instagram',
                        },
                    ],
                },
                {
                    title: 'About',
                    items: [
                        {
                            title: 'Trends',
                            url: '/trends',
                        },
                        {
                            title: 'Snippets',
                            url: '/snippets',
                        },
                        {
                            title: 'Feed',
                            url: '/feed',
                        },
                    ],
                },
            ]}
            bottom="Made with ❤️ by Black Bird"
            style={{
                borderTop: '1px solid #393e46',
            }}
        />
    )
}

export default FootComponent
