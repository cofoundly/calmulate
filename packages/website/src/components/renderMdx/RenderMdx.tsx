'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import React from 'react'

type Props = MDXRemoteProps

export const RenderMdx = (props: Props) => {
  return <MDXRemote {...props} />
}
