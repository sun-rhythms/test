import { FC, useEffect, useState } from 'react';

import openDropIcon from '../../images/openDrop.svg';
import searchIcon from '../../images/search.svg';
import checkedIcon from '../../images/checked.svg';
import deleteIcon from '../../images/delete.svg';

import styles from './Dropdown.module.css';

import { filter } from '../../utils/filter';

export type languageOption = {
  label: string;
  image: string;
  value: number;
};

type DropdownProps = {
  languageOptions: languageOption[];
  checkedLanguages: languageOption[];
  onChange: (language: languageOption[]) => void;
};

const Dropdown: FC<DropdownProps> = ({
  languageOptions,
  checkedLanguages,
  onChange,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const filteredLanguages = filter(languageOptions, searchInput);

  const selectLanguage = (language: languageOption) => {
    if (checkedLanguages.includes(language)) {
      onChange(checkedLanguages.filter((lang) => lang !== language));
    } else {
      onChange([...checkedLanguages, language]);
    }
  };

  const isLanguageChecked = (language: languageOption) => {
    return checkedLanguages.includes(language);
  };

  const toggleDropdownHandler = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpened((prev) => !prev);
    }
  };

  useEffect(() => {
    const hideDropdownOnInnerClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;

      if ((element.nodeName === 'BODY' || element.id === 'root') && isOpened) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', hideDropdownOnInnerClick);

    return () =>
      document.removeEventListener('click', hideDropdownOnInnerClick);
  }, [isOpened]);

  return (
    <div className={styles['dropdown-container']}>
      <h2 className={styles.dropdownTitle}>Язык</h2>
      <div
        className={styles.dropdownInput}
        onClick={(e) => toggleDropdownHandler(e)}
      >
        {checkedLanguages.length ? (
          <div
            className={styles['checkedLanguages-container']}
            onClick={(e) => toggleDropdownHandler(e)}
          >
            {checkedLanguages.map((lang) => (
              <div
                key={lang.value}
                className={styles.checkedLanguage}
                onClick={(e) => {
                  e.stopPropagation();
                  selectLanguage(lang);
                }}
              >
                <p className={styles.checkedLanguageLabel}>{lang.label}</p>

                <img
                  src={deleteIcon}
                  className={styles.deleteButtonIcon}
                  alt="Удалить"
                />
              </div>
            ))}
          </div>
        ) : (
          <p
            className={styles.dropdownPlaceholder}
            onClick={(e) => toggleDropdownHandler(e)}
          >
            Выберите язык
          </p>
        )}
        <img
          src={openDropIcon}
          className={`${styles.openDropIcon} ${isOpened ? styles.rotate : ''}`}
          alt="Развернуть"
          onClick={(e) => toggleDropdownHandler(e)}
        />
        <div
          className={`${styles['dropping-container']} ${
            isOpened ? styles.drop : ''
          }`}
        >
          <label className={styles['searchInput-container']}>
            <img src={searchIcon} alt="Найти" />
            <input
              placeholder="Поиск"
              className={styles.searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </label>
          {filteredLanguages.length ? (
            <ul className={styles.languagesList}>
              {filteredLanguages.map((language) => (
                <li
                  className={styles.languageLi}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectLanguage(language);
                  }}
                  key={language.value}
                >
                  <div className={styles['country-container']}>
                    <img
                      src={language.image}
                      alt={`Флаг: ${language.label}`}
                      className={styles.countryIcon}
                    />
                    <p className={styles.countryLabel}>{language.label}</p>
                  </div>
                  <div
                    className={`${styles.checkbox} ${
                      isLanguageChecked(language) ? styles.checked : ''
                    } `}
                  >
                    {isLanguageChecked(language) ? (
                      <img src={checkedIcon} alt="Выбрано" />
                    ) : (
                      ''
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
