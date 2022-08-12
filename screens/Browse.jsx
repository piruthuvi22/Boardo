import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import {
  Box,
  Text,
  HStack,
  Pressable,
  ScrollView,
  Fab,
  Icon,
} from "native-base";
import Constants from "expo-constants";
import { Client } from "@googlemaps/google-maps-services-js";
import BrowseCard from "../components/BrowseCard";
import AutoComplete from "../components/AutoComplete";

import { Feather, Entypo } from "@expo/vector-icons";
const client = new Client({});

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uniName, setUniName] = useState("");
  const [uniLocation, setUniLocation] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      });
      let lantlong = {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
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

  const handlePlaceSelected = (details) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setUniLocation(position);
    setUniName(details?.name);
    console.log("Place ==", details.name);
  };

  return (
    <Box style={styles.wrapper}>
      <HStack
        marginX={3}
        marginTop={3}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Text style={styles.head}>Current Location </Text>
        <Text style={styles.currentLocation}>{uniName} </Text>
        <Pressable
          android_ripple={{ color: "#ccc", borderless: true, radius: 20 }}
          onPress={() => navigation.navigate("Browse")}
        >
          <Feather name="chevron-down" size={24} color="#A0A0A0" />
        </Pressable>
      </HStack>

      <Box m={2}>
        <Box style={styles.searchContainer}>
          <AutoComplete
            label={"University"}
            onPlaceSelected={(details) => handlePlaceSelected(details)}
          />
        </Box>
      </Box>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 70 }}
      >
        <BrowseCard />
        <BrowseCard />
        <BrowseCard />
        <BrowseCard />
        <BrowseCard />
        <BrowseCard />
      </ScrollView>
      <Box style={styles.fab}>
        <Fab
          renderInPortal={false}
          onPress={() => navigation.navigate("MapView")}
          style={styles.fabBtn}
          shadow={3}
          placement=""
          icon={<Icon color="#FF754E" as={Entypo} name="location" size="19" />}
        />
      </Box>
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
  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
  },
  fabBtn: {
    backgroundColor: "#223343",
    borderWidth: 1,
    borderColor: "#FF754E",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#eee",
    padding: 5,
    zIndex: 100,
  },
  input: {
    // borderColor: "red",
    // borderWidth: 2,
  },
});

export default Map;
