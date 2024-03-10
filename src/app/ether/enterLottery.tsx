"use client"
import {ethers , Contract , parseEther , parseUnits , keccak256 , toUtf8Bytes, formatEther } from "ethers";
import { CONTRACT_ADDRESS , ABI } from "../../../config";
import { useAppSelector , useAppDispatch } from "@/lib/hooks";
import { getContract } from "@/lib/features/providers/provider";
import Snackbar , { SnackbarOrigin } from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useState } from "react";

// Custome Imports
import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconDiamondFilled
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EnterLottery()
{
    
    // Redux States
    
    const dispatch = useAppDispatch();
    const provider = useAppSelector((state) => state.account.provider);
    const account = useAppSelector((state) => {state.account.account});
    
    
    // Local States
    const [enterenceFee , setEnterenceFee] = useState<BigInt | null>(null);;
    const [noOfPlayers , setNoOfPlayers] = useState<BigInt | null>(null);;
    const [recentWinner , setRecentWinner] = useState<BigInt | null>(null);;
    const [lotteryState , setLotteryState] = useState<BigInt | null>(null);;

    // Function 
    // const putContract = (value : any) => {
    //     dispatch(getContract(value));
    // }

    let enterLottery = async() => {

        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const transaction = await contractSigner.enterLottery({value : parseEther("0.011")});
        console.log("transaction :: ::" , transaction);
    }

    let getEnterenceFee = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let enterenceFee = await contractSigner.viewEnterenceFee();
        console.log("transaction :: ::" , enterenceFee);
        setEnterenceFee(enterenceFee);
    }

    let getNumOfPlayers = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let players = await contractSigner.getNumOfPlayers();
        console.log("number of players :: ::" , players);
        setNoOfPlayers(players);
    }

    let getLotteryState = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let lotteryState = await contractSigner.getLotteryState();
        console.log("Lottery State :: ::" , lotteryState);
        setLotteryState(lotteryState);
        console.log()
    }

    let getRecentWinner = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let winner = await contractSigner.getRecentWinner();
        console.log("Lottery State :: ::" , winner);
        setRecentWinner(winner);
    }

    let mockKeepers = async () => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const checkData = keccak256(toUtf8Bytes(""))
        const { upkeepNeeded } = await contractSigner.checkUpkeep(checkData)
        if (upkeepNeeded) {
            const tx = await contractSigner.performUpkeep(checkData)
            const txReceipt = await tx.wait(1)
            // const requestId = txReceipt.events[1].args.requestId
            // console.log(`Performed upkeep with RequestId: ${requestId}`)
            await mockVrf(contractSigner)
        } 
        else {
                console.log("No upkeep needed!")
        }
    }

    let mockVrf = async (contract) => {
        console.log("We on a local network? Ok let's pretend...")
        await contract.fulfillRandomWords("0x00" , contract.address)
        console.log("Responded!")
        const recentWinner = await contract.getRecentWinner()
        console.log(`The winner is: ${recentWinner}`)
    }


    return (
        <div>
            <button onClick={() => {enterLottery();}}>Enter Lottery</button>
            <Button onClick={() => {getEnterenceFee()}}>View Min Enterence Fee</Button>
            { enterenceFee != null ?
                (<p>
                   Enterence Fee :: {(enterenceFee).toString()}
                </p>
                ) : (
                    <p>
                        Please Get Enterence fee to view enterence fee
                    </p>
                )
            }
            <Button onClick={() => {getNumOfPlayers()}}>View Number OF Players</Button>
            { noOfPlayers != null ?
                (<p>
                   No. Of players :: {(noOfPlayers).toString()}
                </p>
                ) : (
                    <p>
                        Please get number players first
                    </p>
                )
            }
            <Button onClick={() => {getLotteryState()}}>Get Lottery State</Button>
            { recentWinner != null ?
                (<p>
                   Recent Winner :: {(recentWinner).toString()}
                </p>
                ) : (
                    <p>
                        Please gte lottery state first
                    </p>
                )
            }
            <Button onClick={() => {getRecentWinner()}}>View Recent Winner</Button>
            { lotteryState != null ?
                (<p>
                   Lottery State :: {(lotteryState).toString()}
                </p>
                ) : (
                    <p>
                        Please Get Recent Winner First
                    </p>
                )
            }

            <Button onClick={mockKeepers}>MockKeepers</Button>
            <BentoGridThirdDemo/>
        </div>
    )
}

// Custom components

function BentoGridThirdDemo() {

    // Custom States


    // Redux States
    
    const dispatch = useAppDispatch();
    const provider = useAppSelector((state) => state.account.provider);
    const account = useAppSelector((state) => {state.account.account});
    
    
    // Local States
    const [enterenceFee , setEnterenceFee] = useState<BigInt | null>(null);;
    const [noOfPlayers , setNoOfPlayers] = useState<BigInt | null>(null);;
    const [recentWinner , setRecentWinner] = useState<BigInt | null>(null);;
    const [lotteryState , setLotteryState] = useState<BigInt | null>(null);;

    // Function 
    const putContract = (value : any) => {
        dispatch(getContract(value));
    }

    let enterLottery = async() => {

        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const transaction = await contractSigner.enterLottery({value : parseEther("0.011")});
        console.log("transaction :: ::" , transaction);
    }

    let getEnterenceFee = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let enterenceFee = await contractSigner.viewEnterenceFee();
        console.log("transaction :: ::" , enterenceFee);
        setEnterenceFee(enterenceFee);
    }

    let getNumOfPlayers = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let players = await contractSigner.getNumOfPlayers();
        console.log("number of players :: ::" , players);
        setNoOfPlayers(players);
    }

    let getLotteryState = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let lotteryState = await contractSigner.getLotteryState();
        console.log("Lottery State :: ::" , lotteryState);
        setLotteryState(lotteryState);
        console.log()
    }

    let getRecentWinner = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let winner = await contractSigner.getRecentWinner();
        console.log("Lottery State :: ::" , winner);
        setRecentWinner(winner);
    }

    let mockKeepers = async () => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        const checkData = keccak256(toUtf8Bytes(""))
        const { upkeepNeeded } = await contractSigner.checkUpkeep(checkData)
        if (upkeepNeeded) {
            const tx = await contractSigner.performUpkeep(checkData)
            const txReceipt = await tx.wait(1)
            // const requestId = txReceipt.events[1].args.requestId
            // console.log(`Performed upkeep with RequestId: ${requestId}`)
            await mockVrf(contractSigner)
        } 
        else {
                console.log("No upkeep needed!")
        }
    }

    let mockVrf = async (contract) => {
        console.log("We on a local network? Ok let's pretend...")
        await contract.fulfillRandomWords("0x00" , contract.address)
        console.log("Responded!")
        const recentWinner = await contract.getRecentWinner()
        console.log(`The winner is: ${recentWinner}`)
    }


    return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonFour = () => {

  // Redux States

  const dispatch = useAppDispatch();
  const provider = useAppSelector((state) => state.account.provider);
  const account = useAppSelector((state) => {state.account.account});

  // Local States

  const [enterenceFee , setEnterenceFee] = useState<BigInt | null>(null);;
  const [noOfPlayers , setNoOfPlayers] = useState<BigInt | null>(null);;
  const [recentWinner , setRecentWinner] = useState<BigInt | null>(null);;
  const [lotteryState , setLotteryState] = useState<BigInt | null>(null);;

  let getEnterenceFee = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let enterenceFee = await contractSigner.viewEnterenceFee();
        enterenceFee = formatEther(enterenceFee);
        console.log("enterance Fee :: ::" , enterenceFee);
        setEnterenceFee(enterenceFee);
    }

    let getNumOfPlayers = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let players = await contractSigner.getNumOfPlayers();
        console.log("number of players :: ::" , players);
        setNoOfPlayers(players);
    }

    let getLotteryState = async() => {
        let signer = await provider.getSigner();
        let contract = new Contract(CONTRACT_ADDRESS , ABI , provider)
        let contractSigner = contract.connect(signer);
        let lotteryState = await contractSigner.getLotteryState();
        console.log("Lottery State :: ::" , lotteryState);
        setLotteryState(lotteryState);
        console.log()
    }

  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        { enterenceFee != null ?
                (<p className="text-2xl md:text-3xl">
                   {(enterenceFee).toString()}
                </p>
                ) : (
                    <p>
                        <IconDiamondFilled className="w-12 h-12"/>
                    </p>
                )
        }
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          View current enterence fee in ETH
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          <button onClick={getEnterenceFee}>Reload</button>
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        { noOfPlayers != null ?
                (<p className="text-2xl md:text-3xl">
                   {(noOfPlayers).toString()}
                </p>
                ) : (
                    <p>
                        <IconDiamondFilled className="w-12 h-12"/>
                    </p>
                )
        }
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          View number player entered lottery
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          <button onClick={getNumOfPlayers}>Reload</button>
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        { lotteryState != null ?
                (<p className="text-2xl md:text-3xl">
                   {(lotteryState).toString()}
                </p>
                ) : (
                    <p>
                        <IconDiamondFilled className="w-12 h-12"/>
                    </p>
                )
        }
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          View current lottery state
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          <button onClick={getLotteryState}>Reload</button>
        </p>
      </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="/favicon.ico"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "AI Content Generation",
    description: (
      <span className="text-sm">
        Experience the power of AI in generating unique content.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Lottery State",
    description: (
      <span className="text-sm">
        Interact with the blockchain through these interactive button and take part in trusted lottery alogorithm 
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
