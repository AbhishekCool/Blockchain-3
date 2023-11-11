import { deployments, ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../../typechain-types"

describe("Fund Me", async () => {

    let fundMe: FundMe

    let deployer;
    let 

    beforeEach(async () => {

        deployer = (await getNamedAccounts())["deployer"]
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)

    })

    describe("constructor", async () => {
        it("Sets Aggregator Address Correctly", async () => {
            const response = await fundMe.getPriceFeed()
        })
    })




})