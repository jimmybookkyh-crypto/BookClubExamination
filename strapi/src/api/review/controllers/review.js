"use strict";

const review = require("../routes/review");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx) {
    const userId = ctx.state.user.id;

    const response = await strapi.entityService.create("api::review.review", {
      data: {
        ...ctx.request.body.data,
        user: userId,
      },
    });

    return { data: response };
  },
  async findByRating(ctx) {
    const { stars } = ctx.params;
    if (stars < 1 || stars > 5) {
      return ctx.badRequest("Betyg mellan 1 till 5");
    }
    const reviews = await strapi.entityService.findMany("api::review.review", {
      filters: {
        rating: Number(stars),
      },
      populate: {
        user: true,
        book: {
          populate: {
            author: true,
          },
        },
      },
    });
    return { data: reviews };
  },
}));
