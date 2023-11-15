import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import React from 'react'
import { useKeyPress, useOutsideClick } from 'utils'

import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'

type Props = {
  open: boolean
  children?: ReactNode
  onClose: () => void
}

export const Popover = ({ open, children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    if (open && onClose) {
      onClose()
    }
  })

  useKeyPress('Escape', () => {
    if (open && onClose) {
      onClose()
    }
  })

  return (
    <AnimatePresence>
      {open && (
        <div className="relative z-50">
          <Backdrop />

          <div className="fixed inset-0 flex">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, transform: 'translateX(-100%)' }}
              animate={{ opacity: 1, transform: 'translateX(0%)' }}
              exit={{ opacity: 0, transform: 'translateX(-100%)' }}
            >
              <div ref={ref} className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <Button
                    variant="light"
                    className="-m-2.5 p-2.5 text-white hover:text-gray-300"
                    onClick={() => {
                      if (onClose) {
                        onClose()
                      }
                    }}
                  >
                    <span className="sr-only">Close</span>

                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>

                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
