import { getVolunteer } from '@/lib/db/auth';
import supabase from '@/lib/db/supabase';
import {
  Organization,
  OrganizationMember,
  OrganizationTable,
  Volunteer,
  constructOrganizationPhotoURL,
} from '@/lib/db/tables';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

const getOrganizationMembers = async (volunteer: Volunteer) => {
  const { data, error } = await supabase
    .from(OrganizationMember)
    .select('*')
    .eq('user_id', volunteer.id);

  let organizationMembers: OrganizationMember[] = data!;

  return { organizationMembers, error };
};

const getOrganizationFromMember = async (
  organizationMember: OrganizationMember
) => {
  const { data, error } = await supabase
    .from(OrganizationTable)
    .select('*')
    .eq('id', organizationMember.organization_id);

  return { organization: data![0], error };
};

const getOrg = async () => {
  const volunteer = await getVolunteer();

  if (!volunteer) {
    return {
      volunteer,
      organization: null,
      organizationMember: null,
      error: null,
    };
  }

  const { organizationMembers, error: organizationMemberError } =
    await getOrganizationMembers(volunteer);

  if (organizationMemberError) {
    return {
      volunteer,
      organization: null,
      organizationMember: null,
      error: organizationMemberError,
    };
  }

  const organizations = await Promise.all(
    organizationMembers.map(async (organizationMember) => {
      const { organization } =
        await getOrganizationFromMember(organizationMember);

      return organization;
    })
  );

  return { volunteer, organizations, error: null };
};

interface OrgPage {
  volunteer: Volunteer | null;
  organization: Organization[] | null;
  organizationMember: OrganizationMember[] | null;
}
export default function Org() {
  const [info, setInfo] = useState<any>();
  const [organizations, setOrganizations] = useState<any>();

  useEffect(() => {
    const start = async () => {
      const org = await getOrg();

      setInfo(org);

      setOrganizations(org.organizations);
    };

    start();
  }, []);

  console.log(info);
  console.log(organizations);

  return (
    <section className="py-4">
      <h2 className="text-center h2 mb-4">Organizations</h2>
      <div className="w-3/4 mx-auto flex gap-4">
        {organizations?.map((organization: Organization) => (
          <Card
            className="relative cursor-pointer w-full"
            key={organization?.id}
          >
            <CardHeader className="relative">
              <div className="relative mb-4">
                <img
                  src={constructOrganizationPhotoURL(
                    organization?.banner,
                    organization?.organizationName
                  )}
                  className="w-full h-56 mx-auto rounded-full"
                />
                <img
                  src={constructOrganizationPhotoURL(
                    organization?.logo,
                    organization?.organizationName
                  )}
                  className="left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] absolute w-32 h-32 mx-auto rounded-full"
                />
              </div>
              <h3 className="h3 text-center">
                {organization?.organizationName}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {organization.tags.map((tag: any) => (
                  <Badge>{tag.name}</Badge>
                ))}
              </div>
              <p className="p">{organization.description}</p>
              <div className="flex gap-2 justify-space-between">
                <p className="p">{organization.email}</p>
                <p className="p">{organization.website}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center"></p>
    </section>
  );
}

