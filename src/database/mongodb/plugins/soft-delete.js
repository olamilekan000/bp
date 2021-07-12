function softDeletePlugin(schema) {
  schema.add({
    deleted: {
      type: Boolean,
      required: true,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    }
  });

  const typesFindQueryMiddleware = [
    'count',
    'find',
    'findOne',
    'findOneAndDelete',
    'findOneAndRemove',
    'findOneAndUpdate',
    'update',
    'updateOne',
    'updateMany'
  ];

  const excludeInFindQueriesIsDeleted = function (next) {
    this.where({ deleted: false });
    next();
  };

  const excludeInDeletedInAggregateMiddleware = function (next) {
    this.pipeline().unshift({ $match: { deleted: false } });
    next();
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });

  schema.pre('aggregate', excludeInDeletedInAggregateMiddleware);
}

module.exports = softDeletePlugin;
