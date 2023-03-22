import { useState } from 'react';

import russian from '../../images/rus.svg';
import english from '../../images/eng.svg';
import spanish from '../../images/spa.svg';
import german from '../../images/ger.svg';
import italian from '../../images/it.svg';
import polish from '../../images/pol.svg';

import Dropdown, { languageOption } from '../Dropdown/Dropdown';

const languages = [
  { label: 'Русский', image: russian, value: 1 },
  { label: 'Английский', image: english, value: 2 },
  { label: 'Испанский', image: spanish, value: 3 },
  { label: 'Немецкий', image: german, value: 4 },
  { label: 'Итальянский', image: italian, value: 5 },
  { label: 'Польский', image: polish, value: 6 },
];

function App() {
  const [checkedLanguages, setCheckedLanguages] = useState<languageOption[]>(
    []
  );
  return (
    <>
      <Dropdown
        languageOptions={languages}
        checkedLanguages={checkedLanguages}
        onChange={(language) => setCheckedLanguages(language)}
      />
    </>
  );
}

export default App;
