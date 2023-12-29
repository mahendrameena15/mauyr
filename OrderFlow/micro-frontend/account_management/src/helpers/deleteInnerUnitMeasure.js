export const deleteInnerUnitMeasure = async (id) => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const response = await fetch(
    `${mastersUrl}/api/innerUnitOfMeasure/DeleteOrders?Id=${id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  return response;
};
