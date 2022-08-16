const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
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
