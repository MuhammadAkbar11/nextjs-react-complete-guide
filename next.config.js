const path = require("path");

module.exports = {
  reactStrictMode: true,

  images: {
    domains: ["loremflickr.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects() {
    return [
      {
        source: "/events/page",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};
