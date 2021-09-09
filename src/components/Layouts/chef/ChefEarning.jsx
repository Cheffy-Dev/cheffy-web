import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { chefBalanceToday } from "../../../redux/actions/chef/chefAction";

function ChefEarningComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState("today");
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    try {
      const res = await dispatch(chefBalanceToday());
      console.log('chefBallance', res)
      setBalance(res.balance ? res.balance: 0);   // need to change
    } catch (e) {
      console.log(e.response);
      if (e.response.status == 401) {
        console.log("Not LoggedIn");
        router.push("/chef/login");
      }
    }
  });

  return (
    <div className="pt-4 outline-none">
      <div className="flex lg:flex-row flex-col flex-start pb-4 justify-between">
        <div className="mr-6">
          <p className="text-base text-gray-500">Wednesday, 26 Aug 2020</p>
          <p className="text-2xl pt-2">{balance.toFixed(2)}</p>
        </div>
        {/* <Divider type="vertical" className="py-10"/> */}
        <div className="mr-6 text-left">
          <p className="text-base text-gray-500">Plates</p>
          <p className="text-2xl pt-2">30</p>
        </div>
        {/* <Divider type="vertical" className="py-10"/> */}
        <div className="mr-6">
          <p className="text-base text-gray-500">Tips</p>
          <p className="text-2xl pt-2">$56.40</p>
        </div>
        {/* <Divider type="vertical" className="py-10"/> */}
        <div className="space-x-8 mt-4">
          <button
            onClick={() => setActive("today")}
            className={
              active === "today"
                ? "px-10 border-2 border-gray-900  bg-gray-900  py-3 text-white"
                : "px-10 bg-white border-2 border-gray-700  py-3 text-gray-900"
            }
          >
            Today
          </button>
          <button
            onClick={() => setActive("weekly")}
            className={
              active === "weekly"
                ? "px-10 bg-gray-900 border-2 border-gray-900 py-3 text-white"
                : "px-10 bg-white border-2 border-gray-700  py-3 text-gray-900"
            }
          >
            Weekly
          </button>
        </div>
      </div>
      <hr />
      <div className="ordred-plates text-base pt-4">
        <div className="flex justify-between items-center pb-4">
          <div className="plate-detail">
            <p>Burger</p>
            <p className="opacity-50">Quarter x 2</p>
          </div>
          <div className="text-right">
            <p>$5</p>
            <p className="opacity-40">17:32</p>
          </div>
        </div>
        <hr className="pb-4" />
        <div className="flex justify-between items-center pb-4">
          <div className="plate-detail">
            <p>Sandwich</p>
            <p className="opacity-50">BigMac x 2</p>
          </div>
          <div className="text-right">
            <p>$25</p>
            <p className="opacity-40">9:13</p>
          </div>
        </div>
        <hr />
      </div>
      <div className="get-payment pt-16">
        <div className="payment-button text-base text-center bg-red-600 cursor-pointer w-40 h-12 text-white">
          <p className="pt-3">
            <FaMoneyBillAlt className="inline-block  text-2xl pr-2 pb-1" />
            Get Payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChefEarningComponent;
