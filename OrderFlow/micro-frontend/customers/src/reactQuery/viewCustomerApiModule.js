export const getStates = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;
  try {
    const getuserState = await fetch(`${mastersUrl}/api/State`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return getuserState;
  } catch (error) {
    throw new Error(error);
  }
};

export const getdefaultPaymentTerm = async () => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  try {
    const defaultTerm = await fetch(`${mastersUrl}/api/DefaultPaymentTerm`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return defaultTerm;
  } catch (error) {
    throw new Error(error);
  }
};

export const getdefaultPaymentMethod = async (defaultPaymentTerm) => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  try {
    if (!defaultPaymentTerm || !defaultPaymentTerm?.label) {
      return null;
    }
    const defaultPaymentMethod = await fetch(
      `${mastersUrl}/api/order?DefaultPaymentTerm=${defaultPaymentTerm?.label?.trim()}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
    return defaultPaymentMethod;
  } catch (error) {
    throw new Error(error);
  }
};
