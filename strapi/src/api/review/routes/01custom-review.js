module.exports = {
  routes: [
    {
      method: "GET",
      path: "/reviews/rating/:stars",
      handler: "review.findByRating",
      config: { auth: false },
    },
  ],
};
