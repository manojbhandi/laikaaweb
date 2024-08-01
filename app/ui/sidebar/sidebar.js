"use client";
import React, { useState } from "react";

const SidebarModal = (props) => {
  const { isOpenSidebar, setIsOpenSidebar, sidebarRef, children } = props;

  return (
    <div
      ref={sidebarRef}
      className={` relative h-screen overflow-hidden  ${
        isOpenSidebar ? "block" : "hidden"
      }`}
    >
      <div
        className={`bg-white overflow-y-auto text-white fixed top-0 right-0 h-screen transition-transform duration-300 z-50 max-w-[95%] w-[22rem] sm:w-[30rem] ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>

      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5"
          onClick={() => setIsOpenSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default SidebarModal;
