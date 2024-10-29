import React from "react";
import image from "../Images/index";
import Image from "next/image";

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  setStartModal,
}) => {
  const team = [
    {
      avatar: image.compShipment,
    },
    {
      avatar: image.getShipment,
    },
    {
      avatar: image.startShipment,
    },
    {
      avatar: image.userProfile,
    },
    {
      avatar: image.shipCount,
    },
    {
      avatar: image.send,
    },
  ];

  const openModalBox = (text) => {
    if (text === 1) {
      setCompleteModal(true);
    } else if (text === 2) {
      setGetModal(true);
    } else if (text === 3) {
      setStartModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => openModalBox(i + 1)}
                  className="w-full h-60 sm:h-52 md:h-56"
                >
                  <Image
                    src={item.avatar}
                    alt={`Team member ${i + 1}`}
                    className="w-full object-cover object-center shadow-md rounded-xl"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
