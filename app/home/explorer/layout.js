import ExplorerNavigation from '@/components/ExplorerNavigation';

export default function ExplorerLayout({ children }) {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-8'>
      <ExplorerNavigation />
      <div>{children}</div>
    </div>
  );
}
