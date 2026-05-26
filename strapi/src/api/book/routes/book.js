async findByYear(ctx) {
  const { year } = ctx.params;

  const books = await strapi.entityService.findMany(
    "api::book.book",
    {
      filters: {
        year: year,
      },
      populate: ["genre", "author"],
    }
  );

  ctx.body = {
    data: books,
  };
}