import React from "react";

export default function KitchenList({ children }) {
  return (
    <div className="kitchen-item mt-8">
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-12 lg:gap-x-8"
        dir="ltr"
      >
        {children}
      </div>
    </div>
  );
}
