// Order details by orderId api
export const getOrderDetails = async (orderId) => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;
  const orderDetailsResponse = await fetch(
    `${omsSupplierUrl}/api/OMSupplier/getOrderDetailsByOrderId?OrderId=${orderId}&productstatus=sealed`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      return false;
    })
    .catch((error) => console.log(error));

  return orderDetailsResponse;
};

// Changing order payment status api
export const paymentStatusChange = async (orderDetails, status) => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;

  const paymentStatusChangeResponse = await fetch(
    `${omsSupplierUrl}/api/OMSupplier/UpdatePaymentStatus?OrderId=${orderDetails?.orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: "supplier",
        buyerId: orderDetails?.buyerId,
        orderByEmailID: orderDetails?.emailId,
        orderStatus: orderDetails?.orderStatus,
        transactionStatus: status,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    });

  if (paymentStatusChangeResponse) {
    await createTimeline("action", status, orderDetails, "payment", "");
  }

  return paymentStatusChangeResponse;
};

//Getting ordr status list if order status is processing
export const getOrderStatusList = async (orderStatus) => {
  const mastersUrl = process.env.REACT_APP_MASTERS_URL;

  const orderStatusListResponse = await fetch(
    `${mastersUrl}/api/order/status?status=${orderStatus}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else return [];
    })
    .catch((error) => console.log(error));

  return orderStatusListResponse;
};

// Order status change api
export const orderStatusChange = async (status, orderDetails) => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;

  const response = await fetch(
    `${omsSupplierUrl}/api/OMSupplier/UpdateOrderStatus?OrderId=${orderDetails?.orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdBy: "supplier",
        orderId: orderDetails?.orderId,
        orderByEmailID: orderDetails?.emailId,
        orderStatus: status,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return true;
      else return false;
    })
    .catch((error) => console.log(error));

  if (response) {
    await createTimeline("action", status, orderDetails, "order", "");
  }

  return response;
};

// Get timeline
export const getTimeline = async (orderDetails) => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;

  const response = await fetch(
    `${omsSupplierUrl}/api/OMSupplier/getOrderCommentByOrderId?OrderId=${orderDetails?.orderId}`,
    {}
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) return data.data;
      else return [];
    })
    .catch((error) => console.log(error));

  return response;
};

// Create timeline
export const createTimeline = async (
  name,
  orderStatus,
  orderDetails,
  actionType,
  inputComment
) => {
  const omsSupplierUrl = process.env.REACT_APP_OMS_SUPPLIER_URL;

  let action = "";
  let comment = "";

  if (inputComment !== "") {
    comment = inputComment;
  }

  if (actionType === "payment") {
    switch (orderStatus) {
      //Payment statements
      case "Pending":
        action = "Payment process initiated.";
        break;
      case "Authorised":
        action = "Payment authorised.";
        break;
      case "Paid":
        action = "Payment completed.";
        break;
      case "Overdue":
        action = "Payment overdue.";
        break;
      default:
        action = "";
    }
  } else {
    switch (orderStatus) {
      //Order statements
      case "Pending":
        action = "Order viewed.";
        break;
      case "Processing":
        action = "Order confirmed.";
        break;
      case "Cancelled":
        action = "Order Cancelled.";
        break;
      case "Shipped":
        action = "Order marked as shipped.";
        break;
      case "Partially fulfilled":
        action = "Order marked as Partially Fulfilled.";
        break;
      case "Delivered":
        action = "Order marked as Delivered.";
        break;
      case "Complete":
        action = "Order journey completed.";
        break;
      default:
        action = "";
    }
  }

  let payload = {
    orderId: "",
    orderStatus: "",
    transactionStatus: "",
    orderByEmailID: "",
    comments: "",
    action: "",
  };

  if (name === "action") {
    payload = {
      orderId: orderDetails?.orderId,
      orderStatus:
        actionType === "payment" ? orderDetails?.orderStatus : orderStatus,
      transactionStatus:
        actionType === "payment" ? orderStatus : orderDetails?.orderStatus,
      orderByEmailID: orderDetails?.emailId,
      comments: "",
      action: action,
    };
  } else {
    payload = {
      orderId: orderDetails?.orderId,
      orderStatus:
        actionType === "payment" ? orderDetails?.orderStatus : orderStatus,
      transactionStatus:
        actionType === "payment" ? orderStatus : orderDetails?.orderStatus,
      orderByEmailID: orderDetails?.emailId,
      comments: comment,
      action: "",
    };
  }

  const response = await fetch(
    `${omsSupplierUrl}/api/OMSupplier/OrdersHistory?OrderId=${orderDetails?.orderId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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

//Format timeline
export const timelineConvert = (timelineResponse) => {
  const timeline = [];

  const dateActionMap = new Map(); // Create a map to group actions by date

  timelineResponse.forEach((item) => {
    const date = timelineDateFormat(item?.orderEntryDate);

    if (!dateActionMap.has(date)) {
      dateActionMap.set(date, {
        actionDate: date,
        actions: [],
      });
    }

    dateActionMap.get(date).actions.push({
      action: item?.action,
      comment: item?.comments,
      time: timelineTimeFormat(item?.orderEntryDate),
    });
  });

  // Convert the map values to an array
  timeline.push(...dateActionMap.values());

  return timeline;
};

//Format Date
const timelineDateFormat = (inputDate) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
};

//Format time
const timelineTimeFormat = (inputTime) => {
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(inputTime);
  const time = date.toLocaleDateString("en-US", options).split(", ");
  return time[1];
};

//Function made to convert full name into its shorten form
export const nameShortner = (name) => {
  const words = name.split(" "); // Split the name into words
  const initials = words.map((word) => word.charAt(0).toUpperCase()); // Get the first character of each word and capitalize it
  return initials.join(""); // Join the initials together and return as a string
};
