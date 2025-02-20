import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-lg bg-slate-100 px-2 py-0.5 text-sm font-semibold capitalize text-gray-500 hover:text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
    >
      <span>#{text.split(' ').join('-')}</span>
    </Link>
  )
}

export default Tag
