import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { get } from 'idb-keyval';
import supabase from './db/supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// LANG
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          start: 'Start volunteering today!',
          startDesc:
            'Remember, you do not need a volunteering account to volunteer',
          signup: 'Signup to enjoy the benefits of Servify today!',
          signupDesc:
            'Create an account to save your volunteering stats, and to signup for volunteering events with ease!',
          ferris: "It's free, duh",
          ferrisDescription:
            'Why would we charge you to become a volunteer? This is for your benefit.',
          register: 'Register for events with ease',
          join: 'Join organizations',
          compete: 'Compete with other volunteers',
          volunteerButton: 'Become a Volunteer',
          loggedIn: 'Welcome',
          loggedIn2:
            'The rest of the fields are optional, but it will save you time registering for events if you do it now!',

          signupO: 'Register an Organization',
          signupDescO: 'Get your organization on Servify, and host events!',
          nonprofit: 'Claim 501c3 nonprofit status!',
          nonprofitDescription: 'Claim',
          organizationButton: 'Register an Organization',

          // Volunteer signup
          volunteerSignupHeader: 'Become a Volunteer!',
          volunteerSignupPara: 'Start volunteering today!',
          registrationMethod: 'Registration Method',

          pageState: {
            register: 'Register',
            info: 'Info',
            contact: 'Contact',
            profile: 'Profile',
          },
          pageStateHeader: {
            register: 'Register with 3rd party provider',
            info: 'Information',
            contact: 'Contact Information',
            profile: 'Profile',
          },
          pageStateDesc: {
            register: 'Register with 3rd party provider',
            info: 'Information',
            contact: 'Let volunteering organizations contact you.',
            profile: 'Profile',
          },

          infoPage: {
            firstName: 'First Name',
            lastName: 'Last Name',
            dob: 'Date of Birth',
          },
          registerPage: {
            email: 'Email',
            password: 'Password',
          },
          contactPage: {
            email: 'Email',
            phoneNumber: 'Phone',
            address: 'Address',
          },
          profilePage: {
            bio: 'Bio',
            image: 'Profile Image',
            favorites: 'Favorites',
          },
        },
      },
      es: {
        translation: {
          translation: 'version espanola de esta frase.',
          current: 'Cita Actual',
          section: 'Sección de Traducción',
        },
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    keySeparator: '.', // Correctly set the key separator

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const toDashCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

export async function fileToBlob(file) {
  return new Blob([new Uint8Array(await file.arrayBuffer())], {
    type: file.type,
  });
}

export const getUsersName = (user: any) => {
  if (user.app_metadata.provider === 'google') {
    return user.user_metadata.full_name;
  } else {
  }
};

export const GetImage = async (imageString: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.app_metadata.provider === 'google') {
    return user.user_metadata.picture;
  }

  return await get(imageString);
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

