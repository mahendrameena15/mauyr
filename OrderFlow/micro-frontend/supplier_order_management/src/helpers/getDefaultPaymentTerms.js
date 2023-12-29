export const getDefaultPaymentTerms = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL

  const defaultPaymentTerms = await fetch(
    `${mastersUrl}/api/DefaultPaymentTerm`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return defaultPaymentTerms;
};
