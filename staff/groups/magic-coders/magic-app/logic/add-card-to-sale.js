function addCardToSale(card, token, callback) {

    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)
        const user = JSON.parse(response.content), {error: _error} = user
        if (_error) return callback(new Error(_error))

        //Logic
        let {toSale} = user
        const {multiverseid} = card
        console.log(multiverseid)

        if (!toSale)
            toSale = [card]
        else
            toSale.some(card => card.multiverseid === multiverseid) ? '' : toSale.push(card)

        console.log(toSale)

        call('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({toSale})
        }, (error, response) => {
            if (error) return callback(error)

            if (response.status === 204) {
                return callback(undefined, 'update successful!')
            } 
        })
    })

    
}