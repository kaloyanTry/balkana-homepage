import ExplorerNavigation from '@/components/ExplorerNavigation';

export default function ExplorerLayout({ children }) {
  return (
    <div className='grid grid-cols-[12rem_1fr] h-full gap-4'>
      <ExplorerNavigation />
      <div>{children}</div>
    </div>
  );
}
