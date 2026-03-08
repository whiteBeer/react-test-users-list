import styles from './Search.module.css';

interface SearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
}

const Search = ({ searchTerm, onSearchChange, placeholder = 'Search...' }: SearchProps) => {
    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;