export function parsePageQuery(query) {
  const page = query.page ? parseInt(query.page) : 1; // Default to 1 if no page is specified
  const limit = query.limit ? parseInt(query.limit) : 10; // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate how many items to skip

  return { page, skip, limit };
}

