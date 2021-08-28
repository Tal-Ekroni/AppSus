import { noteService } from '../services/note.service.js'
import { NotesList } from '../cmps/note-list.jsx'
import { NotesFilter } from '../cmps/NotesFilter.jsx'
import { AddTextNote } from '../cmps/AddTextNote.jsx'
import { AddImageNote } from '../cmps/AddImageNote.jsx'
import { AddTodosNote } from '../cmps/AddTodosNote.jsx'
import { AddVideoNote } from '../cmps/AddVideoNote.jsx'
import { EditTextNote } from '../cmps/EditTextNote.jsx'
import { EditTodosNote } from '../cmps/EditTodosNote.jsx'
import { EditImageNote } from '../cmps/EditImageNote.jsx'
import { EditVideoNote } from '../cmps/EditVideoNote.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: [],
        filterBy: '',
        inputType: 'text',
        editType: 'note-text',
        isEditMode: false,
        currNoteId: ''
    }

    componentDidMount() {
        this.loadNotes()

    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => { this.setState({ notes }) })
    }
    onChangeNoteType = (type) => {
        this.setState({ inputType: type })

    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes);

    }
    onSaveNote = (ev, noteInfo, noteType) => {
        ev.preventDefault()
        noteService.onSaveNote(noteType, noteInfo)
            .then(this.loadNotes)
    }
    onDeleteNote = (noteId) => {
        noteService.deleteNote(noteId)
            .then(this.loadNotes)

    }
    onSetNoteColor = (noteId, color) => {
        noteService.changeColor(noteId, color)
            .then(this.loadNotes)

    }
    onEditNote = (ev, noteType, noteInfo) => {
        ev.preventDefault()
        const noteId = this.state.currNoteId
        noteService.onEditNote(noteId, noteType, noteInfo)
            .then(this.loadNotes)
        this.setState({ isEditMode: false })


    }
    onChangeEditModeType = (type) => {
        this.setState({ editType: type })

    }
    setEditMode = (type, id) => {
        this.setState(prevState => ({ isEditMode: !prevState.isEditMode }))
        this.setState({ editType: type })
        this.setState({ currNoteId: id })
    }
    onDuplicateNote = (note) => {
        noteService.duplicateNote(note)
            .then(this.loadNotes)
    }



    render() {
        const { notes, inputType, isEditMode, editType } = this.state
        const DynamicAddCmp = (props) => {
            switch (props.type) {
                case 'text':
                    return <AddTextNote {...props} />
                case 'image':
                    return <AddImageNote {...props} />
                case 'todos':
                    return <AddTodosNote {...props} />
                case 'video':
                    return <AddVideoNote {...props} />
            }
        }
        const DynamicEditCmp = (props) => {
            switch (props.type) {
                case 'note-text':
                    return <EditTextNote {...props} />
                case 'note-todos':
                    return <EditTodosNote {...props} />
                case 'note-image':
                    return <EditImageNote {...props} />
                case 'note-video':
                    return <EditVideoNote {...props} />
            }

        }
        return (
            <section className="note-app">
                <div className="input-layout">
                    <NotesFilter onSetFilter={this.onSetFilter} />
                    <div className="pick-notes">
                        <DynamicAddCmp type={inputType} onSaveNote={this.onSaveNote} />
                        <div className="note-selection flex">
                            <div className="note-text note-btn" onClick={() => { this.onChangeNoteType('text') }}></div>
                            <div className="note-list note-btn" onClick={() => { this.onChangeNoteType('todos') }}></div>
                            <div className="note-img note-btn" onClick={() => { this.onChangeNoteType('image') }}></div>
                            <div className="note-video note-btn" onClick={() => { this.onChangeNoteType('video') }}></div>
                        </div>
                    </div>
                </div>
                <NotesList notes={notes} onDeleteNote={this.onDeleteNote} onSetNoteColor={this.onSetNoteColor} setEditMode={this.setEditMode} onChangeEditModeType={this.onChangeEditModeType} onDuplicateNote={this.onDuplicateNote} />
                {isEditMode && <DynamicEditCmp type={editType} onEditNote={this.onEditNote} setEditMode={this.setEditMode} />}

            </section>
        )
    }
}