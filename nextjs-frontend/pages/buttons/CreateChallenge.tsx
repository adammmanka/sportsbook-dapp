import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { ethers, BigNumber } from "ethers";
import { Button } from "@chakra-ui/react";
import sportsbookBase from "../constants/SportsbookBase.json";

const CreateChallenge = ({
  challengedTeam,
  locationProvider,
}: {
  challengedTeam: any;
  locationProvider: any;
}) => {
  const { address } = useAccount();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: sportsbookBase.abi,
    functionName: "createChallenge",
    args: [
      challengedTeam,
      locationProvider,
      // BigNumber.from(uint256 variable),
      {
        value: ethers.utils.parseEther((0.001).toString()),
      },
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
      disabled={/*!write || */ isLoading}
      onClick={() => write?.()}
    >
      {isLoading ? "Sending challenge..." : "Send challenge"}
    </Button>
  );
};

export default CreateChallenge;
