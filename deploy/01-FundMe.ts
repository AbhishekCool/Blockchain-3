import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, developmentChains } from '../helper-hardhat-config';
import dotenv from 'dotenv'
import verify from "../utils/verify";

dotenv.config(
    {
        path: "./.env"
    }
)

module.exports = async (hre: HardhatRuntimeEnvironment) => {
    const { deploy, log, get } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts()
    const chainId = network.config.chainId
    if (chainId == undefined) {
        return
    }
    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const deployed = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = deployed.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeedAddress"]
    }
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,// put price feed address , 
        log: true,
    })
    log("-------------------------------")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        verify(fundMe.address, args)
    }
}

module.exports.tags = ["all"]