import React from "react";
import FoodHeader from "../../src/components/Layouts/Header/HomeHeader";
import Payment from "../../src/components/Layouts/payments/Payments";
import RentKitchenPayment from "../../src/components/Layouts/payments/RentKicthenPayment";
import { FoodFooter } from "../../src/components/Layouts/home";


const Index = () => {
  if (typeof window !== "undefined") {
    var rentKitchen = window.location.search;
  }
  return (
    <div>
      <FoodHeader />
      {rentKitchen === "rentKitchen" ? (
        <RentKitchenPayment />
      ) : (
        <Payment />
      )}
      <FoodFooter />
    </div>
  );
};

export default Index;
