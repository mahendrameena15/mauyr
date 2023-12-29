export const convertImportedCustomerList = (importedCustomers) => {
  try {
    const organisationId = localStorage.getItem("organisationId");
    const customers = importedCustomers.map((customer) => {
      return {
        createdBy: "supplier",
        businessName: customer?.businessName ? customer.businessName : "",
        abn: customer?.abn ? customer.abn.toString() : "",
        liquorLicence: customer?.liquorLicence ? customer.liquorLicence : "",
        salesRepId: "",
        pricingProfileId: "",
        defaultPaymentMethodId: customer?.defaultPaymentMethodId
          ? customer.defaultPaymentMethodId.split(",")
          : [],
        defaultPaymentTerm: customer?.defaultPaymentTerm
          ? customer.defaultPaymentTerm.split(",")
          : [],
        tags: customer?.tags ? customer.tags.split(",") : [""],
        organisationId: organisationId,
        wetLiable: customer?.wetLiable === 1 || true ? true : false,
        orderingFirstName: customer?.orderingFirstName
          ? customer.orderingFirstName
          : "",
        orderingLastName: customer?.orderingLastName
          ? customer.orderingLastName
          : "",
        orderingMobile: customer?.orderingMobile
          ? customer.orderingMobile.toString()
          : "",
        orderingEmail: customer?.orderingEmail ? customer.orderingEmail : "",
        deliveryFirstName: customer?.deliveryFirstName
          ? customer.deliveryFirstName
          : "",
        deliveryLastName: customer?.deliveryLastName
          ? customer.deliveryLastName
          : "",
        deliveryMobile: customer?.deliveryMobile
          ? customer.deliveryMobile.toString()
          : "",
        deliveryEmail: customer?.deliveryEmail ? customer.deliveryEmail : "",
        address: customer?.address ? customer.address : "",
        apartment: customer?.apartment ? customer.apartment : "",
        suburb: customer?.suburb ? customer.suburb : "",
        postalCode: customer?.postalCode ? customer.postalCode.toString() : "",
        state: customer?.state ? customer.state : "",
        deliveryNotes: customer?.deliveryNotes ? customer.deliveryNotes : "",
        billingAddress: customer?.billingAddress ? customer.billingAddress : "",
        billingApartment: customer?.billingApartment
          ? customer.billingApartment
          : "",
        billingSuburb: customer?.billingSuburb ? customer.billingSuburb : "",
        billingPostalCode: customer?.billingPostalCode
          ? customer.billingPostalCode.toString()
          : "",
        billingState: customer?.billingState ? customer.billingState : "",
        theme: {
          bannerThemeColor: "",
          buttonThemeColor: "",
          commonThemeColor: "",
        },
        catalogueId: localStorage.getItem("catalogueId"),
        cCatalogueId: localStorage.getItem("cCatalogueId"),
        isActive: "1",
      };
    });

    return customers;
  } catch (error) {
    throw new Error("Something went wrong while processing, please try again.");
  }
};
