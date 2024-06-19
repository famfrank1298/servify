import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  useLangStore,
  useVolunteerSignupStore,
  VolunteerSignupStoreState,
} from '@/lib/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createInputSection } from '@/components/shared/LabelInput/LabelInput';
import Search from '@/components/shared/Search/Search';
import { fileToBlob, GetImage } from '@/lib/utils';
import { get, set } from 'idb-keyval';

export default function Profile() {
  const { t, i18n } = useTranslation();
  const langState = useLangStore((state: any) => state);
  const [favoriteList, setFavoriteList] = useState<any[]>([]);
  const [image, setImage] = useState<File | string>();

  const volunteerState = useVolunteerSignupStore<VolunteerSignupStoreState>(
    (state: VolunteerSignupStoreState) => state
  );

  useEffect(() => {
    i18n.changeLanguage(langState.lang);
    setFavoriteList(volunteerState.info.favoriteList);
  }, []);

  useEffect(() => {
    const getImage = async () => {
      setImage(await GetImage('profile-image'));
    };

    getImage();
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="h3">{t('pageStateHeader.profile')}</CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div>
            <div className="flex items-center justify-center flex-col gap-4">
              <label
                className="cursor-pointer flex flex-col gap-2"
                htmlFor="image"
              >
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  className={`cursor-pointer w-24 h-24 rounded-[50%] bg-secondary ${image ? 'hidden' : ''}`}
                  id="image"
                  onChange={async (e) => {
                    const file = e.target.files![0];

                    if (file) {
                      setImage(file);
                      set('profile-image', file);

                      volunteerState.info.image = file.name;

                      volunteerState.setInfo(volunteerState.info);
                    }
                  }}
                />
                {image ? (
                  <img
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image!)
                        : image
                    }
                    alt="profile"
                    className="w-24 h-24 rounded-[50%]"
                  />
                ) : null}

                {t('profilePage.image')}
              </label>
            </div>
          </div>
          {createInputSection(
            'Bio',
            'I am interested in...',
            t('profilePage.bio'),
            volunteerState.info.bio,
            volunteerState.info,
            volunteerState.setInfo
          )}
          <Search
            tagList={favoriteList}
            setTagList={setFavoriteList}
            suggestionsList={[]}
            onTagChange={(newFavoriteList: any[]) => {
              if (
                volunteerState.info.favoriteList.length > 0 &&
                newFavoriteList.length === 0
              ) {
                return;
              }

              volunteerState.info.favoriteList = newFavoriteList;
              volunteerState.setInfo(volunteerState.info);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}

