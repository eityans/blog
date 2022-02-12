import { createClient } from 'contentful'
const config = {
  space: process.env.NEXT_PUBLIC_CTF_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CTF_CDA_ACCESS_TOKEN
}

const client = () => {
  return createClient(config)
}

export const getAllPosts = async () => {
    try {
      const response = await client()
        .getEntries({
          content_type: "post",
          order: "-sys.createdAt",
        })
        .catch((error) => {
          return error
        })
      return response.items
    } catch(error) {
      throw new Error(error.message)
    }
  }

export const getPostData = async (slug) => {
  try {
    const posts = await client()
      .getEntries({
        content_type: 'post',
        'fields.slug': slug
      })
      .catch((error) => {
        return error
      })
    return posts.items[0]
  } catch(error) {
    throw new Error(error.message)
  }
}
