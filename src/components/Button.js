import PropTypes from 'prop-types';
//Destructure props in color and text
const Button = ({ color, text , onClick}) => {
// const Button =  props  => {
  return (
    //   when we use props
//   <button style = {{backgroundColor : props.color}} className = 'btn'> {props.text} </button>
  <button onClick = {onClick} style = {{backgroundColor : color}} className = 'btn'> {text} </button>
  )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
    onClick : PropTypes.func
}



export default Button