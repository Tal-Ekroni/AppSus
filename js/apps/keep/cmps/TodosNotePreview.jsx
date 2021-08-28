import { utilService } from "../../../services/util.service.js"
import { NoteTodoPreview } from "./NoteTodoPreview.jsx"
import { ColorPalette } from "./ColorPallette.jsx"


export class TodosNotePreview extends React.Component {
    state = {
        isColorPalette: false
    }

    onOpenColorPalette = () => {
        this.setState(prevState => ({ isColorPalette: !prevState.isColorPalette }))
    }

    //note is in props
    render() {
        const { note, onDeleteNote, style, onSetNoteColor, setEditMode, onDuplicateNote } = this.props
        const { isColorPalette } = this.state

        return (
            <section className="todos-note-preview" style={style}>
                <div className="todos-content">
                    <h1>{note.info.title}</h1>
                    <ul>
                        {note.info.todos.map(todo => <NoteTodoPreview key={utilService.makeId()} todo={todo} />)}
                    </ul>
                </div>
                <div className="btn-preview-section">
                    <button className="delete-btn" onClick={() => { onDeleteNote(note.id) }}></button>
                    <div className="color-palette-icon" onClick={this.onOpenColorPalette}>
                        {isColorPalette && <ColorPalette note={note} onSetNoteColor={onSetNoteColor} />}
                    </div>
                    <div className="edit-note" onClick={() => { setEditMode(note.type, note.id) }} >
                    </div>
                    <button className="duplicate-btn" onClick={() => { onDuplicateNote(note) }}></button>
                </div>

            </section>
        )
    }
}