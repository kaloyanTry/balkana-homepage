'use server';

import { supabase } from './supabase';

// Fetch all projects from db:
export async function getRoutesBG() {
  let { data: routesbg, error } = await supabase
    .from('routes_bg')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    notFound();
  }

  return routesbg;
}
