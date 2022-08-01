import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import importFont from "./utilities/fonts";

// ===============Create Navigations==============
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ===============Imports Screens==============
import GetStarted from "./screens/Authentication/GetStarted";
import RenterLogin from "./screens/Authentication/RenterLogin";
import StudentLogin from "./screens/Authentication/StudentLogin";
import SignUp from "./screens/Authentication/SignUp";

import Home from "./screens/Home";
import Browse from "./screens/Browse";
import WishList from "./screens/WishList";
import Profile from "./screens/Profile";

// ===============Imports Icons==============
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default App = () => {
  const [isUser, setIsUser] = useState(true);

  if (!importFont()) {
    return (
      <NativeBaseProvider>
        <Text>Font Not loaded</Text>
      </NativeBaseProvider>
    );
  } else if (isUser) {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                  tabBarStyle: { backgroundColor: "#FD683D", height: 60 },
                  tabBarIcon: () => (
                    <AntDesign name="home" size={24} color="white" />
                  ),
                  tabBarItemStyle: { marginBottom: 2 },
                  tabBarLabel: "Home",
                  tabBarLabelStyle: { color: "white", fontSize: 14 },
                }}
              />

              <Tab.Screen
                name="Browse"
                component={Browse}
                options={{
                  headerShown: false,
                  tabBarStyle: { backgroundColor: "#FD683D", height: 60 },
                  tabBarIcon: () => (
                    <AntDesign name="search1" size={24} color="white" />
                  ),
                  tabBarLabel: "Browse",
                  tabBarLabelStyle: { color: "white", fontSize: 14 },
                }}
              />

              <Tab.Screen
                name="WishList"
                component={WishList}
                options={{
                  headerShown: false,
                  tabBarStyle: { backgroundColor: "#FD683D", height: 60 },
                  tabBarIcon: () => (
                    <Ionicons
                      name="bookmarks-outline"
                      size={24}
                      color="white"
                    />
                  ),
                  tabBarItemStyle: { marginBottom: 2 },
                  tabBarLabel: "WishList",
                  tabBarLabelStyle: { color: "white", fontSize: 14 },
                }}
              />

              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerShown: false,
                  tabBarStyle: { backgroundColor: "#FD683D", height: 60 },
                  tabBarIcon: () => (
                    <AntDesign name="user" size={24} color="white" />
                  ),
                  tabBarItemStyle: { marginBottom: 2 },
                  tabBarLabel: "Account",
                  tabBarLabelStyle: { color: "white", fontSize: 14 },
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <SafeAreaProvider>
          <StatusBar />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="get-start">
              <Stack.Screen
                name="get-start"
                component={GetStarted}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="renter-login"
                component={RenterLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="student-login"
                component={StudentLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="sign-up"
                component={SignUp}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
};

/*
        tabBarItemStyle: {
                    marginBottom: 2,
                    borderBottomWidth: 5,
                    borderBottomColor: "#fff",
                    borderBottomEndRadius: 5,
                    borderBottomStartRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  },

     <Tab.Navigator>
          <Tab.Screen name='screen1' component={Screen1} />
          <Tab.Screen name='screen2' component={Screen2} />
      </Tab.Navigator>

  <Tab.Navigator>
          <Tab.Screen name='screen1' component={Screen1}
            options={{
              tabBarStyle: { backgroundColor: "#222222", height: 60 },
              tabBarIcon: () => <AntDesign name="home" size={24} color="white" />,
              tabBarItemStyle: { marginBottom: 5 },
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "white", fontSize: 14 }
            }} />
          <Tab.Screen name='screen2' component={Screen2}
            options={{
              tabBarStyle: { backgroundColor: "#222222", height: 60 },
              tabBarIcon: () => <AntDesign name="setting" size={24} color="white" />,
              tabBarItemStyle: { marginBottom: 5, backgroundColor: "#111111" },
              tabBarLabel: "Settings",
              tabBarLabelPosition: "beside-icon",
              tabBarLabelStyle: { color: "white", fontSize: 14, },
              tabBarBadge: 3,
              tabBarBadgeStyle: {
                backgroundColor: "#fff"
              }
            }} />
        </Tab.Navigator> 

*/
