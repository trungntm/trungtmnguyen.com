'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  return (
    <>
      {siteMetadata.comments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </>
  )
}
