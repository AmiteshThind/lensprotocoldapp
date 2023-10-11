import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {};

function landing({}: Props) {
  return (
    <div className="bg-cover bg-no-repeat h-screen w-screen bodyLandingPage">
      <div className=" flex h-screen w-screen flex-col  items-center">
        <motion.div
          initial={{ scale: 0.1 }}
          animate={{ scale: 4 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 800,
            damping: 10,
          }}
          className="  mt-16 font-bold text-neutral-800"
        >
          WisDao
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{
            delay: 1,
            duration: 1,
            type: "spring",
            stiffness: 800,
            damping: 10,
          }}
          className=" w-2/3 md:w-1/3 mt-16 text-center text-neutral-700 font-semibold"
        >
          A decentralzied social media application focused on exchanging
          learnings from personal experiences to empower growth, learning, unity
          and data ownership among users of the platform.
        </motion.div>
        <motion.button
          initial={{ scale: 0.1 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 2,
            duration: 1,
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
          className="cursor hover:scale-110 duration-100 p-3 rounded-lg border-none mt-16 bg-teal-600 font-semibold text-neutral-800 mx-2"
        >
          <Link href={"/home"}>Enter App</Link>
        </motion.button>
      </div>
    </div>
  );
}

export default landing;
