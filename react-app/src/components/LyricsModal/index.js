import './LyricsModal.css'

export default function LyricsModal({ lyrics }) {
    return (
        <div className='lyrics-modal-container'>
            <pre className='lyrics-modal-text'>{lyrics}</pre>
        </div>
    )
}
