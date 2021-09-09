import React from "react";
import { useRouter } from "next/router";
import { ClockCircleFilled, StarFilled } from "@ant-design/icons";
import { Skeleton } from "antd";

export const KitchenItemSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div className="flex flex-col w-full" dir="ltr" key={i}>
        <div className="flex flex-col gap-2">
          <Skeleton.Avatar
            shape="square"
            className="w-full"
            style={{ height: "12rem", width: "100%" }}
            active
          />
          <Skeleton.Avatar
            shape="square"
            className="w-full"
            style={{ height: "1.5rem", width: "70%" }}
            active
          />
          <Skeleton.Avatar
            shape="square"
            className="w-full"
            style={{ height: "1.5rem", width: "40%" }}
            active
          />
        </div>
      </div>
    ))}
  </>
);

export default function KitchenItem({
  id,
  name,
  rating,
  count,
  price,
  price_type,
  imgURL,
  ...rest
}) {
  const router = useRouter();

  const showKitchen = (kName, kId) => {
    router.push(`/kitchen/${kName}/${kId}`);
  };

  return (
    <div
      onClick={() => showKitchen(name, id)}
      className="cursor-pointer"
      span={8}
      {...rest}
    >
      <div className="flex flex-col w-full" dir="ltr">
        <img
          src={imgURL}
          className="w-full h-64 md:h-48 object-cover rounded"
        />
        <p className="pt-3 sm:pt-4 font-semibold text-lg">{name}</p>
        <p className="flex items-center text-base pt-2">
          <StarFilled className="pr-1 text-yellow-500" />
          {`${rating} (${count})`}
          <p className="flex items-center pl-6" dir="ltr">
            <ClockCircleFilled className="pr-1" />
            {`$${price}`} - {price_type}
          </p>
        </p>
      </div>
    </div>
  );
}
