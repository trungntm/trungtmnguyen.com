import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from '@/components/images'
import CustomLink from '@/components/custom-link'
import TableWrapper from '@/components/table-wrapper'
import Highlighter from '@/components/highlighter'
import GithubCalendar from '@/components/github'
import Timeline from '@/components/time-line'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Highlighter,
  Timeline,
  GithubCalendar,
}
