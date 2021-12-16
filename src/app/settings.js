
const settings =
{
    identity: "https://xyz-identity.sharedo.co.uk",
    api: "https://xyz.sharedo.co.uk",
    clientId: "mobile-app",
    clientSecret: "not a secret",
    redirectUri: "https://localhost:8080/oAuthReply",
}

// Override values
export function override(overrides)
{
    Object.assign(settings, overrides);
};
 
export default settings;
