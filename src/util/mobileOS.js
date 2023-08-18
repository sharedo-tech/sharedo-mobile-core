const IOS = "iOS";
const ANDROID = "Android";
const OTHER = "Other";

const getMobileOS = () => {
  const ua = navigator.userAgent;

  if (/android/i.test(ua)) {
    return ANDROID;
  }

  // Use of 'navigator.platform' is not ideal but at the moment it's the best we have for detecting the iPadOS variant of iOS.
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return IOS
  }

  return OTHER;
}

export {
  IOS,
  ANDROID,
  OTHER,
  getMobileOS
}