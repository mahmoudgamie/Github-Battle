import React from 'react'

export default class Popular extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }
  }

  updateLanguage(selectedLanguage){
    this.setState({selectedLanguage})
  }
  render(){
    const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python'];
    return (
      <React.Fragment>
        <ul className='flex-center'>
          {languages.map(lang => (
            <li key={lang}>
              <button style={this.state.selectedLanguage === lang ? {color: 'rgb(187, 46, 31)'} : null} onClick={() => this.updateLanguage(lang)} className='btn-clear nav-link'>{lang}</button>
            </li>
          ))}
        </ul>
        <h1>{this.state.selectedLanguage}</h1>
      </React.Fragment>
    )
  }
}