export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export async function getAllCountries() {
  try {
    const res = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images'
    );
    const countries = await res.json();

    return countries.data;
  } catch {
    throw new Error('Could not fetch the countries');
  }
}
