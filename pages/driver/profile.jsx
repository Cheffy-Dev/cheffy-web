import { cheffApi } from "../../src/api";
import FoodLayout from "../../src/components/Layouts/home/FoodLayout";
import ProtectedDriver from "../../src/components/Layouts/driver/ProtectedDriver";
import React, { useEffect, useState } from "react";

const DriverProfile = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    cheffApi.getUserData().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex pt-10 h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper p-2">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={user?.imagePath}
                alt={user?.name}
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {user?.name}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>Driver</p>
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Address
                    </td>
                    <td className="px-2 py-2"></td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">{user?.phone_no}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user?.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DriverProfileComponent = ProtectedDriver(DriverProfile);
DriverProfileComponent.Layout = FoodLayout;
export default DriverProfileComponent;
