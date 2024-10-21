import { getRoutesBG } from '@/lib/bg-actions';

const BgPage = async () => {
  const routesbg = await getRoutesBG();
  console.log(routesbg);
  return (
    <div>
      <h1>Маршрутите на български (работна версия)</h1>
      <ul>
        {routesbg.map((route) => (
          <li key={route.id}>{route.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BgPage;
