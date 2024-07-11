function ButtonTracks({
  filterSuitable,
  handleFilter,
  activeFilter,
  children,
}) {
  return (
    <button
      className={`my-2 px-4 text-primary-300 hover:bg-primary-100 hover:border-r-2 border-primary-300 ${
        filterSuitable === activeFilter ? 'font-bold' : ''
      }`}
      onClick={() => handleFilter(filterSuitable)}
    >
      {children}
    </button>
  );
}
export default ButtonTracks;
