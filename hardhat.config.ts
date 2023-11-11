import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import dotenv from 'dotenv'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import '@nomicfoundation/hardhat-ethers'

dotenv.config(
  {
    path: "./.env"
  }
)

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "./output.txt",
  },
  networks: {
    "localhost": {
      url: process.env.LOCALHOST_RPC_URL as string,
      accounts: [
        process.env.LOCALHOST_PRIVATE_KEY as string,
      ],
      chainId: 31337,
    },
    "sepolia": {
      url: process.env.SEPOLIA_RPC_URL as string,
      accounts: [
        process.env.SEPOLIA_PRIVATE_KEY as string,
      ],
      chainId: 11155111
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
