import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // To use an icon for the search

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-outline"
        size={24}
        color="#888"
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 13,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#E4E4E4",
  },
});
