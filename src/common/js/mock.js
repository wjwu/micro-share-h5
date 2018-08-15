export const mockRequest = (
  delay = 3000,
  data = null,
  error = false,
  errorMsg = '请求出错'
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(errorMsg);
      } else {
        resolve(data);
      }
    }, delay);
  });
};
