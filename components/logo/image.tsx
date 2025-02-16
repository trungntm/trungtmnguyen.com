import Image from 'next/image'

export default function ImageLogo(props) {
  const { width = 64, height = 64, src, alt = 'alternative logo' } = props
  return <Image src={src} alt={alt} width={width} height={height} />
}
