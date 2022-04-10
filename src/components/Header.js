import PropTypes from 'prop-types';
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({ title ,onAddTask ,showAdd }) => {

  const location = useLocation()
  return (
    <header className = 'header'>
        {/* Declare css inline or  */}
        {/* <h1 style = {{color :'red' , backgroundColor: 'black'}}> Task Tracker {props.title} </h1> */}
        {/* Create Variable */}
        {/* <h1 style = {headingStyle}> Task Tracker {props.title} </h1> */}
        {/* example to use props */}
        {/* <h1 > Task Tracker {props.title} </h1> */}

        <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAddTask}
        />
      )}
        {/* <button className = 'btn'> Add </button> */}
        
    </header>
  )
}

//Example of Default props
Header.defaultProps = {
    title : 'Task Tracker'
}

Header.propTypes = {
    title : PropTypes.string.isRequired
}

//Styling variable

// const headingStyle = {
//     color :'purple' , 
//     backgroundColor: 'blue'
// }

export default Header