import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input, Tooltip, Col } from "antd";
import { HiLocationMarker, HiClock } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { API_KEY, GEO_CODE_API_URL } from "../../../constants";
import { useRouter } from "next/router";
import "./auto-complete.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { Skeleton } from "antd";
import loadOptions from "../Search/loadOptions";
import Link from "next/link";
import { components } from "react-select";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default function PredictionsOnInputChange({
  searchValue,
  setSearchValue,
}) {
  const [api, setApi] = useState(undefined);
  const [predictions, setPredictions] = useState([]);
  const [search, setSearchFlag] = useState(false);
  const router = useRouter();
  const selectRef = useRef();

  useEffect(async () => {
    if (typeof window !== undefined) {
      const init = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          const autocomplete =
            new window.google.maps.places.AutocompleteService();
          setApi(autocomplete);
        }
      };

      if (!window.google || !window.google.maps || !window.google.maps.places) {
        try {
          await new Loader({ apiKey: API_KEY, libraries: ["places"] })
            .load()
            .then(() => init());
        } catch (e) {
          console.log("[Google Maps Script Error]:", e);
        }
      }

      const currentAddress = JSON.parse(
        window.localStorage.getItem("currentAddress") || null
      );

      if (currentAddress) {
        setSearchValue(currentAddress.address);
        setSearchFlag(true);
      }
    }
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, console.log, {
        enableHighAccuracy: true,
      });
    }
  };

  const searchFoods = () => {
    const currentAddress = JSON.parse(
      window.localStorage.getItem("currentAddress") || null
    );

    if (search) {
      console.log("1", router.asPath);
      if (currentAddress) {
        let city = currentAddress.city;
        router.push("/food-list/" + city);
      } else {
        router.push("/food-list");
      }
    }
  };

  const setCurrentAddressLocalStorage = (city, formated) => {
    window.localStorage.setItem(
      "currentAddress",
      JSON.stringify({ city: city, address: formated })
    );

    console.log(window.localStorage.getItem("currentAddress"));

    searchFoods();
  };

  /**
   * @param {GeolocationPosition} position - The current position of the user.
   */
  const showPosition = async ({ coords }) => {
    const lat = coords.latitude || "43.20577420";
    const long = coords.longitude || "-77.66710000";
    // Alternative Lat and Long = ['43.12285180','-77.61803020']

    const data = await fetch(`${GEO_CODE_API_URL}&latlng=${lat},${long}`);
    if (data?.results?.[0]) {
      const city = data.results[0].address_components.filter((item) => {
        if (item.types[0] === "administrative_area_level_2") {
          return item;
        }
      });

      setCurrentAddressLocalStorage(
        city[0].long_name,
        data.results[0].formatted_address
      );
      setSearchValue(data.results[0].formatted_address);
      searchFoods();
    }
  };

  const handleSearch = (value) => {
    if (api && value?.length) {
      api.getPlacePredictions({ input: value }, (results) => {
        if (results && results.length) {
          setPredictions(
            results.map((r) => ({
              value: r.description,
              main: r.structured_formatting.main_text,
              secondary: r.structured_formatting.secondary_text,
            }))
          );
        }
      });
    } else {
      setPredictions([]);
    }
  };

  const handleLocationSearch = (e) => {
    if (e) {
      e.preventDefault();
      const {
        target: { value },
      } = e;
      setSearchFlag(false);
      setSearchValue(value);
      debounce(handleSearch(value), 400);
    }
  };

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(() => {
    const currentAddress = JSON.parse(
      window.localStorage.getItem("currentAddress") || null
    );

    if (search) {
      if (currentAddress) {
        let city = currentAddress.city;
        router.push(`${currentAddress ? "/food-list/" + city : "/food-list"}`);
      }
    }
  });

  const Plate = ({ data }) => {
    return (
      <a href={`/food-detail/${data.id}`} className="">
        <div className="text-black">
          <div className="flex flex-col gap-1 col-span-3 md:col-span-3">
            <div className="w-full text-sm font-semibold overflow-ellipsis truncate whitespace-nowrap">
              {data?.name}
            </div>
            <div className="text-sm flex items-center overflow-ellipsis truncate">
              <HiLocationMarker size="20" />
              <span className="ml-2">Northport, Alabama</span>
            </div>
            <div className="text-xs flex items-center overflow-ellipsis truncate">
              <HiClock size="20" />
              <span className="ml-2">{data?.delivery_time} mins</span>
            </div>
          </div>
        </div>
      </a>
    );
  };

  const Restaurant = ({ data }) => {
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
      <div
        className="absolute bg-white mt-1 z-50"
        ref={innerRef}
        {...innerProps}
      >
        {children}
        <div className="text-center">
          <Link href={`/popular-near-you`}>
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

  const Form = () => (
    <>
      <form onSubmit={handleSubmit}>
        <Col
          className="p-2 py-2 border rounded-xl flex"
          style={{ backgroundColor: "white", color: "gray" }}
        >
          <Tooltip placement="bottom" title="Detect Location">
            <IoLocationOutline
              size={24}
              className="text-lg cursor-pointer"
              onClick={getCurrentLocation}
            />
          </Tooltip>
          <Tooltip placement="bottomLeft" title="Setup the delivery address">
            <Input
              className="bg-transparent width-lg"
              bordered={false}
              placeholder="Enter delivery address"
              onChange={handleLocationSearch}
              value={searchValue}
            />
          </Tooltip>
        </Col>
      </form>
      <div className="location-option-container rounded-xl">
        {predictions.length > 0 &&
          predictions.map((p) => (
            <div
              onClick={() => {
                setSearchFlag(true);
                setSearchValue(p.value);
                debounce(handleSearch(""), 400);
                setCurrentAddressLocalStorage(p.main, p.value);
              }}
              key={p.value}
              className="ac-row hover:bg-inputBg focus:bg-inputBg flex justify-evenly items-center my-3"
            >
              <span className="w-12 h-12 rounded-full bg-inputBg flex justify-center items-center">
                <HiLocationMarker className="text-2xl" />
              </span>
              <div className="flex-wrap">
                <span className="block w-full font-bold text-lg">{p.main}</span>
                <span className="block w-full font-light">{p.secondary}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );

  return (
    <AsyncPaginate
      className="location"
      placeholder="Enter delivery address"
      loadOptions={loadOptions}
      value={searchValue}
      ref={selectRef}
      cacheUniqs
      cacheOptions
      debounceTimeout={350}
      onChange={handleLocationSearch}
      loadingMessage={() => listLoading()}
      components={{
        DropdownIndicator: () => (
          <IoLocationOutline
            size={24}
            className="text-lg cursor-pointer"
            onClick={getCurrentLocation}
          />
        ),

        LoadingIndicator: () => null,
        Menu,
        Option,
      }}
    ></AsyncPaginate>
  );
}
