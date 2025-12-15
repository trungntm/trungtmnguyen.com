import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mt-1 mr-3 mb-1 rounded-lg bg-slate-100 px-2 py-0.5 text-sm font-semibold text-gray-500 capitalize hover:bg-slate-200 hover:text-gray-700 dark:bg-gray-500 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
    >
      <span>#{text.split(' ').join('-')}</span>
    </Link>
  )
}

export default Tag
