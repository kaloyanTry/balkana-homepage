'use server';

import { supabase } from './supabase';
import { eachDayOfInterval } from 'date-fns';
import { auth, signIn, signOut } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Sign in and out actions:
// export async function signInAction(formData) {
export async function signInAction() {
  // single provider:
  await signIn('google', { redirectTo: '/home/explorer' });
  // const provider = formData.get('provider');
  // await signIn(provider, { redirectTo: '/home/explorer' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/home' });
}

// Get explorer from db supabase action:
export async function getExplorer(email) {
  const { data, error } = await supabase
    .from('explorers')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    // console.log(error);
    throw new Error('The explorer could not be loaded.');
  }

  return data;
}

// Create new explorer in db supabase action:
export async function createExplorer(newExplorer) {
  const { data, error } = await supabase
    .from('explorers')
    .insert([newExplorer]);

  if (error) {
    // console.log(error);
    throw new Error('Explorer could not be created.');
  }

  return data;
}

// Updata the explorer profile action:
export async function updateExplorerProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be lgged in!');

  // regex to check the phone number link: https://regexlib.com/REDetails.aspx?regexp_id=3172
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

// Create exploration action:
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

// Delete exploration action:
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

export async function getExploration(id) {
  let { data: exploration, error } = await supabase
    .from('explorations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // console.log(error);
    throw new Error('The exploration could not be loaded');
  }

  return exploration;
}

// Update exploration action:
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

export async function getExplorations(explorerId) {
  let { data: explorations, error } = await supabase
    .from('explorations')
    .select(
      'id, created_at, startDate, endDate, numDays, numExplorers, explorerId, routeId, routes(title, image)'
    )
    .eq('explorerId', explorerId)
    .order('startDate');

  if (error) {
    // console.log(error);
    throw new Error('The explorations could not be loaded');
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
    // console.log(error);
    throw new Error('The planned explorations could not be loaded');
  }

  return explorations;
}

export async function getPlannedDatesByRouteId(routeId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  let { data: explorations, error } = await supabase
    .from('explorations')
    .select('*')
    .eq('routeId', routeId)
    .or(`startDate.gte.${today},status.eq.confirmed`);

  if (error) {
    // console.log(error);
    throw new Error('The explorations could not be loaded');
  }

  const plannededDates = explorations
    .map((exploration) => {
      return eachDayOfInterval({
        start: new Date(exploration.startDate),
        end: new Date(exploration.endDate),
      });
    })
    .flat();

  return plannededDates;
}
