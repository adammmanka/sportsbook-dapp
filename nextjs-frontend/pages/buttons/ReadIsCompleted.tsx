import { useContractRead } from "wagmi";
import React, { useState } from "react";
import {
  Button,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import abi from "../constants/abi.json";

const ReadIsStarted = ({ challengeId }: { challengeId: any }) => {
  const [isStarted, setIsStarted] = useState("");
  const onChangeIsStarted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStarted(event.target.value);
  };

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const {
    data,
    isError,
    isLoading,
  }: { data: any; isError: any; isLoading: any } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "isMatchFinished",
    args: [challengeId],
    // chainId: 31337,
    watch: true,
    cacheTime: 2_000,
  });

  return (
    <>
      <strong>{data ? <>COMPLETED!</> : <>Not completed</>}</strong>
    </>
  );
};

export default ReadIsStarted;
