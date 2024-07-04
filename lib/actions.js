'use server';

import { supabase } from './supabase';

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
    throw new Error('The track could not be loaded');
  }
  return track;
}
