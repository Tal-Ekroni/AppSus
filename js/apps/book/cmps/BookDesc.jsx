export class BookDesc extends React.Component {


    state = {
        isLong: false
    }

    showTxt = (txt) => {
        const { isLong } = this.state
        return isLong ? txt : txt.substring(0, 100)
    }
    onToggle = () => {
        this.setState((prevState) => ({ isLong: !prevState.isLong }))
    }
    render() {
        const { bookTxt } = this.props
        const { isLong } = this.state
        return (
            <p className="book-desc">
                Desc: {this.showTxt(bookTxt)}  
                
                {bookTxt.length > 100 && <span onClick={() => { this.onToggle() }}>{isLong ? 'Less...' : 'More...'}</span>}
            </p>
        )
    }
}