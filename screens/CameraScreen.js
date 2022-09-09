import react, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const HomeScreen = (props) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;
