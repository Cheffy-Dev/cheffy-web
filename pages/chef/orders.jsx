import { Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChefLayout } from "../../src/components/Layouts/chef";
import withAuthSync from "../../src/components/Layouts/chef/ProtectedChef";
import { chefOrders } from "../../src/redux/actions/chef/chefAction";

const ChefOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 20, page: 1 });

  async function fetchMyAPI() {
    setLoading(true);
    const res = await dispatch(chefOrders(pagination));
    setOrders(res.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchMyAPI();
  }, [pagination]);

  const onChange = (pageNumber, pageSize) => {
    console.log("Page: ", pageNumber);
    console.log("pageSize: ", pageSize);
    setPagination({ pageSize: pageSize, page: pageNumber });
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col p-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Spin spinning={loading}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order Total
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        State Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Items
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((value, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {value.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {value.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {value.order_total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {value.state_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {value.total_items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Spin>
            </div>
          </div>
        </div>
        <div className="py-4">
          <Pagination onChange={onChange} total={500} />
        </div>
      </div>
    </div>
  );
};

const ChefOrdersComponent = withAuthSync(ChefOrders);
ChefOrdersComponent.Layout = ChefLayout;
export default ChefOrdersComponent;
