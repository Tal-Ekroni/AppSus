

export class AddTodosNote extends React.Component {
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
        const { todos,title } = this.state.info
        const { onSaveNote, type } = this.props
        return (
            <section className="flex">
            <form className="add-note" onSubmit={() => {onSaveNote(event, this.state.info, type)}}>
                <input className="note-input" type="text" name="title" value={title} onChange={this.handleChange} placeholder="Enter title" />
            </form>
            <form className="add-note" onSubmit={() => {onSaveNote(event, this.state.info, type)}}>
                <input className="note-input" type="text" name="todos" value={todos} onChange={this.handleChange} placeholder="Enter list separated by comma" />
            </form>
            </section>
        )
    }
}