require("@nomicfoundation/hardhat-toolbox-viem");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: [process.env.PK],
    }
  }
};
