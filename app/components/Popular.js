import React from 'react'
import PropTypes  from 'prop-types'

function LanguagesNav ({selected, onUpdateLanguage}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python'];
  return (
    <React.Fragment>
      <ul className='flex-center'>
        {languages.map(lang => (
          <li key={lang}>
            <button style={selected === lang ? {color: 'rgb(187, 46, 31)'} : null} onClick={() => onUpdateLanguage(lang)} className='btn-clear nav-link'>{lang}</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}


export default class Popular extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage){
    this.setState({selectedLanguage})
  }
  render(){
    const selectedLanguage = this.state.selectedLanguage
    return (
      <LanguagesNav selected={this.state.selectedLanguage} onUpdateLanguage={this.updateLanguage}/>
    )
  }
}