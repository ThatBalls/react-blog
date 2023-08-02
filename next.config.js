module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${process.env.HOST}/media/:path*`,
      }
    ]
  },
  images: { 
    domains: [`${process.env.HOST}`],
    loader: "custom",
    loaderFile: "./utils/imageLoader.tsx",
  },
}
