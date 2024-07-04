import { getProjects } from '@/lib/actions';
import ProjectItem from './ProjectItem';

async function ProjectsList() {
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
