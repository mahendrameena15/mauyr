export const generateUniqueKey = () => {
    const currentTime = new Date().getTime().toString();
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let key = '';

  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }

  const timestampIndex = Math.floor(Math.random() * 24);
  const timestampPart = currentTime.slice(timestampIndex, timestampIndex + 8);

  key = key.slice(0, 16) + timestampPart + key.slice(16);

  return key;
  
};
