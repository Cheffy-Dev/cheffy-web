import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Button } from "antd";

export default function KitchenLoadMore() {
  return (
    <div dir="ltr" className="flex items-center justify-center pt-10 load-more">
      <Button
        type="primary"
        className="flex items-center py-8 px-10 text-lg rounded-xl"
        size="large"
      >
        Load More <IoMdArrowDropdown className="text-3xl" />
      </Button>
    </div>
  );
}
