const { NavLink, withRouter } = ReactRouterDOM
import { eventBusService } from '../services/event-bus-service.js'
import { mailService } from '../apps/mail/services/mail.service.js'
class _AppHeader extends React.Component {
    state = {
        emailsCount: 0,
        isMenuOpen: false
    }


    componentDidMount() {
        eventBusService.on('emails-count', (emailsCount) => {
            this.setState({ emailsCount })
        })
        let unread = mailService.getUnreadEmails()
        eventBusService.emit('emails-count', unread.length)

    }
    onOpenMenu = () => {
        this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }))
    }


    render() {
        const { isMenuOpen } = this.state
        return (
            <section className="app-header">
                
                <h1 onClick={() => this.props.history.push('/')}>AppSus</h1>
                <nav className={isMenuOpen ? "menu-open" : ''}>
                    <NavLink exact to="/" ></NavLink>
                    <NavLink to="/about" ></NavLink>
                    <NavLink to="/book"></NavLink>
                    <NavLink to="/emails"><span className="notification">{this.state.emailsCount === 0 ? '' : this.state.emailsCount}</span></NavLink>
                    <NavLink to="/keep"></NavLink>
                </nav>
                <button className="menu-toggle-btn" onClick={this.onOpenMenu}>☰</button>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)