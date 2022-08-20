import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

import { Box, Text, HStack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Client } from "@googlemaps/google-maps-services-js";

import { Feather } from "@expo/vector-icons";
import RoomCard from "../components/RoomCard";

const client = new Client({});

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uniName, setUniName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let coordinate = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coordinate?.coords.latitude,
        longitude: coordinate?.coords.longitude,
      });
      let lantlong = {
        latitude: coordinate?.coords.latitude,
        longitude: coordinate?.coords.longitude,
      };
      client
        .reverseGeocode({
          params: {
            key: "AIzaSyC7UEErM9uNLXfGOviKE5FOymLpMNcvpyI",
            latlng: lantlong,
          },
        })
        .then((r) => {
          console.log(r.data.results[0]?.formatted_address.split(",")[0]);
          setUniName(r.data?.results[0]?.formatted_address);
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  // console.log("GPS = ", location);
  return (
    <Box style={styles.wrapper}>
      <HStack margin={3} alignItems="center">
        <Text style={styles.head}>Current Location </Text>
        <Text style={styles.currentLocation}>{uniName} </Text>
        {/* <Pressable android_ripple={{ color: "#ccc", borderless: true }}>
          <Feather name="chevron-down" size={24} color="#A0A0A0" />
        </Pressable> */}
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
