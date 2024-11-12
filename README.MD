# Getting started
Install dependencies:
```bash
npm install
```
Running project:
```bash
npm start
```

# Project structure

|---app
    |---index.tsx : / page
    |---login.tsx : /login page
    |---signup.tsx : /signup page
    |---_layout.tsx : Layout for user authentication management
|---Authentication
    |---authMethod.tsx : Authentication method (for more information, refer to the [documentation](https://docs.amplify.aws/react/build-a-backend/auth/connect-your-frontend/))
    |---authProvider.tsx : Authentication provider for user authentication
|---amplifyconfiguration.json : AWS configuration
|===other stuff: Project defaults configuration

# Configuring AWS connection
Modify the configuration in ``amplifyconfiguration.json`` file.