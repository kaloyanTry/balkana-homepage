function ButtonRoutes({
  filterDistance,
  handleFilter,
  activeFilter,
  children,
}) {
  return (
    <button
      className={`my-2 px-4 text-accent-300 text-xl hover:bg-primary-100 hover:border-r-2 border-primary-300 ${
        filterDistance === activeFilter ? 'font-bold' : ''
      }`}
      onClick={() => handleFilter(filterDistance)}
    >
      {children}
    </button>
  );
}
export default ButtonRoutes;
