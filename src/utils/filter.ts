import { languageOption } from '../components/Dropdown/Dropdown';

export const filter = (
  languageOptions: languageOption[],
  searchInput: string
) => {
  const filteredContacts = languageOptions.filter((language) => {
    return language.label.toLowerCase().includes(searchInput.toLowerCase());
  });
  return filteredContacts;
};
