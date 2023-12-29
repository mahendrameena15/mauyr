import React, { useEffect } from "react";
import { Spin } from "antd";

const Loader = () => {
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  useEffect(() => {
    showLoader();
  }, []);
  return (
    <main
      style={{ height: "100vh" }}
      className="flex min-h-full font-inter justify-center gap-2 place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <h1 className="font-inter font-normal text-lg">LOADING...</h1>
      <Spin size="large" spinning={spinning} fullscreen="true" />
    </main>
  );
};

export default Loader;
