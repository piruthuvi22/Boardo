import React from "react";

import {
  Box,
  Center,
  Text,
  StatusBar,
  HStack,
  IconButton,
  Pressable,
  ScrollView,
  Image,
  Row,
  Column,
} from "native-base";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { Feather } from "@expo/vector-icons";
import RoomCard from "../components/RoomCard";

const Home = () => {
  return (
    <Box style={styles.wrapper}>
      <HStack margin={3} alignItems="center">
        <Text style={styles.head}>Current Location </Text>
        <Text style={styles.currentLocation}>Moratuwa </Text>
        <Pressable android_ripple={{ color: "#ccc", borderless: true }}>
          <Feather name="chevron-down" size={24} color="#A0A0A0" />
        </Pressable>
      </HStack>
      <Text margin={3} style={styles.popular}>
        Popular places near to you
      </Text>
      <ScrollView margin={3} showsVerticalScrollIndicator={false}>
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
        <RoomCard />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    top: Constants.statusBarHeight,
    backgroundColor: "#eee",
  },
  head: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#5C5A6F",
  },
  currentLocation: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#A0A0A0",
  },
  popular: {
    fontFamily: "Poppins-Bold",
    // color: "#A0A0A0",
  },
});

export default Home;
