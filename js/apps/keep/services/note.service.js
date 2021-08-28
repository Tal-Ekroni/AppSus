import { storageService } from "../../../services/storage.service.js";
import { utilService } from '../../../services/util.service.js'


export const noteService = {
    query,
    onSaveNote,
    deleteNote,
    changeColor,
    onEditNote,
    duplicateNote,
    formatNoteTimestamp
}
const KEY = 'notesDB'

let notes = storageService.loadFromStorage(KEY) || [
    {
        id: "n101",
        type: "note-text",
        isPinned: false,
        info: {
            text: "Fullstack Me Baby!"
        },
        style: {
            bgcolor: '#FFADAD'
        }
    },
    {
        id: "n102",
        type: "note-image",
        isPinned: false,
        info: {
            url: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
            title: "Bobi and Me"
        },
        style: {
            bgcolor: '#FFD6A5'
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            title: "To Do",
            todos: ["Driving liscence", "Coding power"]

        },
        style: {
            bgcolor: '#FDFFB6'
        }
    },
    {
        id: "n104",
        type: "note-video",
        isPinned: false,
        info: {
            urlId: "5-0BwZ1r6H4"
        },
        style: {
            bgcolor: '#CAFFBF'
        }
    }
];


function query(filterBy) {
    if (filterBy) {
        const notesToShow = notes.filter(note => {
            return note.type.includes(filterBy)
        })
        return Promise.resolve(notesToShow)
    }
    return Promise.resolve(notes)
}

function onSaveNote(noteType, noteToAdd) {
    switch (noteType) {
        case 'text':
            notes.push(_createTextNote(noteType, noteToAdd))
            break;
        case 'image':
            notes.push(_createImageNote(noteType, noteToAdd))
            break;
        case 'todos':
            const noteTodos = noteToAdd.todos.split(',')
            noteToAdd.todos = noteTodos
            notes.push(_createTodoNote(noteType, noteToAdd))
            break;
        case 'video':
            let url = new URL(noteToAdd.urlId);
            var params = url.search
            const urlId = params.substring(3, 14)
            noteToAdd.urlId = urlId
            notes.push(_createVideoNote(noteType, noteToAdd))

    }
    _saveNotesToStorage()
    return Promise.resolve()

}

function onEditNote(noteId, noteType, noteInfo) {
    switch (noteType) {
        case 'note-text':
            _editNote(noteId, noteInfo)
            break;
        case 'note-todos':
            const noteTodos = noteInfo.todos.split(',')
            noteInfo.todos = noteTodos
            _editNote(noteId, noteInfo)
            break;
        case 'note-image':
            _editNote(noteId, noteInfo)
            break;
        case 'note-video':
            let url = new URL(noteInfo.urlId);
            var params = url.search
            const urlId = params.substring(3, 14)
            noteInfo.urlId = urlId
            _editNote(noteId, noteInfo)
            break;

    }
    _saveNotesToStorage()
    return Promise.resolve()


}


function _createTextNote(noteType, noteInfo) {
    return {
        id: utilService.makeId(),
        type: `note-${noteType}`,
        isPinned: false,
        info: noteInfo,
        style: {
            bgcolor: "#49a9f8"
        }
    }

}

function _editNote(noteId, noteInfo) {
    let noteIdx = notes.findIndex(note => {
        return note.id === noteId
    })
    notes[noteIdx].info = noteInfo


}


function _createImageNote(noteType, noteInfo) {
    return {
        id: utilService.makeId(),
        type: `note-${noteType}`,
        isPinned: false,
        info: noteInfo,
        style: {
            bgcolor: "#49a9f8"
        }
    }
}



function _createTodoNote(noteType, noteInfo) {
    return {
        id: utilService.makeId(),
        type: `note-${noteType}`,
        isPinned: false,
        info: noteInfo,
        style: {
            bgcolor: "#49a9f8"
        }

    }
}


function _createVideoNote(noteType, noteInfo) {
    return {
        id: utilService.makeId(),
        type: `note-${noteType}`,
        isPinned: false,
        info: noteInfo,
        style: {
            bgcolor: "#49a9f8"
        }
    }
}



function deleteNote(noteId) {
    let idx = notes.findIndex(note => {
        return noteId === note.id
    })
    notes.splice(idx, 1)
    _saveNotesToStorage()
    return Promise.resolve()

}
function changeColor(noteId, color) {
    console.log(color)
    console.log(noteId)
    let note = notes.find(note => {
        return noteId === note.id
    })
    note.style.bgcolor = color;
    _saveNotesToStorage()
    return Promise.resolve()
}

function duplicateNote(note) {
    const newId = utilService.makeId();
    note.id = newId
    console.log(note.id );
    notes.push(note);
    _saveNotesToStorage()
    return Promise.resolve()
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, notes)
}

function formatNoteTimestamp(timeStamp) {
    let time = new Date(timeStamp)
    var min = time.getMinutes()
    var hours = time.getHours()
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = `0${hours}`
    var today = day + "-" + month + "-" + year + " " + hours + ":" + min
    return today
}