const hre = require("hardhat");

async function main() {
    // Get the contract factory for the Tracking contract
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    
    // Deploy the contract
    const tracking = await Tracking.deploy();
    
    // Wait for the contract to be deployed
    await tracking.deployed();

    // Log the address of the deployed contract
    console.log(`Tracking deployed to ${tracking.address}`);
}

main().catch((error) => {
    console.error(error); // Corrected the logging of the error
    process.exitCode = 1;
});
