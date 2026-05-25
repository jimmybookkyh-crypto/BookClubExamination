'use strict';

/**
 * book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book',
  ({ strapi }) => ({
    async findByGenre(ctx) {
      const { genre } = ctx.params;
      const books = await strapi.entityService.findMany(
        'api::book.book',
        {
          filters: {
            genre: {
              name: {
                $eqi: genre
              }
            }
          },
          populate: {
            genre: true,
            author: true,
            image: true
          }
        }
      );
      return { data: books };
    }
  }));

