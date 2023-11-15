import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CopyableText } from '../copyableText/CopyableText'
import { Alert } from './Alert'

const meta = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Alert',
    onClose: undefined,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Alert',
    onClose: undefined,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Alert',
    onClose: undefined,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Alert',
    onClose: undefined,
  },
}

export const CloseButton: Story = {
  args: {
    variant: 'success',
    children: 'Alert',
    onClose: () => {
      console.log('Close')
    },
  },
}

export const LotsOfText: Story = {
  args: {
    variant: 'info',
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    onClose: () => {
      console.log('Close')
    },
  },
}

export const SuperLongLinks: Story = {
  args: {
    variant: 'info',
    children:
      'http://www.reallylong.link/rll/gMcKM3nMlDrW7Y367rLcf540WZfV73zDTCtQy9bcdc4RtSnRLge_wfWdetOvCdta/mojM2x25Q4QeM7UepGtJiJ2HNBo0rHndTBqYEal6zS_tJoGv69i9Uos3VskWoitaJiww9BAUYjYOVRWI2ROQnbqyiooXjwuWE41jO_Rw_9FJkgPuVlGDhPfbZY5hATovWLYWLerkzTlJEHdb9Eh4MXpydOXbZ3AtD2FiRzQe7bLUBgbmlWLEJmMRNU3rdhDO3DWl3i/9wt5j5ADIEeFdVSRBEAauWTLvBm7nAy1mFrOJ3ZquQJLZotkMMYApAkDn0slgEoNGKGT877sDE09SsLGFMmlO18lwPXlD2qQ1v6byAButA_q6_n2SvquwsCxhp8lSCqfZzYptE9QXEkoOwuqtQJsj/pf7AXgIbEIOuLO3ogkS67r1kPtMtECWYFjeztbXbLHhQIv69hPquAYQLB7svbX1bkl3EIpRwJkuswzd6szDZOtE4krHF8Atl195R374QTL5kgblh7V2zizA5DuYVt0/b_PS6VuAtzfYHf2aoZN5EO5blo0CKWjpgpSoC/8Yv2TVWC90hdJi9S1Ng1_IphU5x5o/OMd6LxxGeqL9oqmIJwm1qCQK5iEIDTGfMHOpQ5VY/ngsabFbCMhCvP4OG7/ZMOeJ6dpA3C3wuhrOuTNqP4hXhcmntVa/qQ_lO0uTEZGIg_7sHGVtV3nyqwzaREiDyo/ViUJxPJu4iO7FV6dDSIYh3MG172LQ7NIXaW079U1XWxaR9lgENQz/SIsbvTTc5z7gC2EQGu5hwdI4ZCvIgIH0sO2Ex1wQKLelXf6qVSGnKutq3o0YyBJfkZaBBG8U/eoQHI14gZVZweQH0HJHQeHP8HpenZ2umRuAQZ33ZalJncfe_LQvlH_5W7B/65vMKlj4JgqczYLFmuuLyVfSmkmh0VZOuQqAg8yzOexqFSp3hDRiS_YKqC5j1zxr5PcnTjQswd6qzAnY1683aN1iteF6_hRAu1wjz9Yd28qGbqVRSh9rPcH/kq_aUVN/1CouaLImDYJByMsg9HVdAderzY_y444jZOlqrMX8I_/hQxx6vXkQ6YztWqjvxfWW9cEEAdLjo_xvGnwKghPIC4rY8H9kSz7yVwjF0IhqMtDccqcbo0g1eFy3B2a0ufQebcshokbVJOV5mIE8VRR1bMl9E/oeqHPa52v3KP0QLYRTd7BbB2KDEKp0JrgmbwuefdEjP58rKAzGV1CD6IX7_CTl4wtqD9J69z91SXu9CJaxmH9CunhPZNTXZXalUfabHXSDbh6y3wUZIPYYOrPDqZRiGbU2kF28VeCrRy9kO9sGkQQu88B7rDhmECnwSM3xbXHbOJswyY12tOAXd6PzhPuEt5k7sCuXcIloxn4zgnh3pffKr5nWD0SnFd9hr4e3zN2bqy13NCCzLcBX2rYpA/DIWNDOalUcCAVB8zzw8lV1mL9HZOwNXBq7PM0_3coQ_LKngHhCa7__PyWM7gVZusUWP0iA_VtwP9_1tXJFpVKR6IYbaqiVdF8Mv6xu6PTJjwRIYo/Xlh4Svv4ighoLSJNAVOCByPvBhlwRkD_R6h2WQHJUV8itbcjaaP80acsmuAkTjiaEz460RHBnqlOx9Vg0dXNFcWzyZRrkQbj21KuI0YjTqVZk19BVB1nvB5RnaiFmi0baVy2xjK15RPECFcgSSDSK4peeC2/Jh_kn/41YVFXFvl7X4Pld62JHDJ7hteNknEiiAcjPy1kVdIwnm5hjXVCaAg_xsxqdj04foRWEf6ddwzOB0mXKCb4x/6VscHu88zAY9Mr/g4b/jdTF6_Cq_WmFeqG7/o1wXjGmIUhDoU7EgS8h6Z/xQK07IV7jbqbg7bwUFIClMbJ7JcjpyXDZTfQgechhVBJxz1Z8Blro5EhNAlOS_CA8VjwpaG24q0KFYAeYiKaJQz6d3SAWbH',
    onClose: () => {
      console.log('Close')
    },
  },
}

export const WithCopyableText: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        Here's a bunch of text with a copyable number, <CopyableText>4242 4224 4242 4242</CopyableText> in the middle of
        it.
      </>
    ),
    onClose: () => {
      console.log('Close')
    },
  },
}
