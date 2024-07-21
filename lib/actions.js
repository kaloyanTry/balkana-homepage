'use server';

import { notFound } from 'next/navigation';
import { supabase } from './supabase';
import { eachDayOfInterval } from 'date-fns';
import { signIn, signOut } from './auth';

export async function signInAction(formData) {
  // single provider: await signIn('google', { redirectTo: '/home/explorer' });
  const provider = formData.get('provider');
  await signIn(provider, { redirectTo: '/home/explorer' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/home' });
}

export async function getImages() {
  const { data, error } = await supabase.storage.from('main-images').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error(error);
    throw new Error('Images from supabase db could not be loaded');
  }
  return data;
}

export async function getTracksImages() {
  const { data, error } = await supabase.storage.from('track-images').list('', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error(error);
    throw new Error('Track images from supabase db could not be loaded');
  }

  return data;
}

export async function getTracks() {
  let { data: tracks, error } = await supabase.from('tracks').select('*');

  if (error) {
    console.log(error);

    throw new Error('Tracks from supabase db could not be loaded');
  }

  return tracks;
}

export async function getTrack(id) {
  let { data: track, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    notFound();
    // throw new Error('The track could not be loaded');
  }
  return track;
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
    notFound();
    // throw new Error('The project could not be loaded');
  }
  return project;
}

export async function getBookedDatesByTrackId(trackId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  let { data: explorations, error } = await supabase
    .from('explorations')
    .select('*')
    .eq('trackId', trackId)
    .or(`startDate.gte.${today},status.eq.confirmed`);

  if (error) {
    console.log(error);
    notFound();
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
  let { data: explorer } = await supabase
    .from('explorers')
    .select('*')
    .eq('email', email)
    .single();

  console.log(explorer);

  return explorer;
}
