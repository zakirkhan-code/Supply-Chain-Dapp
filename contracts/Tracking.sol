// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tracking {
    
    // Corrected the enum declaration syntax
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // Mapping to store shipments for each sender
    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    // Corrected the struct name from 'TyepShipment' to 'TypeShipment'
    struct TyepShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // Corrected the variable name from 'tyepShipments' to 'typeShipments'
    TyepShipment[] tyepShipments;

    // Fixed the spelling in the events
    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor(){
        shipmentCount = 0;
    }

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        // Added require to check if the payment amount matches the price
        require(msg.value == _price, "Payment amount must match the price");

        // Corrected shipment initialization
        Shipment memory shipment = Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);
        shipments[msg.sender].push(shipment);

        shipmentCount++;

        // Added the corrected TypeShipment initialization
        tyepShipments.push(TyepShipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false));

        // Corrected event emission
        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    function StartShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        // Corrected spelling errors and the logic for status checks
        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.PENDING, "This order is already IN_TRANSIT");

        // Update shipment status
        shipment.status = ShipmentStatus.IN_TRANSIT;
        tyepShipment.status = ShipmentStatus.IN_TRANSIT;

        // Emit the corrected event
        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function CompleteShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        // Added checks for status and payment
        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment is not IN_TRANSIT");
        require(!shipment.isPaid, "Shipment already paid");

        // Update status and delivered time
        shipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        tyepShipment.deliveryTime = block.timestamp;

        // Transfer payment to the sender
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        // Mark as paid
        shipment.isPaid = true;
        tyepShipment.isPaid = true;

        // Emit events
        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        Shipment memory shipment = shipments[_sender][_index];

        // Returning shipment details
        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentsCount(address _sender) public view returns (uint256)
    {
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns (TyepShipment[] memory) {
        // Returning all typeShipments
        return tyepShipments;
    }
}
