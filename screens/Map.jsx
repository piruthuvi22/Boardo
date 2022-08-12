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
} from "native-base";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("window");
import { Client } from "@googlemaps/google-maps-services-js";

import AutoComplete from "../components/AutoComplete";

import { Feather, FontAwesome } from "@expo/vector-icons";

const aspectRatio = width / height;
const latitudeDelta = 6;
const longitudeDelta = latitudeDelta * aspectRatio;

const initialPosition = {
  latitude: 7.873592,
  longitude: 80.773137,
  latitudeDelta: latitudeDelta,
  longitudeDelta: longitudeDelta,
};
const client = new Client({});

const Map = ({ navigation }) => {
  const [uniLocation, setUniLocation] = useState({
    latitude: 6.795127600000001,
    longitude: 79.90086699999999,
  });
  const [distance, setDistance] = useState({});
  const [markers, setMarkers] = useState([
    {
      title: "Place 2",
      latitude: 6.836652,
      longitude: 79.86734,
    },
    {
      title: "Place 1",
      latitude: 6.795938,
      longitude: 79.897311,
    },
  ]);
  const mapRef = useRef("");

  useEffect(() => {
    uniLocation.hasOwnProperty("latitude") &&
      client
        .distancematrix({
          params: {
            key: "AIzaSyC7UEErM9uNLXfGOviKE5FOymLpMNcvpyI",
            origins: [uniLocation],
            destinations: [markers[0], markers[1]],
          },
        })
        .then((r) => {
          // console.log(distance.rows[0]);

          setDistance(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [uniLocation]);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      camera.zoom = 15;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  const handlePlaceSelected = (details) => {
    // fetch("");
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    // console.log("Dis==", position);
    setUniLocation(position);
    moveTo(position);
  };
  // console.log("================================", distance);

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
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialPosition}
        >
          {uniLocation.hasOwnProperty("latitude") && (
            <Marker
              coordinate={uniLocation}
              key={uniLocation.latitude}
              // title={marker.title}
              // description="desc"
              pinColor="#FD683D"
              flat={true}
              style={{ width: 5, height: 5 }}
              onPress={() => console.log("marker")}
            />
          )}
          {markers.map((marker, i) => {
            return marker.hasOwnProperty("latitude") ? (
              <Marker
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                key={marker.latitude}
                title={markers[i].title}
                description={
                  distance.hasOwnProperty("destination_addresses")
                    ? distance?.rows[0].elements[i].distance.text +
                      distance?.rows[0].elements[i].duration.text
                    : ""
                }
                pinColor="#0000ff"
                flat={true}
                style={{ width: 5, height: 5 }}
                icon={require("../assets/images/marker.png")}
                onPress={() => console.log("marker")}
              />
            ) : null;
          })}
          {markers.map((marker, i) => {
            return (
              <MapViewDirections
                key={marker.latitude}
                origin={marker}
                destination={uniLocation}
                apikey={"AIzaSyC7UEErM9uNLXfGOviKE5FOymLpMNcvpyI"}
                strokeColor={"#FD683D"}
                strokeWidth={3}
              />
            );
          })}
        </MapView>
        <Box style={styles.searchContainer}>
          <AutoComplete
            label={"University"}
            onPlaceSelected={(details) => {
              handlePlaceSelected(details);
            }}
          />
        </Box>
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
    bottom: 150,
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
  },
  input: {
    // borderColor: "red",
    // borderWidth: 2,
  },
});

export default Map;

/**
 title={
distance.hasOwnProperty("destination_addresses")
                    ? markers[i].title + distance?.destination_addresses[i][0]
                    : ""
                }
                
 */
