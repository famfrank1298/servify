import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface Tag {
  name: string;
}

export default function Search({
  suggestionsList,
  onTagChange,
  tagList,
  setTagList,
}) {
  const [suggestions, showSuggestions] = useState(false);
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    onTagChange(tagList);
  }, [tagList]);

  const search = (e: any) => {
    const value = e.target.value;

    if (value.length > 0) {
      showSuggestions(true);
    } else {
      showSuggestions(false);
    }

    setCurrentInput(value);
  };

  let newTagList: Tag[];
  const createBadge = (newTagName: string) => {
    setTagList((previousTagList: Tag[]) => {
      const found = previousTagList.find((tag: Tag) => tag.name === newTagName);

      if (found) {
        return previousTagList;
      }

      newTagList = [
        ...previousTagList,
        {
          name: newTagName,
        },
      ];

      return newTagList;
    });
  };

  const onSubmit = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }

    // const selected = document.querySelector("[data-selected='true'");

    if (currentInput !== '') {
      createBadge(currentInput);
      return;
    }

    setTagList([]);
  };

  const selectItem = (e: any) => {
    const value = e.target.dataset.value;
    if (!value) {
      return;
    }

    createBadge(value);
  };

  const removeTag = (e: any) => {
    const value = e.target.dataset.name;
    if (!value) {
      return;
    }

    let newTagList;
    setTagList((prevTagList: Tag[]) => {
      newTagList = prevTagList.filter((tag: Tag) => tag.name !== value);
      return newTagList;
    });
  };

  return (
    <>
      <Command>
        <CommandInput
          onKeyDown={onSubmit}
          onChangeCapture={search}
          placeholder="Search by tag..."
        />
        <div
          onClick={removeTag}
          className={`py-1 flex flex-wrap gap-1 ${tagList?.length > 0 ? '' : 'hidden'}`}
        >
          {tagList?.map((tag: Tag) => {
            return (
              <Badge
                key={tag?.name}
                className="space-x-2 cursor-pointer"
                data-name={tag?.name}
              >
                <p data-name={tag?.name} className=".small">
                  {tag?.name}
                </p>
                <span data-name={tag?.name}>x</span>
              </Badge>
            );
          })}
        </div>
        <CommandSeparator />
        <CommandList
          onClick={selectItem}
          onKeyDown={selectItem}
          className={`${suggestions ? '' : 'hidden'}`}
        >
          <CommandGroup heading="Suggestions">
            {suggestionsList.map((suggestion: string) => (
              <CommandItem key={suggestion} className="cursor-pointer">
                {suggestion}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}

