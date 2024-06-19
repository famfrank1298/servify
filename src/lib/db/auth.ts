import { get, set } from 'idb-keyval';
import { OrganizationInfo, VolunteerInfo, organizationStorage } from '../store';
import supabase from './supabase';
import {
  Organization,
  OrganizationMember,
  OrganizationTable,
  Volunteer,
  VolunteerTable,
} from './tables';

export enum UserType {
  Volunteer = 'volunteer',
  Organization = 'organization',
}

export const getVolunteer = async (): Promise<Volunteer | null> => {
  const user = await supabase.auth.getUser();

  if (
    user.error ||
    user.data.user.user_metadata.user_type === UserType.Organization
  ) {
    console.log(user);
    return null;
  }

  const userId = user.data.user?.id;

  let { data, error } = await supabase
    .from(VolunteerTable)
    .select(`*`)
    .eq('user_id', userId)
    .limit(1);

  if (error) {
    return null;
  }

  let volunteer: Volunteer = data![0];
  console.log(volunteer);

  return volunteer;
};

export const organizationSignup = async (
  organizationInfo: OrganizationInfo
) => {
  const volunteer = await getVolunteer();

  let { data, error } = await supabase.auth.signUp({
    email: organizationInfo.email,
    password: organizationInfo.password,
    options: {
      data: {
        user_type: UserType.Organization,
      },
    },
  });

  if (!error) {
    addOrganizationInfo(organizationInfo, volunteer);
  }

  return { data, error };
};

export const addOrganizationInfo = async (
  organizationInfo: OrganizationInfo,
  volunteer: Volunteer | null
) => {
  await uploadOrganizationPhotos(organizationInfo);
  const { data, error } = await addOrganizationTable(organizationInfo);

  if (error) {
    return;
  }

  let organization: Organization = data![0];

  if (volunteer) {
    addOrganizationMember(volunteer, organization, 'owner');
  }
};

export const addOrganizationMember = async (
  volunteer: any,
  organization: any,
  role: string
) => {
  const { data, error } = await supabase
    .from(OrganizationMember)
    .insert({
      user_id: volunteer.id,
      organization_id: organization.id,
      role,
    })
    .select();

  return { data, error };
};

export const addOrganizationTable = async (
  organizationInfo: OrganizationInfo
) => {
  const { data, error } = await supabase
    .from(OrganizationTable)
    .insert({
      organizationName: organizationInfo.organizationName,
      description: organizationInfo.description,
      address: organizationInfo.address,
      phoneNumber: organizationInfo.phoneNumber,
      website: organizationInfo.website,
      logo: organizationInfo.logo,
      banner: organizationInfo.banner,
      mission: organizationInfo.mission,
      tags: organizationInfo.tags,
      services: organizationInfo.services,
      nonProfitForm: organizationInfo.nonProfitForm,
    })
    .select();

  return { data, error };
};

export const OrganizationBanner = 'organization-banner';
export const OrganizationLogo = 'organization-logo';
export const NonProfitForm = 'organization-form';
// worry about non profit form later

export const uploadOrganizationPhotos = async (
  organizationInfo: OrganizationInfo
) => {
  [OrganizationBanner, OrganizationLogo].forEach(async (file) => {
    get(file).then(async (file: File) => {
      const { data, error } = await supabase.storage
        .from('organization-images')
        .upload(organizationInfo.organizationName + '/' + file.name, file);
      return { data, error };
    });
  });
};

export const setOrganizationInfoPhotosToDefaults = () => {
  set(OrganizationBanner, '');
  set(OrganizationLogo, '');
};

export const volunteerSignup = async (volunteerInfo: VolunteerInfo) => {
  let { data, error } = await supabase.auth.signUp({
    email: volunteerInfo.email,
    password: volunteerInfo.password,
    options: {
      data: {
        user_type: UserType.Volunteer,
      },
    },
  });
  if (!error) {
    addUserInfo(volunteerInfo);
  }

  return { data, error };
};

export enum OAuthProvider {
  Github = 'github',
  Google = 'google',
}

export const addUserInfo = async (volunteerInfo: VolunteerInfo) => {
  uploadPhoto(volunteerInfo);
  addVolunteerInfo(volunteerInfo);
};

export const addVolunteerInfo = async (volunteerInfo: VolunteerInfo) => {
  const { data, error } = await supabase.from(VolunteerTable).insert([
    {
      email: volunteerInfo.email,
      firstName: volunteerInfo.firstName,
      lastName: volunteerInfo.lastName,
      dob: volunteerInfo.dob,
      phoneNumber: volunteerInfo.phoneNumber,
      gender: volunteerInfo.gender,
      image: volunteerInfo.image,
      bio: volunteerInfo.bio,
      address: volunteerInfo.address,
      favoriteList: JSON.stringify(volunteerInfo.favoriteList),
    },
  ]);

  return { data, error };
};
export const uploadPhoto = async (volunteerInfo: VolunteerInfo) => {
  get('profile-image').then(async (file: File) => {
    console.log(file);

    const { data, error } = await supabase.storage
      .from('profiles')
      .upload(volunteerInfo.email + '/' + file.name, file);
    return { data, error };
  });
};

export const registerOAuthProvider = async (provider: OAuthProvider) => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  return { data, error };
};

