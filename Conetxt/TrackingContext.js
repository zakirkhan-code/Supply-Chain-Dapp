import React,{ useEffect, useState} from "react";
import Web3Modal from "web3modal"; // Correct way to import Web3Modal
import { ethers } from "ethers";

import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json"

const contractAddress = "0x8D58CA7AAaE3DA6E777F01AC85BC6B46352F16b2"
const contractABI = tracking.abi;

const fetchContract = (signerOrProvider)=>{
    new ethers.Contract(contractAddress,contractABI,signerOrProvider);
}

export const TrackingContext = React.createContext();

export const TrackingProvider = ({children})=>{
    const DappName = 'Product Tracking App'
    const [currentUser,setCurrentUser] = useState("");

    const createShipment = async (items) => {
        const { receiver, pickupTime, distance, price } = items;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
    
            // Fetch the contract
            const contract = fetchContract(signer);
            if (!contract) {
                throw new Error("Failed to get contract instance");
            }
    
            // Call the contract function
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            console.log("Shipment created successfully:", createItem);
        } catch (error) {
            console.error("Error in createShipment function:", error);
        }
    };
    
    
    
    const getAllShipment = async ()=>{
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider)
            const shipments = await contract.getAllTransactions();

            const allShipments = shipments.map((shipment)=>({
                sender:shipment.sender,
                receiver:shipment.receiver,
                price:ethers.utils.formatEther(shipment.price.toString()),
                pickupTime:shipment.pickupTime.toNumber(),
                deliveryTime:shipment.deliveryTime.toNumber(),
                isPaid:shipment.isPaid,
                status:shipment.status
            }))
            return allShipments;
        } catch (error) {
            console.log("Error want , getting Shipment");
        }
    }
    
    const getShipmentsCount = async ()=>{
        try {
            if(!window.ethereum)
                return "MetaMask Install"
            const account = await window.ethereum.request({
                method: "eth_accounts"
            });
            const provider = new ethers.providers.JsonRpcProvider()
            const contract = fetchContract(provider)
    
            const shipmentsCount = await contract.getShipmentsCount(account[0])
            return shipmentsCount.toNumber()
            
        } catch (error) {
            console.log("Error want getting shipment")
        }
    }

    const completedShipment=async(completeShip)=>{
        console.log(completeShip);
        const {receiver,index} = completeShip;
        try {
            if(!window.ethereum)
                return "MetaMask Install"
            const account = await window.ethereum.request({
                method:"eth_accounts"
            })
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const transaction = await contract.CompleteShipment(account[0],receiver,index,
                {
                    gasLimit:300000,
                }
            );
            transaction.wait();
            console.log(transaction);
            
        } catch (error) {
            console.log("Wrong Complete Shipment Error",error)
        }
    }

    const getShipment = async (index)=>{
        console.log(index*1);
        try {
            if(!window.ethereum)
                return "MetaMAsk install"
            const account = await window.ethereum.request({
                method:"eth_accounts"
            })
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(account[0],index*1);
            const SingleShipment = {
                sender:shipment[0],
                receiver:shipment[1],
                pickupTime:shipment[2].toNumber(),
                deliveryTime:shipment[3].toNumber(),
                distance:shipment[4].toNumber(),
                price:ethers.utils.formatEther(shipment[5].toString()),
                status:shipment[6],
                isPaid:shipment[7]
            }
            return SingleShipment;
        } catch (error) {
            console.log("Sorry no Shipment",error);
        }
    }

    const startShipment = async (getProduct)=>{
        const {receiver,index} = getProduct;
        try {
            if(!window.ethereum)
                return "MetaMAsk install"
            const account = await window.ethereum.request({
                method:"eth_accounts"
            })
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.StartShipment(account[0]
                ,receiver,index*1);
            shipment.wait();
            console.log(shipment);
            
        } catch (error) {
            console.log("Sorry No Shipment",error);
            
        }
    }

    const CheckIfWalletConnected = async()=>{
        try {
            if(!window.ethereum)
                return "MetaMAsk install"
            const account = await window.ethereum.request({
                method:"eth_accounts"
            })
            if(account.length)
            {
                setCurrentUser(account[0]);
            }
            else
            {
                return "No account"
            }
        } catch (error) {
            return "Not Connected"
        }
    }

    const connectedWallet = async()=>{
        try {
            if(!window.ethereum)
                return "MetaMAsk install"
            const account = await window.ethereum.request({
                method:"eth_requestAccounts"
            })
            setCurrentUser(account[0])
        } catch (error) {
            return "Something want wrong"
        }
    }

    useEffect(()=>{
        CheckIfWalletConnected();
    },[])

    return(
        <TrackingContext.Provider
        value={{
            connectedWallet,
            createShipment,
            getAllShipment,
            completedShipment,
            getShipment,
            startShipment,
            getShipmentsCount,
            DappName,
            currentUser,
        }}
        >
            {children}
        </TrackingContext.Provider>
    )
}