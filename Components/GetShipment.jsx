import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

export default ({ getModal, setGetModal, getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();
  

  const getShipmentData = async () => {
    const getData = await getShipment(index);
    setSingleShipmentData(getData);
    console.log(getData);
  };
  console.log(singleShipmentData);

  const convertTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  return getModal? (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setGetModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="flex justify-end">
              <button
                aria-label="Close modal"
                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                onClick={() => setGetModal(false)}
              > <FaRegWindowClose className="w-3 h-5 mx-auto" /></button>
            </div>
            <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                Product Tracking Details
              </h4>

              <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="relative mt-3">
                  <input
                    type="number"
                    placeholder="ID"
                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    onChange={(e) => setIndex(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => getShipmentData()}
                  className="block w-full mt-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Get Details
                </button>
              </form>
              {singleShipmentData === undefined ? (
                ""
              ) : (
                <div className="text-left">
                  <p>Sender: {singleShipmentData.sender.slice(0, 25)}...</p>
                  <p>Receiver: {singleShipmentData.receiver.slice(0, 25)}...</p>
                  <p>Pickup Time: {convertTime(singleShipmentData.pickupTime)}</p>
                  <p>Delivery Time: {convertTime(singleShipmentData.deliveryTime)}</p>
                  <p>Price: {singleShipmentData.price}</p>
                  <p>Distance: {singleShipmentData.distance}</p>
                  <p>Status: {singleShipmentData.status}</p>
                  <p>
                    Paid: {singleShipmentData.isPaid ? "Complete" : "Not Complete"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ):(
    ""
  )
};
