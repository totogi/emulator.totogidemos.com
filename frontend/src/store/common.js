export const graphQLUrl = 'https://4c3mrbifgveqpkxnni5fcjhjwi.appsync-api.us-east-1.amazonaws.com/graphql'
export const cognitoIdpSignInUrl = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_us-east-1_bYrFO4DaR/'
export const proxyUrlProd = 'https://a6m27qjylj.execute-api.us-west-2.amazonaws.com/'
export const proxyUrlDev = 'https://qtl38i42a0.execute-api.us-west-2.amazonaws.com/'
export const notificationsUrlProd = 'https://s1troos7c4.execute-api.us-west-2.amazonaws.com/'
export const notificationsUrlDev = 'https://1k4plqkowb.execute-api.us-west-2.amazonaws.com/'

export const notificationsUrl = process.env.NODE_ENV === 'development' ? notificationsUrlDev : notificationsUrlProd
export const proxyUrl = process.env.NODE_ENV === 'development' ? proxyUrlDev : proxyUrlProd
