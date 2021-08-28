

export class EditTodosNote extends React.Component {
    state = {
        info: {
            title: '',
            todos: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))

    }
    render() {
        const { todos, title } = this.state.info
        const { type, onEditNote, setEditMode } = this.props

        return (
            <section className="flex editing-modal">
                <h1>{`Edit ${type} :`}</h1>
                <button class="edit-exit-btn" onClick={setEditMode}>x</button>
                <form className="add-note" onSubmit={() => { onEditNote(event, type, this.state.info) }} >
                    <input className="note-input" type="text" name="title" value={title} onChange={this.handleChange} placeholder="Edit  title" />
                </form>
                <form className="add-note" onSubmit={() => { onEditNote(event, type, this.state.info) }} >
                    <input className="note-input" type="text" name="todos" value={todos} onChange={this.handleChange} placeholder="Enter new list separated by comma" />
                </form>
            </section>
        )
    }
}