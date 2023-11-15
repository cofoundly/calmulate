import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useHover } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentPropsWithoutRef<'span'>

export const CopyableText = ({ className = '', children, ...props }: Props) => {
  const [ref, isHovered] = useHover()
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    // restore the copied state when the user stops hovering
    if (!isHovered) {
      setIsCopied(false)
    }
  }, [isHovered])

  return (
    <span
      ref={ref}
      className={twMerge(
        'hover:text-theme-brand dark:hover:text-dark-theme-brand relative cursor-pointer whitespace-nowrap transition-colors',
        className,
      )}
      onClick={() => {
        navigator.clipboard.writeText(children as string)
        setIsCopied(true)
      }}
      {...props}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="bg-theme-background dark:bg-dark-theme-background absolute -right-5 -top-5 flex h-5 w-5 items-center justify-center rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isCopied ? <ClipboardDocumentCheckIcon /> : <ClipboardDocumentIcon />}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
