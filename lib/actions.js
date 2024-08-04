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

// export async function getRandomTracksImages() {
//   const getRandomNumber = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.random() * (max - min) + max;
//   };
//   const randomNumber1 = getRandomNumber(0, 26);
//   const randomNumber2 = randomNumber1 + 3;

//   const { data: trackImages, error } = await supabase.storage
//     .from('track-images')
//     .select('name')
//     .range(randomNumber1, randomNumber2);

//   if (error) {
//     console.error(error);
//     throw new Error('Random track images from supabase db could not be loaded');
//   }

//   return trackImages;
// }

export async function getRoutes() {
  let { data: routes, error } = await supabase.from('routes').select('*');

  if (error) {
    console.log(error);

    throw new Error('The ROUTES from supabase db could not be loaded');
  }

  return routes;
}

// export async function getRoutesPerPage(page) {
//   const routesPerPage = 6;

//   let { data: routes, error } =
//     (await supabase
//       .from('routes')
//       .select('*')
//       .range(0, routesPerPage)
//       .limit(routesPerPage)
//       .offset(page - 1)) * routesPerPage;

//   if (error) {
//     console.log(error);

//     throw new Error('The ROUTES from supabase db could not be loaded');
//   }

//   return routes;
// }

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
