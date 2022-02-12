import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getAllPosts, Post } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({ posts }: {posts: Post[]}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ゆるくやっていきます</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>

          {posts &&
            posts.map((post) => (

              <li className={utilStyles.listItem} key={post.slug}>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={post.createdOn} />
                </small>
              </li>

            ))}

        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  // postsが無ければ404にリダイレクトする
  if (!posts) {
    return {
      notFound: true
    }
  }
  return {
    props: { posts: posts }
  }
}
