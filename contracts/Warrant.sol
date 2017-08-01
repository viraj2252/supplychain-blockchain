pragma solidity ^0.4.10;

contract Warrant {
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
        uint8 hour;
        uint8 minute;
        uint8 second;
        uint8 weekday;
}
    
    uint256 public totalVolume;
    address public owner;
    string public pbs;
    

    function Warrant(uint256 totalVol, string pbsTmp) {
        owner = msg.sender;
        totalVolume = totalVol;
        pbs = pbsTmp;
    }

    function setTotal(uint256 tmpState) {
        totalVolume = tmpState;
    }

    function readContract() returns(uint256 totvol, string pbsNumbers) {
        return (totalVolume, pbs);
    }

    function kill() {
        selfdestruct(owner);
    }
}