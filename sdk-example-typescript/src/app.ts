import {
  ClientCredentialsScheme,
  ContentHubOneClientFactory,
  ContentHubOneClientOptions,
} from "@sitecore/contenthub-one-sdk";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("[error]: The CLIENT_ID and CLIENT_SECRET environment variable are required");
  process.exit(1);
}

const apiBasePath = "https://content-api.sitecorecloud.io";
const audience = "https://api.sitecorecloud.io";
const authority = "https://auth.sitecorecloud.io/oauth/token";
const mediaUploadBasePath = "https://mms-upload.sitecorecloud.io";
const mediaDeliveryBasePath = "https://mms-delivery.sitecorecloud.io	";

const credentials = new ClientCredentialsScheme(clientId, clientSecret);
const client = ContentHubOneClientFactory.create(credentials);

/// TODO Does not seem to work, check with team
//const client = ContentHubOneClientFactory.create(
//  credentials,
//  new ContentHubOneClientOptions({
//    apiEnvironment: {
//      apiBasePath: apiBasePath,
//      identityAuthority: authority,
//      identityAudience: audience,
//      mediaUploadBasePath: mediaUploadBasePath,
//    },
//  })
//);

async function getContentTypes(): Promise<void> {
  const items = await client.contentTypes.getAsync();

  items.data.forEach((item) => {
    console.log(item.name["en-US"]);
  });
}

async function getContentItems(): Promise<void> {
  const items = await client.contentItems.getAsync();
  items.data.forEach((item) => {
    //console.log({ item });
    console.log(item.fields);
  });
}

getContentTypes();

getContentItems();
