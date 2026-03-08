import { useState } from 'react';

interface SafeAvatarProps {
    src: string;
    alt: string;
    className?: string;
}

const SafeAvatar = ({ src, alt, className }: SafeAvatarProps) => {
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    if (src !== currentSrc) {
        setCurrentSrc(src);
        setError(false);
    }

    return (
        <img
            src={error || !src ? '/default_avatar.jpg' : src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default SafeAvatar;