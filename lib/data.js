'use server';

import { supabase } from './supabase';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Fetch main images from db:
export async function getImages() {
  const { data: images, error } = await supabase.storage
    .from('main-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    // console.error(error);
    // throw new Error('Images from supabase db could not be loaded');
    notFound();
  }
  return images;
}

// Fetch routes images from db:
export async function getTracksImages() {
  const { data: trackImages, error } = await supabase.storage
    .from('track-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    // console.error(error);
    // throw new Error('Track images from supabase db could not be loaded');
    notFound();
  }

  return trackImages;
}

// export async function getRoutes() {
//   let { data: routes, error } = await supabase.from('routes').select('*');

//   if (error) {
//     // console.log(error);
//     // throw new Error('The ROUTES from supabase db could not be loaded');
//     notFound();
//   }

//   return routes;
// }

// Fetch filtered routes from db:
const ITEMS_PER_PAGE = 6;
export async function getFilteredRoutes(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (query === '') {
    let { data: routes, error } = await supabase
      .from('routes')
      .select('*')
      .order('id', { ascending: false })
      .limit(ITEMS_PER_PAGE)
      .range(offset, offset - 1 + ITEMS_PER_PAGE);

    if (error) {
      // console.log(error);
      // throw new Error('The routes from supabase could not be loaded.');
      notFound();
    }
    return routes;
  } else {
    let { data: routes, error } = await supabase
      .from('routes')
      .select('*')
      .order('id', { ascending: 'false' })
      .limit(ITEMS_PER_PAGE)
      .range(offset, offset - 1 + ITEMS_PER_PAGE)
      .textSearch('destination', query);

    if (error) {
      // console.log(error);
      // throw new Error('The routes from supabase could not be loaded.');
      notFound();
    }
    return routes;
  }
}

// Fetch filtered routes pages from db:
export async function getRoutesPages(query) {
  let countRoutes;

  if (query === '') {
    const { count, error } = await supabase
      .from('routes')
      .select('*', { count: 'exact', head: true })
      .order('id', { ascending: false });
    if (error) {
      // console.log(error);
      throw new Error('The COUNT(total number) of routes could not be loaded.');
    }
    countRoutes = count;
  } else {
    const { count, error } = await supabase
      .from('routes')
      .select('*', { count: 'exact', head: true })
      .order('id', { ascending: false })
      .textSearch('destination', query);
    if (error) {
      // console.log(error);
      throw new Error('The COUNT(total number) of routes could not be loaded.');
    }
    countRoutes = count;
  }

  // const totalPages = Math.ceil(Number(routes.length / ITEMS_PER_PAGE));
  const totalPages = Math.ceil(Number(countRoutes) / ITEMS_PER_PAGE);

  return totalPages;
}

// Fetch a specific route from db:
export async function getRoute(id) {
  let { data: route, error } = await supabase
    .from('routes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // console.log(error);
    // throw new Error('The route could not be loaded');
    notFound();
  }

  revalidatePath(`/home/routes/${id}`);

  return route;
}

// Fetch all projects from db:
export async function getProjects() {
  let { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // console.log(error);
    // throw new Error('Projects from supabase db could not be loaded');
    notFound();
  }

  return projects;
}

// Fetch a particular project from db
export async function getProject(id) {
  let { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // console.log(error);
    // throw new Error('The project could not be loaded');
    notFound();
  }
  return project;
}
