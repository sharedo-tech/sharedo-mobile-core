# Sharedo Mobile Core
An npm package containing components and services to help quickly
develop a sharedo mobile app based on Vue/Vuetify.

## Building
```
npm ci          # alternative to `npm install` that doesn't rebuild package-lock.json
npm run build
npm run serve   # also builds & hot-reloads for development
npm run test
npm run lint
npm pack        # after a build, packages for local testing
npm publish
```

## Installing
```
# latest stable
npm install @sharedo/mobile-core
```

View the [npm package](https://www.npmjs.com/package/@sharedo/mobile-core).

## Testing the npm package locally
After running `npm run build && npm pack`, run the following in your app:

```
npm install ..\(path-to-this-project)\sharedo-mobile-core-0.1.0.tgz
```

## Publishing
After testing locally, and committing all changes, run the following:
```
npm version {new-version} --no-git-tag-version
npm publish
git tag -a {new-version} -m {new-version}
git push origin {new-version}
git reset --hard                # Avoid pushing changes to package/package-lock
```

## Documentation
Check out [live examples](https://ambitious-rock-0b8da8903.azurestaticapps.net/). There's
also a [sample app](https://github.com/sharedo-tech/sharedo-sample-mobile-app) which makes use of this
package to build a real user journey.
