import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Assuming you have this file

const Header = () => {
  const randomUserImageUri = `https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(
    Math.random() * 100
  )}.jpg`;

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{ uri: randomUserImageUri }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userNameText}>John Due</Text>
        </View>
      </View>

      <Ionicons name="notifications-outline" size={24} color={Colors.black} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 15,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Fully rounded image
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column", // Places Welcome and Username in a column
  },
  welcomeText: {
    fontSize: 15,
    color: "#555",
  },
  userNameText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginTop: 3,
  },
});
