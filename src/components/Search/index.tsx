import styles from './Search.module.css';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { useEffect, useState, useRef } from 'react';

interface SearchProps {
    value: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
}

const Search = ({ value, onSearchChange, placeholder = 'Search...' }: SearchProps) => {
    const [search, setSearch] = useState(value);
    const [searchDebounced] = useDebounce(search, 500);
    const isUserTyping = useRef(false);

    useEffect(() => {
        isUserTyping.current = false;
        // sync local search value with external value
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearch(value);
    }, [value]);

    useEffect(() => {
        if (isUserTyping.current) {
            onSearchChange(searchDebounced);
        }
    }, [searchDebounced, onSearchChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isUserTyping.current = true;
        setSearch(e.target.value);
    };

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                className={styles.searchInput}
                value={search}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;