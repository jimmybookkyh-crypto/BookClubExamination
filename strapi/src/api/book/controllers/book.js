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

    const page = Number(ctx.query.pagination?.page || 1);
    const pageSize = Number(ctx.query.pagination?.pageSize || 16);

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

      start: (page - 1) * pageSize,
      limit: pageSize,
    });

    const total = await strapi.entityService.count("api::book.book", {
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
    });

    return {
      data: books,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      },
    };
  },

  /**
   * book unique year controller
   */
  async findUniqueYear(ctx) {
    const books = await strapi.documents("api::book.book").findMany({
      fields: ["year"],
    });

    const year = [...new Set(books.map((book) => book.year))]
      .filter((year) => year)
      .sort();

    // ctx.body = what you want return from your route
    ctx.body = { data: year };
  },

  /**
   * book year controller
   */

  async findByYear(ctx) {
    const { year } = ctx.params;
    const books = await strapi.entityService.findMany("api::book.book", {
      filters: {
        year: {
          $eq: Number(year),
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
}));
