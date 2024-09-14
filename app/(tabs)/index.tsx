import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "./../../types/index";
import BreakingNews from "@/components/BreakingNews";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=pub_5345115aa8f90d8487470e274a960dbb9e8cb&country=lk&language=en&category=health,lifestyle,politics,sports,technology &image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      <BreakingNews newsList={breakingNews} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  breakingNewsContainer: {
    paddingVertical: 10,
  },
  breakingNewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  newsList: {
    paddingLeft: 10,
  },
  newsItem: {
    position: "relative", // Make the text container absolute
    marginRight: 10, // Margin to space out items in horizontal scroll
  },
  newsImage: {
    width: 300, // Set to a specific width or use `flex: 1` if you want it to fill the container
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    position: "absolute", // Position text on top of the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background for better text visibility
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
