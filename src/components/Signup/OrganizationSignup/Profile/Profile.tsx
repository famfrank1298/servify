import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  OrganizationSignupStoreState,
  useLangStore,
  useOrganizationSignupStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createInputSection } from '@/components/shared/LabelInput/LabelInput';
import Search from '@/components/shared/Search/Search';
import { fileToBlob, GetImage } from '@/lib/utils';
import { get, set } from 'idb-keyval';
import { kebabCase } from 'change-case';
import { OrganizationBanner, OrganizationLogo } from '@/lib/db/auth';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);
  const [tags, setTagList] = useState<any[]>([]);
  const [services, setServiceList] = useState<any[]>([]);
  const [banner, setOrganizationBanner] = useState<File | string>();
  const [logo, setOrganizationLogo] = useState<File | string>();

  const organizationState =
    useOrganizationSignupStore<OrganizationSignupStoreState>(
      (state: OrganizationSignupStoreState) => state
    );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
    setServiceList(organizationState.info.services);
    setTagList(organizationState.info.tags);
  }, []);

  useEffect(() => {
    const getImage = async () => {
      setOrganizationBanner(await GetImage(kebabCase('Organization Banner')));
      setOrganizationLogo(await GetImage(kebabCase('Organization Logo')));
    };

    getImage();
  }, []);

  const createImageSection = (label: string) => {
    const image = label === 'Organization Banner' ? banner : logo;

    return (
      <label
        className="w-full block cursor-pointer flex flex-col gap-2 items-center"
        htmlFor="image"
      >
        <Input
          type="file"
          name="image"
          accept="image/*"
          className={`cursor-pointer ${label === 'Organization Banner' ? 'w-full' : 'w-24 rounded-[50%]'} h-24 bg-secondary ${image ? 'hidden' : ''}`}
          id="image"
          onChange={async (e) => {
            const file = e.target.files![0];

            if (file) {
              if (label === 'Organization Banner') {
                setOrganizationBanner(file);
                set(OrganizationBanner, file);
                organizationState.info.banner = file.name;
              } else {
                set(OrganizationLogo, file);
                setOrganizationLogo(file);
                organizationState.info.logo = file.name;
              }

              organizationState.setInfo(organizationState.info);
            }
          }}
        />
        {image ? (
          <img
            src={image instanceof File ? URL.createObjectURL(image!) : image}
            alt="logo"
            className={`${label === 'Organization Banner' ? 'w-full h-44 object-cover object-center' : `w-24 rounded-[50%] h-24`}`}
          />
        ) : null}
        {label}
      </label>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="h3">{t('pageStateHeader.profile')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <div className="flex items-center justify-center flex-col gap-8">
              {createImageSection('Organization Banner')}
              {createImageSection('Organization Logo')}
              <div className="w-full">
                <label className="">Organization Tags</label>
                <Search
                  tagList={tags}
                  setTagList={setTagList}
                  suggestionsList={[]}
                  onTagChange={(newTags: any[]) => {
                    if (
                      organizationState.info.tags.length > 0 &&
                      newTags.length === 0
                    ) {
                      return;
                    }

                    organizationState.info.tags = newTags;
                    organizationState.setInfo(organizationState.info);
                  }}
                />
              </div>
              <div className="w-full">
                <label className="">Organization Services</label>
                <Search
                  tagList={services}
                  setTagList={setServiceList}
                  suggestionsList={[]}
                  onTagChange={(newServices: any[]) => {
                    if (
                      organizationState.info.services.length > 0 &&
                      newServices.length === 0
                    ) {
                      return;
                    }

                    organizationState.info.services = newServices;
                    organizationState.setInfo(organizationState.info);
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

