import { SearchOutlined, StarFilled } from "@ant-design/icons";
import { Skeleton } from "antd";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { components } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import loadOptions from "./loadOptions";

const Plate = ({ data }) => {
  console.log(data);
  return (
    <a href={`/food-detail/${data.id}`} className="">
      <div className="grid grid-cols-4 md:grid-cols-5 text-black">
        <div className="w-12 h-12 col-span-1 rounded-full overflow-hidden bg-gray-200">
          <img
            src={data?.PlateImages?.[0]?.url}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="flex flex-col gap-1 col-span-3 md:col-span-3">
          <div className="text-sm font-semibold overflow-ellipsis truncate whitespace-nowrap">
            {data?.name}
          </div>
          <div className="text-sm flex items-center">
            <StarFilled color="yellow" style={{ color: "yellow" }} />
            <span className="ml-2">
              {data?.rating ? Math.round(data.rating * 10) / 10 : "Not Rated"}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

// Need to work on this, also to add restaurants to list, add them in loadOptions.js file
const Restaurant = ({ data }) => {
  console.log(data);
  return (
    <a href={`/food-detail/${data.id}`} className="">
      <div className="flex gap-4 text-black">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200"></div>

        <div className="flex flex-col gap-1">{data.restaurant_name}</div>
      </div>
    </a>
  );
};

const Menu = ({ innerRef, selectProps, innerProps, children }) => {
  return (
    <div className="absolute bg-white mt-1 z-50" ref={innerRef} {...innerProps}>
      {children}
      <div className="text-center">
        <Link href={`/search/${selectProps.inputValue}`}>
          <a className="px-3 font-semibold">Load More</a>
        </Link>
      </div>
    </div>
  );
};

const Option = (props) => {
  if (Object.keys(props.data).includes("price"))
    // if there's any price key its a plate
    return (
      <components.Option {...props}>
        <Plate data={props.data} />
      </components.Option>
    );

  if (Object.keys(props.data).includes("restaurant_name"))
    // check for restaurant
    return (
      <components.Option {...props}>
        <Restaurant data={props.data} />
        {/* <Plate data={props.data} /> */}
      </components.Option>
    );
};

const listLoading = () => {
  return (
    <ul className="flex flex-col gap-6">
      {[1, 2, 3].map((loader) => (
        <div className="flex gap-2">
          <div>
            <Skeleton.Avatar
              shape="circle"
              active
              className=""
              style={{ height: "3rem", width: "3rem" }}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton.Input
              shape="square"
              active
              className="m-0 flex"
              style={{ margin: 0, height: "1rem", width: "80%" }}
            />
            <Skeleton.Input
              shape="square"
              active
              className="m-0 flex"
              style={{ margin: 0, height: "1rem", width: "50%" }}
            />
          </div>
        </div>
      ))}
    </ul>
  );
};

const Search = () => {
  const [selectValue, setSelectValue] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const selectRef = useRef();

  const handleInputChange = (newVal) => {
    const inputVal = newVal.replace(/\W/g, "");
    setSelectValue(inputVal);
    return inputVal;
  };

  return (
    <>
      <AsyncPaginate
        className="w-full px-0 custom-select"
        placeholder="Search..."
        components={{
          DropdownIndicator: () => <SearchOutlined className="text-xl pb-1" />,
          LoadingIndicator: () => null,
          Option,
          Menu,
        }}
        ref={selectRef}
        loadingMessage={() => listLoading()}
        loadOptions={loadOptions}
        cacheUniqs
        cacheOptions
        debounceTimeout={350}
        value={selectValue}
        onChange={(e) =>
          setSelectValue({ label: fieldValue, value: fieldValue })
        }
        onInputChange={(e) => setFieldValue(e)}
        closeMenuOnSelect={false}
      />
    </>
  );
};

export default Search;
