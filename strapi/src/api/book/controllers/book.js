"use strict";

/**
 * book genre controller
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
        author: true,
        image: true,
      },
    });

    return { data: books };
  },

/**
 * book year controller
 */
    async findUniqueYear(ctx) {
    const books = await strapi.documents('api::book.book').findMany({
      fields: ['year']
    });

    const year = [...new Set(books
      .map(book => book.year))] 
      .filter(year => year) 
      .sort();                   

    // ctx.body = what you want return from your route
    ctx.body = { data: year };
  }
}));
