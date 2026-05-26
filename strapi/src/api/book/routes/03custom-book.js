module.exports = {
  routes: [
    {
      method: "GET",
      path: "/books/year/:year",
      handler: "book.findByYear",
      config: { auth: false },
    },
  ],
};