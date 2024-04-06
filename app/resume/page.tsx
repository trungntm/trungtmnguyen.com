import {genPageMetadata} from '../seo'
import {allResumes, Resumes} from 'contentlayer/generated'
import {coreContent} from 'pliny/utils/contentlayer'
import {MDXLayoutRenderer} from 'pliny/mdx-components'
import ResumeLayout from '@/layouts/ResumeLayout'

export const metadata = genPageMetadata({ title: 'Resume' })

export default function ResumePage() {
  const resume = allResumes.find((p) => p.slug === 'trungntm') as Resumes
  const mainContent = coreContent(resume)

  return (
    <>
      <ResumeLayout content={mainContent}>
        <MDXLayoutRenderer code={resume.body.code} />
      </ResumeLayout>
    </>
  )
}
