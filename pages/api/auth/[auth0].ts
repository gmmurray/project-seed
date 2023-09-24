import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const audience = process.env.AUTH0_API_AUDIENCE;

export default handleAuth({
  login: handleLogin({
    returnTo: '/home',
    authorizationParams: audience
      ? {
          audience,
        }
      : undefined,
  }),
});
