# ES6 NPM Package

A repo where Platform Team write NPM packages via ES6 syntax.

It uses:

- Babel
- Jest
- ESLint (with Airbnb and prettier)

Preset added:

- "babel-plugin-transform-object-rest-spread",

## How to use

1. Install this library in your project
   - `npm install sydney-broker`
2. Import a package from ```sydney-broker``` inside your component
3. Check for examples inside the components README.md file

## Commands

- `npm run check` : Checking the updates of all your dependencies
- `npm run lint` : linting via ESLint
- `npm run clean` : Clean the `./lib` folder
- `npm run build`: Clean and build `modules` to `lib`
- `npm run test`: Run tests via `Jest`
- `npm run test -- --coverage`: Generates test coverage report via `Jest`
- `npm run example`: Run example to see if the transpiled code works or not.
- `npm run prepublish`: Clean, lint, test then build,
- `npm run pub`: Interactive way to checking, clean, test, bumping version, tag commits, push repo and publish

## About travis

Instead of running the default `test` command, we will run the `npm run prepare` since it including all the phases for the final release.
