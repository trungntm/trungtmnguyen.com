import Image from 'next/image'

export default function KMSLogo(props) {
  const { width = 64, height = 64 } = props
  return <Image src={'/static/logo/kms.png'} alt={'KMS logo'} width={width} height={height} />
}
