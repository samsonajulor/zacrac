# zacrac documentation

[APP_BASE_URL](https://cuasq4803d.execute-api.us-east-1.amazonaws.com/dev/v1.0)
[API Documentation](https://documenter.getpostman.com/view/18357475/2s9YCBvVMv)

# This API was deployed with Serverless Framework on AWS Lambda and Docker

## Getting Started

1. **Clone This Repository:**

   ```bash
   git clone https://github.com/samsonajulor/zacrac
   cd zacrac
   ```

2. **Install Dependencies:**

   ```bash
   yarn
   ```

PS: This app was bundled with serverless-http package

3. **Deploy to AWS Lambda:**

   Deploy your Lambda function to AWS using the Serverless Framework:

   ```bash
   yarn deploy
   ```

5. **Access Lambda Function via the generated url:**
[APP_URL](https://cuasq4803d.execute-api.us-east-1.amazonaws.com/dev)
   

## Cleanup

To remove the deployed Lambda function and associated resources, you can run:

```bash
yarn remove
```

This will delete the AWS resources created by the Serverless Framework.

### Scripts
1. **start**
   - Command: `yarn start`
   - Description: Starts the Node.js application by running the `dist/server.js` file.

2. **dev**
   - Command: `yarn dev`
   - Description: Launches the development server using `nodemon`, which monitors TypeScript files in the `src` directory and automatically restarts the server when changes occur.

3. **build-ts**
   - Command: `yarn build-ts`
   - Description: Compiles TypeScript files using the TypeScript compiler (`tsc`) without cleaning the `dist` directory.

4. **format**
    - Command: `yarn format`
    - Description: Formats JavaScript, TypeScript, Markdown, and JSON files using Prettier with the configuration from `.prettierrc`.
5. **deploy**
    - Command: `yarn deploy`
    - Description: Deploys the application from serverless.yml.


## Endpoints:

### User Signup

**HTTP Method:** POST <br/>
**Route:** /auth/signup

**Functionality:**

- Allows users to create accounts with email (required), phone (optional), password (required), and username (optional).

**Steps:**

1. Validate request parameters.
2. Check email and username uniqueness.
3. Generate a verification token.
4. Create a user account with a hashed password.
5. Respond with success token to be verified before protected routes can be accessed.



### User Login

**HTTP Method:** POST <br/>
**Route:** /auth/login

**Functionality:**

- Allows users to log in by providing their email and password.

**Steps:**

1. Determine the base URL based on the environment (production or development).
2. Find a user with the provided email.
3. Validate user credentials:
   - Check if the user exists.
   - Verify the provided password against the stored hashed password.
4. Handle user login scenarios:
   - If the user is not found or the credentials are invalid, return an unauthorized response.
   - If the user is not active, generates a temporary token for verification.
   - If the user is active, generates a JWT token for authentication and include user information (excluding the password) in the response.


### User Token Verification

**HTTP Method:** GET <br/>
**Route:** /auth/verify

**Functionality:**

- Allows the verification of a user token received as a query parameter.

**Steps:**

1. Extract the `token` parameter from the request query.
2. Verify the token's authenticity using the JWT library and the provided JWT secret.
3. Extract the user's email from the verified token.
4. Retrieve the user from the database based on the email.
5. Check if the user is already marked as active.
6. If the user is not active, it updates their status to active and save the changes.
7. Returns a success response indicating successful registration.


### User Retrieval

**HTTP Method:** GET <br/>
**Route:** /auth/me

**Functionality:**

- Allows retrieval of user details based on user ID, email, or username.

**Steps:**

1. Extract query parameters from the request: `userId`, `email`, and `username`.
2. Based on the provided parameters, retrieve user details from the database using the `userService`.
3. Handle different scenarios:
   - If the `email` parameter is provided, retrieve the user by email.
   - If the `username` parameter is provided, retrieve the user by username.
   - If the `userId` parameter is provided, validate it as a valid MongoDB ObjectId and retrieve the user by ID.
   - else throw an error that the query is not valid.
4. Returns a success response with the retrieved user details.
5. Handles potential error scenarios, such as invalid user ID or user not found.

### User List Retrieval

**HTTP Method:** GET <br/>
**Route:** /users

**Functionality:**

- Allows retrieval of a list of user details with pagination support.

**Steps:**

1. Extract query parameters from the request: `page` and `limit`.
2. Use the `userService` to retrieve a batch of user details based on the provided `page` and `limit` values. Returns a limit of 50 values by default.
3. Return a success response with the retrieved user details.
4. Handle the scenario where no users are found and return a not found response.

### User Update

**HTTP Method:** PUT <br/>
**Route:** /users

**Functionality:**

- Allows updating the user's information.

**Steps:**

1. Retrieve the user information from the `res.locals` object, which is expected to be populated by authentication middleware.
2. Use the `userService` to update the user's information based on their `_id` and the data (either email, firstName, lastName, phoneNumber, address, or username) provided in the request body.
3. Return a success response indicating that the user was updated successfully.

### User Soft Deletion

**HTTP Method:** PATCH <br/>
**Route:** /auth/status

**Functionality:**

- Allows marking a user account for soft deletion or restoring a previously marked account.

**Steps:**

1. Extract parameters from the request body: `deactivate` (to mark for deletion or restore), `id` (user ID), and optional `reason`.
2. Retrieve the user information from the database using the provided `id`.
3. Handle different scenarios:
   - If the user is not found, return a bad request response.
   - If the user account is already marked for deletion and `deactivate` is true, return a bad request response.
   - Update the user's `isDeleted` status based on the `deactivate` parameter and add a deletion date and optional reason.
4. Return a success response indicating whether the account is marked for deletion or restored.

### User Hard Deletion

**HTTP Method:** DELETE <br/>
**Route:** /users/delete

**Functionality:**

- Allows permanently deleting a user account based on email, user ID, or username.

**Steps:**

1. Extract parameters from the request body: `email`, `userId`, and `username`.
2. Determine which parameter is provided to identify the user to be deleted (by email, ID, or username).
3. Use the `userService` to perform the corresponding deletion operation:
   - If `email` is provided, delete the user by email.
   - If `userId` is provided, delete the user by user ID.
   - If `username` is provided, delete the user by username.
4. Return a success response indicating that the user was deleted successfully.


### User Password Update

**HTTP Method:** POST <br/>
**Route:** /auth/password

**Functionality:**

- Allows users to update their password by providing a new password.

**Steps:**

1. Extract parameters from the request body: `password` and `email`.
2. Check if the `password` parameter is included, and if not, throw an error.
3. Find a user with the provided `email`.
4. Update the user's password with the new hashed password using `bcrypt`.
5. Return a success response indicating that the password reset was successful.

### User Password Reset

**HTTP Method:** POST <br/>
**Route:** /users/reset

**Functionality:**

- Allows users to reset their password by providing their current password and a new password.

**Steps:**

1. Retrieve the user information from the `res.locals` object, which is expected to be populated by authentication middleware.
2. Extract parameters from the request body: `password` (current password) and `updatePassword` (new password).
3. Compare the provided `password` with the hashed password stored in the user's data to ensure it matches. If not, throw an error indicating invalid credentials.
4. Update the user's password with the new hashed password using `bcrypt`.
5. Return a success response indicating that the password reset was successful.

