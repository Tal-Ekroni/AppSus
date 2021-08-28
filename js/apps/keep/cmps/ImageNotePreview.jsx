import { ColorPalette } from "./ColorPallette.jsx"



export class ImageNotePreview extends React.Component {
    state = {
        isColorPalette: false
    }
    onOpenColorPalette = () => {
        this.setState(prevState => ({ isColorPalette: !prevState.isColorPalette }))
    }

    render() {
        const { note, onDeleteNote, style, onSetNoteColor, setEditMode,onDuplicateNote } = this.props
        const { isColorPalette } = this.state
        return (
            <section className="image-note-preview" style={style}>
                <div className="image-note-content">
                    <h1>{note.info.title}</h1>
                    <img src={note.info.url} />
                </div>
                <div className="btn-preview-section">
                    <button className="delete-btn" onClick={() => { onDeleteNote(note.id) }}></button>
                    <div className="color-palette-icon" onClick={this.onOpenColorPalette}>
                        {isColorPalette && <ColorPalette note={note} onSetNoteColor={onSetNoteColor} />}
                    </div>
                    <button className="edit-note" onClick={() => { setEditMode(note.type, note.id) }} >
                    </button>
                    <button className="duplicate-btn" onClick={() => { onDuplicateNote(note) }}></button>
                </div>
            </section>
        )
    }
}