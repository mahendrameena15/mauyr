import React from "react";
import Header from "../dashboard/Header";
import PersonalDetails from "./PersonalDetails";
import EditProfile from "./EditProfile";

function Profile() {
  return (
    <>
      <section className="home-dashboard grid md:flex">
        <section className="sidebar w-1/5 h-screen	flex justify-between flex-col	 border border-inherit">
          <Sidebar />
        </section>
        <section className="dashboard w-full md:w-4/5 bg-slate-100">
          <div className="container mx-auto px-0">
            <Header />
            <div>
              <div className="profile-section  px-11 padding-top-custom    overflow-y-auto	scroll-smooth	scrollable	">
                <div className="py-12">
                  <h4 className="text-green text-2xl	font-semibold pb-2	">
                    Your profile
                  </h4>
                  <p className="text-gray font-medium	 text-sm	">
                    Customise your public profile
                  </p>
                </div>
                <div className="grid gap-5 md:flex  ">
                  <PersonalDetails />
                  <EditProfile />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Profile;
