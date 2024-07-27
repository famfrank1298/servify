import supabase from './supabase';

export const VolunteerTable = 'Volunteer';
export interface Volunteer {
  address: string;
  bio: string;
  dob: string;
  email: string;
  firstName: string;
  gender: string;
  image: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  favoriteList: string[];
}

export interface OrganizationMember {
  organization_id: string;
  user_id: string;
  role: string;
  id: string;
}

export interface Organization {
  address: string;
  banner: string;
  description: string;
  email: string;
  id: string;
  logo: string;
  mission: string;
  organizationName: string;
  phoneNumber: string;
  services: string[];
  tags: string[];
  website: string;
}

export const OrganizationTable = 'Organization';
export const OrganizationMember = 'Organization-Member';

// https://viohuazsyxalucdljjbk.supabase.co/storage/v1/object/public/organization-images/Servify/556D0097-5649-44B4-9A00-C27C1136B093.JPG
export const constructOrganizationPhotoURL = (
  nameOfImage: string | undefined,
  nameOfOrganiztion: string | undefined
) => {
  return `https://viohuazsyxalucdljjbk.supabase.co/storage/v1/object/public/organization-images/${nameOfOrganiztion}/${nameOfImage}`;
};

export const constructProfilePhotoURL = (volunteer: Volunteer) => {
  return `https://viohuazsyxalucdljjbk.supabase.co/storage/v1/object/public/profiles/${volunteer.id}/${volunteer.image}`;
};

export const updateProfileImage = async (volunteer: Volunteer, file: File) => {
  const { error } = await supabase.storage
    .from('profiles')
    .upload(volunteer.id + '/' + file.name, file);

  if (error) {
    return;
  }

  const { error: errorUpdate } = await supabase
    .from('Volunteer')
    .update({ image: file.name })
    .eq('id', volunteer.id)
    .select();

  if (errorUpdate) {
    return;
  }
};

