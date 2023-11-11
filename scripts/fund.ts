import { ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../typechain-types"

const main = async () => {

    const { deployer } = await getNamedAccounts()
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer)
    console.log("Funding Contract")
    const transactionResponse = await fundMe.Fund(
        {
            value: ethers.parseEther("0.1")
        }
    )
    await transactionResponse.wait(1)
    console.log("Funded")

}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })