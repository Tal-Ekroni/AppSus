import { noteService } from "../services/note.service.js";

export class AddTextNote extends React.Component {
    state = {
        info: {
            text: ''
        }
    }
    //type in props
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))

    }


    render() {
        const { type, onSaveNote } = this.props
        const { value } = this.state.info
        return (
            <form className="add-note" onSubmit={() => {
                onSaveNote(event, this.state.info,type)
            }} >
                <input className="note-input" name="text" value={value} type={type} placeholder="Enter text" onChange={this.handleChange} />
            </form>
        )
    }
}