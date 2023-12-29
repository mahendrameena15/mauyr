export const postSetupBankingDetails = async (values) => {
  const setupBankingDetails = await fetch(
    `https://setupbankinginfofobohwebapi-fbh.azurewebsites.net/api/SetupBanking/CreateSetupBanking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organisationID: values?.organisationID,
        businessType: values?.businessName,
        legalbusinessname: values?.tradingName,
        acnabn: values?.abn,
        businessAddress: values?.organisationAddress,
        city: values?.suburb,
        postcode: values?.postcode,
        state: values?.state,
        country: "Australia",
        bsBnumber: "",
        accountNumber: "",
        statementDescriptor: "",
        phoneNumber: "",
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    });

  return setupBankingDetails;
};
