module.exports = {
  routes: [
    {
      method: "GET",
      path: "/books/search/:query",
      handler: "book.searchBooks",
      config: {
        auth: false,
      },
    },
  ],
};
