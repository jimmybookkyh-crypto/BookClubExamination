'use strict';

const ALLOWED_FIELDS = ['username', 'email', 'password'];

module.exports = (plugin) => {

  const originalUpdate = plugin.controllers.user.update;

  plugin.controllers.user.update = async (ctx) => {

    const loggedInUserId = ctx.state.user?.id;
    if (!loggedInUserId) {
      return ctx.unauthorized('You must be logged in');
    }

    if (String(ctx.params.id) !== String(loggedInUserId)) {
      return ctx.forbidden('You can only update your own profile');
    }

    const cleanBody = {};
    for (const field of ALLOWED_FIELDS) {
      if (ctx.request.body?.[field] !== undefined) {
        cleanBody[field] = ctx.request.body[field];
      }
    }
    ctx.request.body = cleanBody;

    return originalUpdate(ctx);
  };

  return plugin;
};