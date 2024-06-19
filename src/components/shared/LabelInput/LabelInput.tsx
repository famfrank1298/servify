import { Input } from '@/components/ui/input';
import { camelCase, kebabCase } from 'change-case';
import React from 'react';

export const createInputSection = (
  key: string,
  placeholder: string,
  translation: string,
  value: string,
  property: any,
  hangleChangeFn: (property: any) => void
) => {
  const getType = () => {
    if (key.includes('Date')) {
      return 'date';
    } else if (key.includes('Email')) {
      return 'email';
    } else if (key.includes('Phone')) {
      return 'text';
    } else {
      return 'text';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    property[camelCase(key)] = e.target.value;
    hangleChangeFn(property);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={kebabCase(key)}>{translation}</label>
      <Input
        value={value}
        onChange={handleChange}
        name={kebabCase(key)}
        id={kebabCase(key)}
        placeholder={placeholder}
        type={getType()}
        pattern={key.includes('Phone') ? '[0-9]{3}-[0-9]{2}-[0-9]{3}' : ''}
      />
    </div>
  );
};

