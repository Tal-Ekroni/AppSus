


export class EditImageNote extends React.Component {
    state = {
        info: {
            title: '',
            url: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }
    render() {
        const { url, title } = this.state.info
        const { type, onEditNote,setEditMode } = this.props
        return (
            <section className="flex editing-modal">
                <h1>{`Edit ${type} :`}</h1>
                    <button class="edit-exit-btn" onClick={setEditMode}>x</button>
                <form className="add-note" onSubmit={() => { onEditNote(event, type, this.state.info) }} >
                    <input className="note-input" name="title" value={title} type="text" placeholder="Edit title" onChange={this.handleChange} />
                </form>
                <form className="add-note" >
                    <input className="note-input" name="url" value={url} type="text" placeholder="Enter new image url" onChange={this.handleChange} />

                </form  >
            </section>
        )
    }
}