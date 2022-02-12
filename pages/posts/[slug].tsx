import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPosts, getPostData, Post as PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ post }: {post: PostData}) {

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.createdOn} />
        </div>
        {documentToReactComponents(post.content)}
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const postData = await getPostData(params.slug)

  return {
    props: {
      post: postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => {
    return {
      params: { slug: post.slug}
    }
  }
    )
  return {
    paths,
    fallback: false
  }
}
