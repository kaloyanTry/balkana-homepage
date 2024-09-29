import { getAllCountries } from '@/lib/utils';

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getAllCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ??
    'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select a country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
