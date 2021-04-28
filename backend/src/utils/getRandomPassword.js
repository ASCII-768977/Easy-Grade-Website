const getRandomPassword = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const stringLength = 8;
  let randomstring = '';
  for (let i = 0; i < stringLength; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(randomNum, randomNum + 1);
  }
  return randomstring;
};

module.exports = getRandomPassword;
