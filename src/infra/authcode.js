import settings from "../app/settings.js";

/**
 * The current token auth state. This is made reactive
 * so we can swap the vue views depending on if you're
 * signed in or not.
 */
// TODO vue 3 syntax
//export const auth = reactive({
const auth = {
    accessToken: null,
    refreshToken: null
};
export { auth };

/**
 * Initialises authentication - will redirect to identity
 * if the user is not signed in/we have no tokens. If we have 
 * tokens in storage, loads them. If we are receiving an oauth
 * auth code response, processes it.
 * @returns promise
 */
function initialise(notLoggedIn)
{
    return new Promise((resolve, reject) =>
    {
        // Are we receiving a code response?
        if (window.location.pathname.toLowerCase() === "/oauthreply")
        {
            receiveCode().then(
                () =>
                {
                    // Redirect to '/' to go to default page, and so that refreshing browser doesn't error
                    window.location.href = "/";
                },
                reject);
            return;
        };

        // Note: Here we're loading tokens from session storage as a complete
        // Note: example. Normally we wouldn't store tokens at all except in memory
        getTokensFromStorage();
        if (auth.accessToken && auth.refreshToken)
        {
            resolve();
            return;
        }

        // Not receiving and nothing stored - go login please.
        notLoggedIn();
    });
}
export { initialise }

function getTokensFromStorage()
{
    var at = localStorage.getItem("_at");
    var rt = localStorage.getItem("_rt");
    if (at) auth.accessToken = at;
    if (rt) auth.refreshToken = rt;
}

/**
 * Internal method that receives an auth code response. If it's a valid
 * response, attempts to exchange the auth code for access and refresh
 * tokens that can then be used to call the APIs.
 * @returns promise
 */
function receiveCode()
{
    return new Promise((resolve, reject) =>
    {
        // Is there a code and state parameter in the query string
        var q = getQueryParams();
        if (!q.code)
        {
            console.error("No code presented in oAuthResponse");
            reject(q.error || "Error");
            return;
        }

        // Exchange code for access and refresh tokens
        var url = `${settings.identity}/connect/token`;
        var request =
        {
            method: "POST",
            cache: "no-cache",
            headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "client_id=" + settings.clientId +
                "&client_secret=" + settings.clientSecret +
                "&grant_type=authorization_code" +
                "&scope=sharedo+offline_access" +
                "&redirect_uri=" + encodeURIComponent(settings.redirectUri) +
                "&code=" + q.code
        };

        fetch(url, request).then(response =>
        {
            if (!response.ok)
            {
                reject(response.status + " Could not exchange auth code" + response.statusText);
                return;
            }

            response.json().then(data =>
            {
                updateTokens(data["access_token"], data["refresh_token"]);
                // TODO
                //router.replace(decodeURIComponent(q.state || "/"));
                resolve();
            });
        }, err => 
        {
            reject(err);
        });
    });
};

function getQueryParams()
{
    var url = window.location.href;
    var result = {};
    var params = url.substring(url.indexOf("?") + 1).split("&");

    params.forEach(v =>
    {
        var kvp = v.split("=");
        result[kvp[0]] = decodeURIComponent(kvp[1]);
    });

    return result;
}

/**
 * Attempts to use the refresh token to obtain a new access token
 * @returns promise
 */
function getNewTokens()
{
    return new Promise((resolve, reject) =>
    {
        console.log("Requesting new access token");
        if (!auth.refreshToken)
        {
            console.warn("No refresh token available");
            reject();
            return;
        }

        // Request a new access token
        var url = `${settings.identity}/connect/token`;
        var request =
        {
            method: "POST",
            cache: "no-cache",
            headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "client_id=" + settings.clientId +
                "&client_secret=" + settings.clientSecret +
                "&grant_type=refresh_token" +
                "&scope=sharedo+offline_access" +
                "&refresh_token=" + auth.refreshToken
        };

        fetch(url, request).then(response =>
        {
            if (!response.ok)
            {
                reject(response.status + " Could not obtain new tokens " + response.statusText);
                return;
            }

            response.json().then(data =>
            {
                console.log("Got a new access token");
                var newAccessToken = data["access_token"];
                var newRefreshToken = data["refresh_token"];
                updateTokens(newAccessToken, newRefreshToken);
                resolve(newAccessToken);
            });
        }, err => 
        {
            reject(err);
        });
    });
}
export { getNewTokens }

/**
 * Invalidates any tokens that are in use, signing the user out.
 * @returns promise
 */
function logout()
{
    return new Promise((resolve, reject) =>
    {
        var jobs = [];
        // Revoke the access token
        if (auth.accessToken)
        {
            jobs.push(fetch(`${settings.identity}/connect/revocation`,
                {
                    method: "POST",
                    cache: "no-cache",
                    headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "client_id=" + settings.clientId +
                        "&client_secret=" + settings.clientSecret +
                        "&token=" + auth.accessToken +
                        "&token_type_hint=access_token"
                }));
        }

        // Revoke the refresh token
        if (auth.refreshToken)
        {
            jobs.push(fetch(`${settings.identity}/connect/revocation`,
                {
                    method: "POST",
                    cache: "no-cache",
                    headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "client_id=" + settings.clientId +
                        "&client_secret=" + settings.clientSecret +
                        "&token=" + auth.refreshToken +
                        "&token_type_hint=refresh_token"
                }));
        }

        Promise.all(jobs).then(() =>
        {
            updateTokens(null, null);
            resolve();
        });
    });
}
export { logout }

function redirectToLogin()
{
    // Doesn't actually redirect, just loads the app with a "not-signed in message"
    updateTokens(null, null);
    window.location.href = "/pleaseSignIn";
}
export { redirectToLogin }

/**
 * Redirects the user to the login page on sharedo's identity server
 */
function reallyRedirectToLogin()
{
    // Get the requested path from the url, we'll restore it later
    var state = "/"; //window.location.pathname;

    var url = settings.identity;
    url += "/connect/authorize";
    url += `?client_id=${settings.clientId}`;
    url += "&scope=sharedo offline_access";
    url += "&response_type=code"
    url += `&redirect_uri=${encodeURIComponent(settings.redirectUri)}`;
    url += `&state=${encodeURIComponent(state)}`;

    window.location.href = url;
};
export { reallyRedirectToLogin }

function updateTokens(access, refresh)
{
    // Note: Here we're also saving tokens to session storage
    // Note: so a reload doesn't require obtaining tokens again.
    // Note: Normally, we wouldn't do this without acknowleding the
    // Note: risk of storing the tokens in the browser.
    if (access)
    {
        localStorage.setItem("_at", access);
        auth.accessToken = access;
    }
    else
    {
        localStorage.removeItem("_at");
        auth.accessToken = null;
    }

    if (refresh)
    {
        localStorage.setItem("_rt", refresh);
        auth.refreshToken = refresh;
    }
    else
    {
        localStorage.removeItem("_rt");
        auth.refreshToken = null;
    }
}


window.logout = logout;

// Default export as a static class
class Auth { }
Auth.reallyRedirectToLogin = reallyRedirectToLogin;
Auth.auth = auth;
Auth.initialise = initialise;
Auth.getNewTokens = getNewTokens;
Auth.logout = logout;
Auth.redirectToLogin = redirectToLogin;
Auth.reallyRedirectToLogin = reallyRedirectToLogin;
export default Auth;
