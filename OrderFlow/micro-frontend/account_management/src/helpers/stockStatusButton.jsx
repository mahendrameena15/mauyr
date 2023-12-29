export const stockStatus = (availableQty, stockThreshold) => {
  if (availableQty === 0) {
    return (
      <p
        style={{
          background: "rgba(220, 53, 69, 0.05)",
        }}
        className="px-4 py-1 bg-[rgba(220, 53, 69, 0.05)] rounded-[30px] text-sm font-medium text-[#DC3545] "
      >
        Out of stock
      </p>
    );
  } else if (availableQty <= stockThreshold) {
    return (
      <p
        style={{
          background: "rgba(255, 167, 11, 0.08)",
        }}
        className="px-4 py-1 bg-[rgba(255, 167, 11, 0.08)] rounded-[30px] text-sm font-medium text-[#FFA70B] "
      >
        Low stock
      </p>
    );
  } else if (availableQty >= stockThreshold) {
    return (
      <p
        style={{
          background: "rgba(33, 150, 83, 0.08)",
        }}
        className="px-4 py-1 bg-[rgba(33, 150, 83, 0.08)] rounded-[30px] text-sm font-medium text-[#219653]"
      >
        In stock
      </p>
    );
  }
};
