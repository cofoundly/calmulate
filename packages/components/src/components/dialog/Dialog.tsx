import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useRef } from 'react'
import { useKeyPress, useOutsideClick } from 'utils'

import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'
import { SmallText } from '../smallText/SmallText'

type HeaderProps = {
  title?: string
  description?: string
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div>
      <HeadingText>{title}</HeadingText>

      <SmallText className="mt-1">{description}</SmallText>
    </div>
  )
}

type ActionsProps = {
  confirmText?: string
  confirmDisabled?: boolean
  confirmLoading?: boolean
  confirmIsDangerous?: boolean
  cancelText?: string
  onCancelClick?: () => void
  onConfirmClick?: () => void
}

const Actions = ({
  confirmText = 'Confirm',
  confirmDisabled,
  confirmLoading,
  confirmIsDangerous,
  cancelText = 'Cancel',
  onCancelClick,
  onConfirmClick,
}: ActionsProps) => {
  return (
    <div className="flex justify-end gap-x-4">
      <Button variant="secondaryNeutral" disabled={confirmLoading} onClick={onCancelClick}>
        {cancelText}
      </Button>

      <Button
        color={confirmIsDangerous ? 'red' : undefined}
        disabled={confirmDisabled}
        loading={confirmLoading}
        onClick={onConfirmClick}
      >
        {confirmText}
      </Button>
    </div>
  )
}

type Props = {
  open?: boolean
  children?: ReactNode
  onClose: () => void
}

const Dialog = ({ open, children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    if (open) {
      onClose()
    }
  })

  useKeyPress('Escape', () => {
    if (open) {
      onClose()
    }
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                className="flex w-full justify-center"
                initial={{
                  opacity: 0,
                  transform: 'translateY(4px)',
                  scale: 0.95,
                }}
                animate={{ opacity: 1, transform: 'translateY(0px)', scale: 1 }}
                exit={{ opacity: 0, transform: 'translateY(4px)', scale: 0.95 }}
              >
                <Card ref={ref} className="flex max-w-lg flex-col gap-y-6">
                  {children}
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

Dialog.Header = Header
Dialog.Actions = Actions

export { Dialog }
