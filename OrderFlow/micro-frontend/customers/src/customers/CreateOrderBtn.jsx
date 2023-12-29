import React from "react";
import { useNavigate } from "react-router-dom";
function CreateOrderBtn() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        className=" border rounded 	w-fit px-4		h-10	flex justify-center items-center text-base	font-medium	gap-2 btn-animation"
        onClick={() =>
          navigate("/main/customers/add-customer/customer-details")
        }
      >
        <div className="">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.40791 11.25H8.59209V8.09209H11.75V6.90791H8.59209V3.75001H7.40791V6.90791H4.25001V8.09209H7.40791V11.25ZM8.00132 15C6.964 15 5.98897 14.8032 5.07624 14.4095C4.16348 14.0158 3.36952 13.4815 2.69435 12.8066C2.01916 12.1318 1.48464 11.3381 1.09078 10.4258C0.696928 9.51347 0.5 8.53864 0.5 7.50132C0.5 6.464 0.696843 5.48897 1.09053 4.57624C1.48421 3.66348 2.01849 2.86952 2.69336 2.19435C3.36824 1.51916 4.16186 0.984642 5.0742 0.590785C5.98653 0.196929 6.96136 0 7.99868 0C9.036 0 10.011 0.196843 10.9238 0.590529C11.8365 0.984214 12.6305 1.51849 13.3057 2.19336C13.9808 2.86824 14.5154 3.66186 14.9092 4.5742C15.3031 5.48653 15.5 6.46136 15.5 7.49868C15.5 8.536 15.3032 9.51102 14.9095 10.4238C14.5158 11.3365 13.9815 12.1305 13.3066 12.8057C12.6318 13.4808 11.8381 14.0154 10.9258 14.4092C10.0135 14.8031 9.03864 15 8.00132 15ZM8 13.8158C9.76316 13.8158 11.2566 13.204 12.4803 11.9803C13.704 10.7566 14.3158 9.26316 14.3158 7.5C14.3158 5.73684 13.704 4.24341 12.4803 3.01973C11.2566 1.79604 9.76316 1.18419 8 1.18419C6.23684 1.18419 4.74341 1.79604 3.51972 3.01973C2.29604 4.24341 1.68419 5.73684 1.68419 7.5C1.68419 9.26316 2.29604 10.7566 3.51972 11.9803C4.74341 13.204 6.23684 13.8158 8 13.8158Z"
              fill="white"
            />
          </svg>
        </div>
        <h6 className="text-white">Create order</h6>
      </button>
    </>
  );
}

export default CreateOrderBtn;
