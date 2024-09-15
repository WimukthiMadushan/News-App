import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "./../../types/index";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [News, setNews] = useState<NewsDataType[]>([]);
  const [isBreakingNewsLoading, setIsBreakingNewsLoading] = useState(true);
  const [isNewsListLoading, setIsNewsListLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=pub_5345115aa8f90d8487470e274a960dbb9e8cb&language=en&category=health,lifestyle,politics,sports,technology&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsBreakingNewsLoading(false);
    }
  };

  const getNews = async (category: string = "") => {
    setIsNewsListLoading(true);
    try {
      let categoryList = "";
      if (category.length !== 0) {
        categoryList = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=pub_5345115aa8f90d8487470e274a960dbb9e8cb&language=en&image=1&removeduplicate=1&size=10${categoryList}`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsNewsListLoading(false);
    }
  };

  const onCatChange = (category: string) => {
    setNews([]);
    getNews(category);
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />

      {/* Breaking News Section */}
      {isBreakingNewsLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}

      {/* Categories Section */}
      <Categories onCategoryChange={onCatChange} />

      {/* News List Section */}
      {isNewsListLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <NewsList newsList={News} />
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});
