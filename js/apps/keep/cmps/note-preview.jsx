
import { TextNotePreview } from './TextNotePreview.jsx'
import { ImageNotePreview } from './ImageNotePreview.jsx'
import { TodosNotePreview } from './TodosNotePreview.jsx'
import { VideoNotePreview } from './VideoNotePreview.jsx'
import { noteService } from '../services/note.service.js'
export class NotePreview extends React.Component {
    state = {
        style: {
            backgroundColor: "#49a9f8"
        }
    }
    // onChangeColor = (field, value) => {
    //     const { note } = this.props
    //     console.log('value', value)
    //     this.setState(prevState => ({ style: { ...prevState.style, [field]: value } }))
    //     note.style = this.state.style
    // }
    render() {
        const { note, onDeleteNote, onSetNoteColor, setEditMode,onChangeEditModeType,onDuplicateNote } = this.props
        const { style } = this.state
        const DynamicCmp = (props) => {
            switch (props.note.type) {
                case 'note-text':
                    return <TextNotePreview {...props} />
                case 'note-image':
                    return <ImageNotePreview {...props} />
                case 'note-todos':
                    return <TodosNotePreview {...props} />
                case 'note-video':
                    return <VideoNotePreview {...props} />
            }
        }
        return (
            <section className="note-preview" >
                <DynamicCmp note={note} onDeleteNote={onDeleteNote} style={{ backgroundColor: note.style.bgcolor }} onSetNoteColor={onSetNoteColor} setEditMode={setEditMode} onChangeEditModeType={onChangeEditModeType} onDuplicateNote={onDuplicateNote} />
            </section>
        )
    }

}