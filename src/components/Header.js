import PropTypes from 'prop-types';
import Button from './Button'

const Header = ( {title, cat} ) => {
    return (
        <header>
            <h1>Welcome to Dota 2 Tracker {title}, {cat}</h1>
            <Button color='blue' text="Load Random Match"/>
        </header>
    )
}

Header.defaultProps = {
    title: 'default title',
    cat: 'bae'
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header
