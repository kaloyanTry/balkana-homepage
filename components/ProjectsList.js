// import { unstable_noStore as noStore } from 'next/cache';

import { getProjects } from '@/lib/actions';
import ProjectItem from './ProjectItem';

async function ProjectsList() {
  // noStore();

  const projects = await getProjects();

  return (
    <div>
      {projects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </div>
  );
}

export default ProjectsList;
