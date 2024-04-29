export default function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dgr9kpo77/image/upload/${option}/v1714397263/wedding/${format}/${filename}.${format}`
}
