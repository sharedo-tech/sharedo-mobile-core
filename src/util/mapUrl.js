import { getMobileOS, IOS, ANDROID } from "./mobileOS"

const asQueryString = location => encodeURIComponent(`${location.addressLine1},${location.addressLine2},${location.town},${location.postCode},${location.country}`);

const hasLatLong = location => location.latitude !== undefined
  && location.latitude !== null
  && location.longitude !== undefined
  && location.longitude !== null

class MapUrlGenerator {
  constructor(location) {
    this.__location = location;
  }

  generate() { }

  static getFor(location) {
    const os = getMobileOS();

    if ([IOS, ANDROID].includes(os)) {
      if (hasLatLong(location)) {
        return new GeoMapUrlGenerator(location);
      } else if (getMobileOS() === IOS) {
        return new AppleMapsUrlGenerator(location);
      }
    }

    return new GoogleMapsUrlGenerator(location);
  }
}

class GeoMapUrlGenerator extends MapUrlGenerator {
  constructor(location) {
    super(location);
  }

  generate() {
    return `geo:${this.__location.latitude},${this.__location.longitude}`;
  }
}

class AppleMapsUrlGenerator extends MapUrlGenerator {
  constructor(location) {
    super(location);
  }

  generate() {
    return `https://maps.apple.com/maps?q=${asQueryString(this.__location)}`;
  }
}

class GoogleMapsUrlGenerator extends MapUrlGenerator {
  constructor(location) {
    super(location);
  }

  generate() {
    return `https://maps.google.com/?q=${asQueryString(this.__location)}`;
  }
}

export default MapUrlGenerator