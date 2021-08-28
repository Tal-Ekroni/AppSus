import { utilService } from "../../../services/util.service.js"


export class NoteTodoPreview extends React.Component {
    state = {
        isDone: false
    }
    onFinishTodo = () => {
        this.setState(prevState => ({ isDone: !prevState.isDone }))
    }
    render() {
        const { todo } = this.props
        const { isDone } = this.state

        return (
            <section className="todo-preview">
                <li className={isDone?"done":''} onClick={this.onFinishTodo}>{todo}</li>
                {/* {isDone && <span>- Done At: ${utilService.formatedTimestamp(Date.now())}`</span>} */}
            </section>
        )
    }
}