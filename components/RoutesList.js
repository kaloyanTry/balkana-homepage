import { getFilteredRoutes } from '@/lib/data';
import RouteItem from './RouteItem';

async function RoutesList({ query, currentPage }) {
  const routes = await getFilteredRoutes(query, currentPage);

  if (!routes.length) return null;

  // ////////////////// Simple filter of routes on client-side: /////////
  // let displayedRoutes;
  // if (filterDistance === 'all') {
  //   displayedRoutes = routes;
  // }
  // if (filterDistance === 'short') {
  //   displayedRoutes = routes.filter((route) => route.distance <= 20);
  // }

  // if (filterDistance === 'trail') {
  //   displayedRoutes = routes.filter(
  //     (route) => route.distance >= 21 && route.distance <= 42
  //   );
  // }

  // if (filterDistance === 'ultra') {
  //   displayedRoutes = routes.filter((route) => route.distance >= 43);
  // }
  // /////////////////////////////////////////////////

  // /////////////////////Search implementation////////////////////////////
  // if (query) {
  //   displayedRoutes = routes.filter((route) => route.title.includes(query));
  // }
  ///////////////////////////////////////////////////////////////////////
  // https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
  //////////////////Pagination///////////////////////////////////////////

  //////////////////////////////////////////////
  return (
    <main className='flex flex-col'>
      <article className='grid mb-8 gap-2 sm:grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-12'>
        {routes.map((route, i) => (
          <RouteItem route={route} key={i} />
        ))}
      </article>
    </main>
  );
}

export default RoutesList;
