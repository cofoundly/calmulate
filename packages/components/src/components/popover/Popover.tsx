import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useKeyPress, useOutsideClick } from 'utils'

import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'

type Props = {
  open: boolean
  position?: 'left' | 'right'
  showBackdrop?: boolean
  showCloseIcon?: boolean
  children?: ReactNode
  onClose: () => void
}

export const Popover = ({
  open,
  position = 'left',
  showBackdrop = true,
  showCloseIcon = true,
  children,
  onClose,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const translateX = position === 'left' ? '-100%' : '100%'

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
          {showBackdrop && <Backdrop />}

          <div className={twMerge('fixed inset-y-0 flex', position === 'left' ? 'left-0' : 'right-0')}>
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, transform: `translateX(${translateX})` }}
              animate={{ opacity: 1, transform: `translateX(0%)` }}
              exit={{ opacity: 0, transform: `translateX(${translateX})` }}
            >
              <div ref={ref} className="relative flex max-w-sm flex-1 overflow-hidden shadow-xl">
                {showCloseIcon && (
                  <div
                    className={twMerge(
                      'absolute top-0 flex w-16 justify-center pt-5',
                      position === 'left' ? 'left-full' : 'right-full',
                    )}
                  >
                    <Button
                      variant="lightInverted"
                      className="-m-2.5 p-2.5"
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
                )}

                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
