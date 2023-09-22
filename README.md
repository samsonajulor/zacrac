# zacrac documentation

### Scripts

1. **test**
   - Command: `yarn test`
   - Description: Executes Mocha tests for files in the `src/test` directory with specified configurations. It also collects code coverage information using NYC.

2. **watch-ts**
   - Command: `yarn watch-ts`
   - Description: Watches TypeScript files and compiles them in real-time using the TypeScript compiler (`tsc`) with the `-w` flag for continuous compilation.

3. **start**
   - Command: `yarn start`
   - Description: Starts the Node.js application by running the `dist/server.js` file.

4. **dev**
   - Command: `yarn dev`
   - Description: Launches the development server using `nodemon`, which monitors TypeScript files in the `src` directory and automatically restarts the server when changes occur.

5. **build-ts**
   - Command: `yarn build-ts`
   - Description: Compiles TypeScript files using the TypeScript compiler (`tsc`) without cleaning the `dist` directory.

6. **format**
    - Command: `yarn format`
    - Description: Formats JavaScript, TypeScript, Markdown, and JSON files using Prettier with the configuration from `.prettierrc`.
7. **deploy**
    - Command: `yarn deploy`
    - Description: Deploys the application from serverless.yml.
