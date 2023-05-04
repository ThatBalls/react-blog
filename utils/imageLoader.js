export default function ImageLoader({ src, width, quality }) {
  return `${process.env.PAYLOAD_HOST}${src}?w=${width}&q=${quality || 75}`
}