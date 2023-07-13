module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.PAYLOAD_HOST}/media/:path*`,
      }
    ]
  },
  images: { 
    domains: [`${process.env.PAYLOAD_HOST}`],
    loader: "custom",
    loaderFile: "./utils/imageLoader.tsx",
  },
}
