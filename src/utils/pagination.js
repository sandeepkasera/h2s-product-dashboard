export const paginateData = (data, page, limit) => {
const start = (page - 1) * limit;
return data.slice(start, start + limit);
};