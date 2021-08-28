

export class NotesFilter extends React.Component {
    state = {
        filterBy: ''
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ filterBy: value }, () => { this.props.onSetFilter(this.state.filterBy) })

    }


    render() {
        const { filterBy } = this.state
        const { onSetFilter } = this.props
        return (
            <form className="notes-filter" onSubmit={() => { onSetFilter(filterBy) }}>
                <input className="filter-input" type="text" id="filterBy" name="filterBy" value={filterBy} placeholder="Search note" onChange={this.handleChange} />
            </form>
        )
    }
}