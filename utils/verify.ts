import { run } from 'hardhat'
const verify = async (contractAddress: string, args: any[]) => {
    try {
        await run(
            "verify:verify",
            {
                address: contractAddress,
                constructor: args
            }
        )
    } catch (err) {
        console.log(err)
    }
}

export default verify