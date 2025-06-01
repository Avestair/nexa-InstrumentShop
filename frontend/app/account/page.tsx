"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AccountSidebar from "../../components/AccountSideBar";
import AccountDetails from "../../components/AccountDetail";
import Addresses from "../../components/Address";
import Orders from "../../components/Orders";
import Invoices from "../../components/Invoices";

type ActiveSection = "account-details" | "addresses" | "orders" | "invoices";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("account-details");

  const renderContent = () => {
    switch (activeSection) {
      case "account-details":
        return <AccountDetails />;
      case "addresses":
        return <Addresses />;
      case "orders":
        return <Orders />;
      case "invoices":
        return <Invoices />;
      default:
        return <AccountDetails />;
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 }, // Starts off to the left and invisible
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    }, // Slides in
    exit: { opacity: 0, x: 50, transition: { duration: 0.3, ease: "easeIn" } }, // Slides out to the right
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10 grid min-h-[70dvh] rounded-sm border border-gray-200 bg-gray-50 lg:flex lg:justify-between">
        <AccountSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="mx-4 my-4 flex justify-center rounded-sm bg-red-400 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
