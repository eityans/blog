import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPosts, getPostData } from '../../lib/contentful'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* <Date dateString={postData.date} /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const postData = await getPostData(params.slug)

  console.log(postData.fields)
  return {
    props: {
      postData: postData.fields
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => {
    return {
      params: { slug: post.fields.slug}
    }
  }
    )
  return {
    paths,
    fallback: false
  }
}
