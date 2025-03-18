import { strict as assert } from "assert";
import contentfulManagement from "contentful-management";
import { EnvironmentGetter } from "contentful-typescript-codegen";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { CTF_MANAGEMENT_API_ACCESS_TOKEN, NEXT_PUBLIC_CTF_SPACE_ID, CTF_ENV } = process.env;

assert(CTF_MANAGEMENT_API_ACCESS_TOKEN);
assert(NEXT_PUBLIC_CTF_SPACE_ID);
assert(CTF_ENV);

const getContentfulEnvironment: EnvironmentGetter = () => {
  const contentfulClient = contentfulManagement.createClient({ accessToken: CTF_MANAGEMENT_API_ACCESS_TOKEN });

  return contentfulClient.getSpace(NEXT_PUBLIC_CTF_SPACE_ID).then((space) => space.getEnvironment(CTF_ENV));
};

export default getContentfulEnvironment;
