import React, { useState, useContext } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { TrackingContext } from "../Conetxt/TrackingContext";

export default ({ createShipmentModal, setCreateShipmentModal }) => {
  const { createShipment } = useContext(TrackingContext);

  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
      console.log("Shipment created successfully");
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  return createShipmentModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-0">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              aria-label="Close modal"
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModal(false)}
            >
              <FaRegWindowClose className="w-3 h-5 mx-auto" />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Track Product, Create Shipment
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Receiver"
                  className="w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, receiver: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  className="w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, pickupTime: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Distance (km)"
                  className="w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, distance: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Price ($)"
                  className="w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, price: e.target.value })
                  }
                />
              </div>
              <button
                onClick={createItem}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Create Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
