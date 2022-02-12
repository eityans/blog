import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { createClient } from '../lib/contentful'
import utilStyles from '../styles/utils.module.css'

export default function Home({ posts }) {
  console.log(posts);
  console.log(posts.items[0].fields.title);
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
            posts.items.map((post) => (


              <div>
                <p>{post.fields.title}</p>

                {documentToReactComponents(post.fields.content)}
              </div>
            ))}
          {/* {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))} */}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getAllPosts();

  // responseが無ければ404にリダイレクトする
  if (!response) {
    return {
      notFound: true
    }
  }
  return {
    props: { posts: response }
  }
  // const allPostsData = getSortedPostsData()
  // return {
  //   props: {
  //     allPostsData
  //   }
  // }
}

const getAllPosts = async () => {
  const client = createClient()
  try {
    const response = await client
      .getEntries({
        content_type: "post",
        order: "-sys.createdAt",
      })
      .catch((error) => {
        return error
      })
    return response
  } catch(error) {
    throw new Error(error.message)
  }
}
