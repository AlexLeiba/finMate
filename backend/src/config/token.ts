const refreshTokenExpiresAt = 7 * 24 * 60 * 60 * 1000; // 7 days
const accessTokenCookieExpiresAt = 1 * 60 * 1000; // 1hr //TODO change to 15 min, integrate interseptions which will call refresh-token router

export { refreshTokenExpiresAt, accessTokenCookieExpiresAt };
