import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import toast, { resolveValue, ToastType, useToaster } from 'react-hot-toast'

import { Alert, AlertVariant } from '../alert/Alert'

const mapTypeToKind: Record<ToastType, AlertVariant> = {
  success: 'success',
  error: 'error',
  loading: 'info',
  blank: 'info',
  custom: 'info',
}

export const Snackbar = () => {
  const { toasts, handlers } = useToaster({ duration: 5000 })
  const { startPause, endPause } = handlers

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center">
      <AnimatePresence initial={false}>
        {toasts
          .filter(toast => toast.visible)
          .map((toastInstance, index) => {
            const initial = { opacity: 0, y: 64 * (index + 1), scale: 0.9 }

            return (
              <motion.div
                key={toastInstance.id}
                initial={initial}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={initial}
                onMouseEnter={startPause}
                onMouseLeave={endPause}
              >
                <Alert
                  className="mb-4 shadow-lg"
                  variant={mapTypeToKind[toastInstance.type]}
                  onClose={() => {
                    toast.dismiss(toastInstance.id)
                  }}
                >
                  {String(resolveValue(toastInstance.message, toastInstance))}
                </Alert>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}
