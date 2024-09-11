import React from "react";
import SubTitle from "./sub-title";
import InfoCard from "./infoCard";

export default function Activities() {
  return (
    <div className=" hidden fixed lg:right-[5%] xl:right-[8%] 2xl:right-[10%] top-[3.3rem] w-full xl:max-w-[250px] py-6 lg:flex max-w-[200px] border-l pb-[5rem] pl-3 flex-col min-h-[92vh] ">
      <SubTitle title="Important Information 🏢" />
      <div className="my-6 flex flex-col gap-3">
        <InfoCard />
        <InfoCard />
        {/* <p className="text-sm">No Opportunities to show!</p> */}
      </div>

      <footer className=" mt-auto text-sm ">
        <p>© {new Date().getFullYear()}. Success begins at Cavendish</p>
      </footer>
    </div>
  );
}
