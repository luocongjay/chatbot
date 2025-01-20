import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { MessageIcon, VercelIcon } from "./icons";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        {/* <p className="flex flex-row justify-center gap-4 items-center">
          <Link
            className="font-medium underline underline-offset-4"
            href="https://alltick.co/en-US"
            target="_blank"
          >
            <Image alt="logo" src="/images/logo.png" width={128} height={75} />
          </Link>
        </p> */}
        <p>您好！我是Alltick的智能客服，你可以向我询问有关API的问题。</p>
      </div>
    </motion.div>
  );
};
