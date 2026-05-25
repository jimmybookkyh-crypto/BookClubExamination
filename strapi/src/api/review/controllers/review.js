'use strict';

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
}));