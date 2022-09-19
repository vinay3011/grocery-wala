import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme } from "react-native-paper";
import StackNav from "./src/navigation/StackNavigation/StackNav";
import rootReducer from "./src/redux/reducers/Index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
const store = createStore(rootReducer);

const App = () => {
  return (
    <PaperProvider theme={PaperDarkTheme}>
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <StackNav />
      </NavigationContainer>
    </Provider>
     </PaperProvider>
  )

}

export default App;

