import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <MaterialIcons name="flip-camera-ios" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.takePictureButton}
            onPress={async () => {
              if (cameraRef) {
                const photo = await cameraRef.takePictureAsync();
                console.log(photo.uri);
                navigation.navigate("Translator", { imageUri: photo.uri });
              }
            }}
          >
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    display: "flex",
    margin: 20,
    width: "50%",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  outerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
});

export default CameraScreen;
