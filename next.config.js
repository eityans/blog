const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  images: {
    domains: ["images.ctfassets.net"],
  },
});
