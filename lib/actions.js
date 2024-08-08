'use server';

import { notFound } from 'next/navigation';
import { supabase } from './supabase';
import { eachDayOfInterval } from 'date-fns';
import { signIn, signOut } from './auth';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signInAction(formData) {
  // single provider: await signIn('google', { redirectTo: '/home/explorer' });
  const provider = formData.get('provider');
  await signIn(provider, { redirectTo: '/home/explorer' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/home' });
}

export async function updateExplorerProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be lgged in!');

  // regex to check the phone number: https://regexlib.com/REDetails.aspx?regexp_id=3172

  const phone = formData.get('phone');
  if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(phone)) {
    throw new Error('Please provide a valid international phone number');
  }

  const [nationality, countryFlag] = formData.get('nationality').split('%');

  const updateData = { nationality, countryFlag, phone };

  const { error } = await supabase
    .from('explorers')
    .update(updateData)
    .eq('id', session.user.explorerId);

  if (error) throw new Error('Explorer Profile could not be updated');

  revalidatePath('/home/explorer/profile');
}

export async function getImages() {
  const { data: images, error } = await supabase.storage
    .from('main-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    console.error(error);
    throw new Error('Images from supabase db could not be loaded');
  }
  return images;
}

export async function getTracksImages() {
  const { data: trackImages, error } = await supabase.storage
    .from('track-images')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    console.error(error);
    throw new Error('Track images from supabase db could not be loaded');
  }

  return trackImages;
}

export async function getRoutes() {
  let { data: routes, error } = await supabase.from('routes').select('*');

  if (error) {
    console.log(error);

    throw new Error('The ROUTES from supabase db could not be loaded');
  }

  return routes;
}

const ITEMS_PER_PAGE = 6;
export async function getFilteredRoutes(query, currentPage) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // const filterByTitle = null;
  // const filterPopLow = 1000;
  // const filterPopHigh = 10000;

  // let query = supabase.from('cities').select('name, country_id');

  // if (filterByName) {
  //   query = query.eq('name', filterByName);
  // }
  // if (filterPopLow) {
  //   query = query.gte('population', filterPopLow);
  // }
  // if (filterPopHigh) {
  //   query = query.lt('population', filterPopHigh);
  // }

  // const { data, error } = await query;

  if (query === '') {
    let { data: routes, error } = await supabase
      .from('routes')
      .select('*')
      .order('created_at', { ascending: 'true' })
      .limit(ITEMS_PER_PAGE)
      .range(offset, offset - 1 + ITEMS_PER_PAGE);

    if (error) {
      console.log(error);
      throw new Error('The routes from supabase could not be loaded.');
    }
    return routes;
  } else {
    let { data: routes, error } = await supabase
      .from('routes')
      .select('*')
      .order('created_at', { ascending: 'true' })
      .limit(ITEMS_PER_PAGE)
      .range(offset, offset - 1 + ITEMS_PER_PAGE)
      .textSearch('title', query);

    if (error) {
      console.log(error);
      throw new Error('The routes from supabase could not be loaded.');
    }
    return routes;
  }
}

export async function getRoutesPages(query) {
  let countRoutes;

  if (query === '') {
    const { count, error } = await supabase
      .from('routes')
      .select('*', { count: 'exact', head: true });
    if (error) {
      console.log(error);
      throw new Error('The COUNT(total number) of routes could not be loaded.');
    }
    countRoutes = count;
  } else {
    const { count, error } = await supabase
      .from('routes')
      .select('*', { count: 'exact', head: true })
      .textSearch('title', query);
    if (error) {
      console.log(error);
      throw new Error('The COUNT(total number) of routes could not be loaded.');
    }
    countRoutes = count;
  }

  // const totalPages = Math.ceil(Number(routes.length / ITEMS_PER_PAGE));
  const totalPages = Math.ceil(Number(countRoutes) / ITEMS_PER_PAGE);

  return totalPages;
}

export async function getRoute(id) {
  let { data: route, error } = await supabase
    .from('routes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('The route could not be loaded');
  }

  revalidatePath(`/home/routes/${id}`);

  return route;
}

export async function getProjects() {
  let { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.log(error);
    throw new Error('Projects from supabase db could not be loaded');
  }

  return projects;
}

export async function getProject(id) {
  let { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('The project could not be loaded');
    //notFound();
  }
  return project;
}

export async function getExplorations(explorerId) {
  let { data: explorations, error } = await supabase
    .from('explorations')
    .select(
      'id, created_at, startDate, endDate, numDays, numExplorers, explorerId, routeId, routes(title, image)'
    )
    .eq('explorerId', explorerId)
    .order('startDate');

  if (error) {
    console.log(error);
    throw new Error('The explorations could not be loaded');
    //notFound();
  }

  return explorations;
}

export async function getPlannedExplorations(routeId) {
  let { data: explorations, error } = await supabase
    .from('explorations')
    .select(
      'id, startDate, endDate, numDays, numExplorers, explorerId, routeId'
    )
    .eq('routeId', routeId)
    .order('startDate');

  if (error) {
    console.log(error);
    throw new Error('The planned explorations could not be loaded');
    //notFound();
  }

  return explorations;
}

export async function getBookedDatesByRouteId(routeId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  let { data: explorations, error } = await supabase
    .from('explorations')
    .select('*')
    .eq('routeId', routeId)
    .or(`startDate.gte.${today},status.eq.confirmed`);

  if (error) {
    console.log(error);
    throw new Error('The explorations could not be loaded');
    //notFound();
  }

  const bookedDates = explorations
    .map((exploration) => {
      return eachDayOfInterval({
        start: new Date(exploration.startDate),
        end: new Date(exploration.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getExplorer(email) {
  let { data: explorer, error } = await supabase
    .from('explorers')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.log(error);
    throw new Error('The explorer could not be loaded');
    //notFound();
  }

  return explorer;
}

// create new explorer in db supabase
export async function createExplorer(newExplorer) {
  const { data, error } = await supabase
    .from('explorers')
    .insert([newExplorer]);

  if (error) {
    console.log(error);
    throw new Error('User could not be created.');
  }

  return data;
}

// create exploration:
export async function createExploration(explorationData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must be lgged in!');

  const newExploration = {
    ...explorationData,
    explorerId: session.user.explorerId,
    numExplorers: Number(formData.get('numExplorers')),
    experience: formData.get('experience').slice(0, 1000),
    status: 'unconfirmed',
  };

  const { error } = await supabase
    .from('explorations')
    .insert([newExploration]);

  if (error) throw new Error('Exploration could not be created');

  revalidatePath(`/routes/${explorationData.routeId}`);
  redirect('/home/routes/feedback');
}

// delete exploration
export async function deleteExploration(explorationId) {
  const session = await auth();
  if (!session) throw new Error('You must be lgged in!');

  const explorerExplorations = await getExplorations(session.user.explorerId);
  const explorerExplorationsIds = explorerExplorations.map(
    (exploration) => exploration.id
  );
  if (!explorerExplorationsIds.includes(explorationId))
    throw new Error('You are not allowed to delete this exploration.');

  const { error } = await supabase
    .from('explorations')
    .delete()
    .eq('id', explorationId);

  if (error) throw new Error('The exploration could not be deleted.');

  revalidatePath('/home/explorer/explorations');
}

//update exploration
export async function getExploration(id) {
  let { data: exploration, error } = await supabase
    .from('explorations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('The exploration could not be loaded');
  }

  return exploration;
}

export async function updateExploration(formData) {
  const explorationId = Number(formData.get('explorationId'));

  // 1) Authentication:
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  // 2) Authorization:
  const explorerExplorations = await getExplorations(session.user.explorerId);
  const explorerExplorationsIds = explorerExplorations.map(
    (exploration) => exploration.id
  );

  if (!explorerExplorationsIds.includes(explorationId))
    throw new Error('You are not allowed to update this exploration.');

  // 3. Building updated data:
  const updateExploration = {
    numDays: Number(formData.get('numDays')),
    numExplorers: Number(formData.get('numExplorers')),
    experience: formData.get('experience').slice(0, 1000),
  };

  // 4) Mutation:
  const { error } = await supabase
    .from('explorations')
    .update(updateExploration)
    .eq('id', explorationId)
    .select()
    .single();

  // 5) Error handling:
  if (error) {
    throw new Error('Exploration could not be updated');
  }

  // 6) Revalidation:
  revalidatePath(`/home/explorer/explorations/edit/${explorationId}`);
  revalidatePath('/home/explorer/explorations');

  // 7) Redirecting:
  redirect('/home/explorer/explorations');
}
