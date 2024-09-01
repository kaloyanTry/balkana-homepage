import { getRoutesBG } from '@/lib/bg-actions';

const BgPage = async () => {
  const routesbg = await getRoutesBG();
  console.log(routesbg);
  return (
    <div>
      <h1>Routes in bg</h1>
      <ul>
        {routesbg.map((route) => (
          <li key={route.id}>{route.title_bg}</li>
        ))}
      </ul>
    </div>
  );
};

export default BgPage;
