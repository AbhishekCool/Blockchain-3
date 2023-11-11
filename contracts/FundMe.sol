// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error FundMe_NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MIN_USD = 50 * 1e18;

    address[] private funders;

    mapping(address => uint256) private addressToAmount;

    AggregatorV3Interface private priceFeed;

    address private immutable i_owner;

    modifier OnlyOwner() {
        if (msg.sender != i_owner) revert FundMe_NotOwner();
        _;
    }

    constructor() {
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        i_owner = msg.sender;
    }

    function Fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MIN_USD,
            "Didn't send enough"
        );
        funders.push(msg.sender);
        addressToAmount[msg.sender] = msg.value;
    }

    function Withdraw() public OnlyOwner {
        for (uint256 i = 0; i < funders.length; i++) {
            addressToAmount[funders[i]] = 0;
        }
        funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getAddressToFundedAmount(
        address _address
    ) public view returns (uint256) {
        return addressToAmount[_address];
    }

    function getFunder(uint256 index) public view returns (address) {
        return funders[index];
    }
}
