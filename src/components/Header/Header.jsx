import Search from '../Search/Search';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div>Youtube</div>
            <Search />
        </header>
    );
}
