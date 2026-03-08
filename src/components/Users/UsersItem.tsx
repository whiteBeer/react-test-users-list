import type { User } from '../../types/user';
import Highlighter from '../Highlighter';
import SafeAvatar from '../SafeAvatar';
import styles from './UsersItem.module.css';

interface UsersItemProps {
    user: User;
    highlightText: string;
}

const UsersItem = ({ user, highlightText }: UsersItemProps) => {
    return (
        <li className={styles.userItem}>
            <SafeAvatar 
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`} 
                className={styles.avatar}
            />
            <div>
                <h3 className={styles.userName}>
                    <Highlighter text={`${user.firstName} ${user.lastName}`} highlight={highlightText} />
                </h3>
                <div className={styles.userDetails}>
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                </div>
            </div>
        </li>
    );
};

export default UsersItem;