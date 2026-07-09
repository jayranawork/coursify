const paginate = async (model, filter = {}, options = {}) => {
  const page = Math.max(parseInt(options.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(options.limit, 10) || 20, 1), 100);
  const sort = options.sort || { createdAt: -1 };
  const select = options.select || "";
  const populate = options.populate || [];

  const [total, data] = await Promise.all([
    model.countDocuments(filter),
    model
      .find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .select(select),
  ]);

  if (Array.isArray(populate) && populate.length > 0) {
    await model.populate(data, populate);
  }

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    },
  };
};

module.exports = paginate;
