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
