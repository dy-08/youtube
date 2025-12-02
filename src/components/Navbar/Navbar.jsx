import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/short'>Short</Link>
            </div>
            <div>darkMode</div>
        </nav>
    );
}
