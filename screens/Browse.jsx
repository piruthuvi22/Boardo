import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Box,
  Text,
  HStack,
  Pressable,
  VStack,
  FormControl,
  Input,
  ScrollView,
  Fab,
  Icon,
} from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
import { Client } from "@googlemaps/google-maps-services-js";
import BrowseCard from "../components/BrowseCard";
import AutoComplete from "../components/AutoComplete";

import { Feather, Entypo } from "@expo/vector-icons";

const Map = ({ navigation }) => {
  const [uniLocation, setUniLocation] = useState({});
  const handlePlaceSelected = (details) => {
    // fetch("");
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setUniLocation(position);
    console.log("Position==", position);
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
        <Text style={styles.currentLocation}>Moratuwa </Text>
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
