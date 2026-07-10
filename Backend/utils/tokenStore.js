const refreshTokenStore = new Map();

const setRefreshToken = (token, payload) => {
  refreshTokenStore.set(token, payload);
};

const getRefreshToken = (token) => refreshTokenStore.get(token);

const deleteRefreshToken = (token) => refreshTokenStore.delete(token);

const deleteTokensByUserId = (userId) => {
  for (const [token, payload] of refreshTokenStore.entries()) {
    if (String(payload.userId) === String(userId)) {
      refreshTokenStore.delete(token);
    }
  }
};

module.exports = {
  setRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
  deleteTokensByUserId,
};
