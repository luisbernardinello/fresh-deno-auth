// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_auth_login from "./routes/api/auth/login.ts";
import * as $api_auth_register from "./routes/api/auth/register.ts";
import * as $index from "./routes/index.tsx";
import * as $login_index from "./routes/login/index.tsx";
import * as $register_index from "./routes/register/index.tsx";
import * as $auth_LoginPage from "./islands/auth/LoginPage.tsx";
import * as $auth_RegisterPage from "./islands/auth/RegisterPage.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/auth/login.ts": $api_auth_login,
    "./routes/api/auth/register.ts": $api_auth_register,
    "./routes/index.tsx": $index,
    "./routes/login/index.tsx": $login_index,
    "./routes/register/index.tsx": $register_index,
  },
  islands: {
    "./islands/auth/LoginPage.tsx": $auth_LoginPage,
    "./islands/auth/RegisterPage.tsx": $auth_RegisterPage,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
