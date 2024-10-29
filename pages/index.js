import React from "react";
import { useState,useContext,useEffect } from "react";
import {TrackingContext} from '../Conetxt/TrackingContext'
import {
  CompleteShipment,
    Form,
    GetShipment,
    Profile,
    Services,
    StartShipment,
    Table,
} from '../Components/index'

const index=()=>{
  const {
            createShipment,
            getAllShipment,
            completedShipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            currentUser,
  } = useContext(TrackingContext);

  const [createShipmentModal,setCreateShipmentModal] = useState(false)
  const [openProfile,setOpenProfile] = useState(false)
  const [startModal,setStartModal] = useState(false)
  const [completeModal,setCompleteModal] = useState(false)
  const [getModal,setGetModal] = useState(false)


  const [allShipmentsData,setAllShipmentsData] = useState();

  useEffect(()=>{
    const getCampaignsData = getAllShipment();

    return async()=>{
      const allData = await getCampaignsData;
      setAllShipmentsData(allData) ;
    }
  },[])

  return (
    <>
    <Services 
      setOpenProfile={setOpenProfile}
      setCompleteModal={setCompleteModal}
      setGetModal={setGetModal}
      setStartModal={setStartModal}
      />
      <Table
      setCreateShipmentModal={setCreateShipmentModal}
      allShipmentsData={allShipmentsData}
      />
      <Form
      createShipmentModal={createShipmentModal}
      createShipment={createShipment}
      setCreateShipmentModal={setCreateShipmentModal}
      />
      <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser = {currentUser}
      getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
      completeModal={completeModal}
      setCompleteModal={setCompleteModal}
      CompletedShipment={completedShipment}
      />
      <GetShipment
      getModal={getModal}
      setGetModal={setGetModal}
      getShipment={getShipment}
      />
      <StartShipment
      startModal={startModal}
      setStartModal={setStartModal}
      startShipment={startShipment}
      />
    </>
  )
}

export default index;
