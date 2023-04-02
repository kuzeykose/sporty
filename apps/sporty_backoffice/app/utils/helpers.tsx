export const responseHandler = async (response: Response) => {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (!response.ok) {
    const error = data && data.message;
    return Promise.reject();
  }

  return data;
};
