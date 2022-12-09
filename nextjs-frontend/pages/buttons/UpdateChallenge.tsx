import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers, BigNumber } from "ethers";
import { Button } from "@chakra-ui/react";
import sportsbookBase from "../constants/SportsbookBase.json";

const UpdateChallenge = ({
  challengeId,
  newChallengedTeam,
}: {
  challengeId: any;
  newChallengedTeam: any;
}) => {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: sportsbookBase.abi,
    functionName: "updateChallengedTeam",
    args: [
      challengeId,
      newChallengedTeam,

      // BigNumber.from(uint256 variable),
      // {
      //   value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
      // },
    ],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <Button
      size="lg"
      w="full"
      // disabled={!write || isLoading}
      onClick={() => write?.()}
    >
      {isLoading ? "Updating challenge..." : "Update challenge"}
    </Button>
  );
};

export default UpdateChallenge;
