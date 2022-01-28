import settings from "../app/settings.js";
import {get} from "./fetchWrapper";

// Observable/reactive profile info
// TODO vue 3 syntax
//export const profile = reactive({
const profile = {
    userId: null,
    name: null
};
export { profile }

/**
 * Load the current user profile info using the access token
 */
function loadProfile()
{
    return get(`${settings.api}/api/security/userInfo`)
    .then(dto =>
        {
            profile.userId = dto.userId;
            profile.name = dto.fullName;
            profile.persona = dto.persona;
        });
};
export { loadProfile }

// Default export as a static class
class Profile { }
Profile.profile = profile;
Profile.loadProfile = loadProfile;
export default Profile;
