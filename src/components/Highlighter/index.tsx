import styles from './Highlighter.module.css';

interface HighlighterProps {
    text: string;
    highlight: string;
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const Highlighter = ({ text, highlight }: HighlighterProps) => {
    const highlightTrimmed = highlight.trim();
    if (!highlightTrimmed) {
        return <>{text}</>;
    }

    const escapedHighlight = escapeRegExp(highlightTrimmed);
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === highlightTrimmed.toLowerCase() ? (
                    <span key={index} className={styles.highlight}>
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </>
    );
};

export default Highlighter;