module.exports = {
  routes: [
    {
      method: "GET",
      path: "/books/genre/:genre",
      handler: "book.findByGenre",
      config: { auth: false },
    },
  ],
};