# grocery_app

/\*\*
Redux - State mgmt, its store the state of your application in one particular place known as Stores
Store = holds our state - THERE IS ONLY ONE STATE,(state is copied, modified then returned to us, original state is not tampered)
Action - State can be modified using actions - SIMPLE OBJECTS
Dispatcher - Action needs to be sent by someone - known as dispatching an action
Reducer - Recieves the action and modifies the state to give us a new state

example : When we press on btn, We are dispatching an action which will go to the reducer, modify the store and reducer will return us the updated state.
-> Stores need a reducer to access it and modify the state.
\*\*/
