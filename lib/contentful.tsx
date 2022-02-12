import * as contentful from 'contentful'
const config = {
  space: process.env.NEXT_PUBLIC_CTF_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CTF_CDA_ACCESS_TOKEN
}

export const createClient = () => {
  return contentful.createClient(config)
}
