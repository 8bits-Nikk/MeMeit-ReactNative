import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import {useColorScheme} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./src/ContentScreens/Home";
import Favorites from "./src/ContentScreens/Favorites";
import Profile from "./src/ContentScreens/Profile";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ThemeContext} from "./src/context/ThemeContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import Login from "./src/AuthScreens/Login";
import Register from "./src/AuthScreens/Register";
import {AuthContext, AuthProvider} from "./src/context/AuthService";
import {UserContext} from "./src/context/UserContext";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme)
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)

const HomeTab = createBottomTabNavigator()

const TabNavigator = ({theme}) => (
    <HomeTab.Navigator screenOptions={{headerShown: false}}>
        <HomeTab.Screen name={"Home"}
                        component={Home}
                        options={{
                            tabBarIcon: (props) => (
                                <Ionicons name="home" size={30}
                                          color={props.focused ? "#228773" : theme.colors.disabled}/>
                            )
                        }}/>
        <HomeTab.Screen name={"Favorites"}
                        component={Favorites}
                        options={{
                            tabBarIcon: (props) => (
                                <Ionicons name={"heart"} size={30}
                                          color={props.focused ? "#f54287" : theme.colors.disabled}/>
                            )
                        }}/>
        <HomeTab.Screen name={"Profile"}
                        component={Profile}
                        options={{
                            tabBarLabel: "Profile",
                            tabBarIcon: (props) => (
                                <Ionicons name="person-circle" size={30}
                                          color={props.focused ? "#BB86FC" : theme.colors.disabled}/>
                            )
                        }}/>
    </HomeTab.Navigator>
)

const Stack = createNativeStackNavigator()
const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={"Login"}
                      component={Login}/>
        <Stack.Screen name={"Register"}
                      component={Register}/>
    </Stack.Navigator>
)

const App = () => {
    const isDarkMode = useColorScheme() === 'dark'

    let theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme

    const [initializing, setInitializing] = useState(true)

    const initialState = null
    const reducer = (state, action) => {
        switch (action.type){
            case 'setUser':
                return action.value
            case 'resetUser':
                return null
            default :
                return state
        }
    }

    const [user, userDispatch] = useReducer(reducer, initialState)

    const onAuthObserver = (user_) => {
        userDispatch({type: 'setUser', value: user_})
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthObserver)
    }, [])

    if (initializing) return null

    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <NavigationContainer theme={theme}>
                    <UserContext.Provider value={{user, userDispatch}}>
                        <ThemeContext.Provider value={{isDarkMode: isDarkMode, theme: theme}}>
                            {
                                user ? <TabNavigator theme={theme}/> : <AuthNavigator/>
                            }
                        </ThemeContext.Provider>
                    </UserContext.Provider>
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>

    )
}


export default App;
