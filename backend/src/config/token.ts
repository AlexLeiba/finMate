const REFRESH_TOKEN_EXPIRES_AT = 7 * 24 * 60 * 60 * 1000; // 7 days
const ACCESS_TOKEN_EXPIRES_AT = 1 * 60 * 1000; // 1min //TODO change to 15 min, integrate interseptions which will call refresh-token router

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const DEVELOPMENT_ENVIRONMENT = "development";

export {
  REFRESH_TOKEN_EXPIRES_AT,
  ACCESS_TOKEN_EXPIRES_AT,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  DEVELOPMENT_ENVIRONMENT,
};
