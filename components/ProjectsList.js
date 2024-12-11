// import { unstable_noStore as noStore } from 'next/cache';

import { getProjects } from '@/lib/data';
import ProjectItem from './ProjectItem';

async function ProjectsList() {
  const projects = await getProjects();

  return (
    <>
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </>
  );
}

export default ProjectsList;
