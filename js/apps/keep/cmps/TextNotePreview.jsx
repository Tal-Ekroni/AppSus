
import { ColorPalette } from "./ColorPallette.jsx"
import { EditTextNote } from "./EditTextNote.jsx"

export class TextNotePreview extends React.Component {
    state = {
        isColorPalette: false,
        isEditMode: false
    }

    onOpenColorPalette = () => {
        this.setState(prevState => ({ isColorPalette: !prevState.isColorPalette }))
    }
    onOpenEditMode = () => {
        this.setState(prevState => ({ isEditMode: !prevState.isEditMode }))
    }
    render() {
        const { note, onDeleteNote, style, onSetNoteColor, setEditMode, onDuplicateNote } = this.props
        const { isColorPalette } = this.state
        return (
            <section className="text-note-preview" style={style}>
                <h1>{note.info.text}</h1>
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