const { Component, Fragment } = React

class App extends Component {

  state = { cards: [], language: undefined, search: {}, card: undefined, error: undefined, message: undefined, view: 'profile', sidebar: false }

  logout = () => {
    this.setState({view: 'login'})
  }


  handleLogin = ({username, password}) => {
    try {
        authenticateUser(username, password, (error, token, user) => {
            // Asyn Error
            if (error) {
                this.setState({error: error.message})
                setTimeout(() => this.setState({error: undefined}), 9000);
            } else {
               
              if (error)
                  return this.setState({ error: error.message })

              sessionStorage.token = token
              this.setState({ view: 'landing', user })
                
            }
        })
        // Sync Error
    } catch (error) {
        this.setState({error: error.message})
        setTimeout(() => this.setState({error: undefined}), 3000);
    }
}

handleGoToRegister = () => this.setState({view: "register"})

handleRegister = user => {
  try {
      registerUser(user, (error, message) => {
          // Asyn Error
          if (error) {
              this.setState({error: error.message})
              setTimeout(() => this.setState({error: undefined}), 3000);
          }

          this.setState({view: "login", message})
          setTimeout(() => this.setState({message: undefined}), 3000);

      })
      
      // Sync Errror
  } catch (error) {
      this.setState({error: error.message})
      setTimeout(() => this.setState({error: undefined}), 3000);
  }
  
}

handleGoToLogin = () => this.setState({view: "login"})

  handleLanguage = lang => this.setState({ language: lang })

  handleSearch = ({ query }) => {

    const { search } = this.state

    let _search = search

    if (query) _search = { ...search, name: query }

    searchCards(_search, (error, cards) => {
      this.setState({ cards, language: undefined, view: 'landing' })
    })
  }

  handleSelect = ({ target: { value } }, property) => {
    const { search } = this.state
    this.setState({ search: { ...search, [property]: value } })
  }

  handleCheckbox = (event, property) => {
    let { name: color } = event.target
    const { search } = this.state
    const { colors } = search

    let arrayColors = []

    if (!colors) arrayColors.push(color)
    else {
      let actualColors = colors.split("|")
      actualColors.forEach(color => arrayColors.push(color))
      arrayColors.includes(color)
        ? (arrayColors = arrayColors.filter(_color => _color !== color))
        : arrayColors.push(color)
    }

    let stringColors = arrayColors.join("|")

    this.setState({ search: { ...search, [property]: stringColors } })
  }

  handleDetail = id => {
      retrieveCard(undefined, id, (error, card)=> {
          this.setState({card, view:'detail'})
      })
  }

  handleSidebar = () => {
    this.setState({sidebar: !this.state.sidebar})
  }

  render() {
    const {

      state: { cards, card, language, view, error, sidebar  },

      handleLanguage,
      handleSearch,
      handleSelect,
      handleCheckbox,
      handleDetail,
      handleLogin, 
      handleRegister,
      handleGoToRegister,
      handleGoToLogin,
      logout
    } = this

    return (
      <Fragment>
        {(view === 'login' || view === 'register') &&
        <div className="container-login">
          {view === 'login' && <Login onSubmit={handleLogin} handleGoToRegister={handleGoToRegister} error={error}/>}
          {view === 'register' && <Register onSubmit={handleRegister} handleGoToLogin={handleGoToLogin} error={error}/>}
        </div>
        }
        {(view !== 'login' || view !== 'register') &&
        <Fragment>
          <div id="search-container">

            {(view !== 'login' || view !== 'register') && <Navbar toggleSidebar={this.handleSidebar} sidebar={sidebar} logout={logout} />}
            {view === 'landing' && 
            <div className='filter'>
              <Types onChange={handleSelect} property="types" />
              <Rarity onChange={handleSelect} property="rarity" />
              <ManaCost onChange={handleSelect} property="cmc" />
              <Colors onChange={handleCheckbox} property="colors" />
              <Search onSubmit={handleSearch} title="Name Card" />
            </div>}
            {view === 'landing' && cards.length > 0 && (
              <div>
                <Button padding="3px 6px" value={undefined} onClick={handleLanguage} >
    
                </Button>
                {languages.map(value => (
                  <Button padding="2px 5px" value={value} onClick={handleLanguage}>
                    {value}
                  </Button>
                ))}
              </div>
            )}


          </div>
          {view === 'detail' && <Detail card={card}/>}
          {view === 'landing' && <Results results={cards} onClickItem={handleDetail} language={language} />}
          {view === 'profile' && <Profile />}

        </Fragment>
        }
        <Footer onClick={handleLanguage}/>
      </Fragment>
    )
  }
}