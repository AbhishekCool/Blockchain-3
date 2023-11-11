import { network } from "hardhat";
import { developmentChains, DECIMALS, INITIAL_ANSWER } from '../helper-hardhat-config'
import { HardhatRuntimeEnvironment } from "hardhat/types";

module.exports = async (hre: HardhatRuntimeEnvironment) => {

    const { deploy, log } = hre.deployments
    const { deployer } = await hre.getNamedAccounts()
    const chainId = network.config.chainId


    if (developmentChains.includes(network.name)) {
        log("Local network detected deploying mocs")
        await deploy(
            "MockV3Aggregator",
            {
                contract: "MockV3Aggregator",
                args: [DECIMALS, INITIAL_ANSWER],
                from: deployer,
                log: true,
            }
        )
        log("MOCK DEPLOYED")
        log("--------------------------------------")
    }

}

module.exports.tags = ["all", "mocks"]