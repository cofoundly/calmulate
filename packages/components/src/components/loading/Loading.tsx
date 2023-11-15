import { motion } from 'framer-motion'
import React from 'react'

import { Logomark } from '../logomark/Logomark'

const TEST_ID = 'loading'

const Loading = () => {
  return (
    <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} data-testid={TEST_ID}>
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ rotate: 360, scale: 2, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
            ease: 'backInOut',
          }}
        >
          <Logomark />
        </motion.div>
      </div>
    </motion.div>
  )
}

Loading.TestId = TEST_ID

export { Loading }
