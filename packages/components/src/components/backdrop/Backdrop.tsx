import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'

export const Backdrop = forwardRef((_, ref: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ref}
      className="bg-theme-background-emphasis/75 fixed inset-0 transition-opacity"
    />
  )
})
