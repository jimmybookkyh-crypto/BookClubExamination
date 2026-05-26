module.exports = {
  routes: [
    {
      method: "GET",
      path: "/books/year",
      handler: "book.findUniqueYear",
      config: { auth: false },
    },
  ],
};