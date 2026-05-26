"use strict";

/**
 * book controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::book.book", ({ strapi }) => ({
  async findByGenre(ctx) {
    const { genre } = ctx.params;
    const books = await strapi.entityService.findMany("api::book.book", {
      filters: {
        genre: {
          name: {
            $eqi: genre,
          },
        },
      },
      populate: {
        genre: true,
        year: true,
        author: true,
        image: true,
      },
    });
    return { data: books };
  },

  /**
   * search controller
   */
  async searchBooks(ctx) {
    const { query } = ctx.params;

    const books = await strapi.entityService.findMany("api::book.book", {
      filters: {
        $or: [
          {
            title: {
              $containsi: query,
            },
          },
          {
            author: {
              firstName: {
                $containsi: query,
              },
            },
          },
          {
            author: {
              lastName: {
                $containsi: query,
              },
            },
          },
        ],
      },
      populate: {
        genre: true,
        year: true,
        author: true,
        image: true,
      },
    });

    return { data: books };
  },

    async findByYear(ctx) {
    const { year } = ctx.params;
    const books = await strapi.entityService.findMany("api::book.book", {
      filters: {
        year: {
          name: {
            $eqi: year,
          },
        },
      },
      populate: {
        genre: true,
        year: true,
        author: true,
        image: true,
      },
    });
    return { data: books };
  },

}));
