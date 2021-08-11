import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {ILHospitalBG} from '../../assets/illustration';
import {fonts, colors} from '../../utils';
import {NewsItem} from '../../components';
import {Fire} from '../../config';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const Informasi = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, [navigation]);

  const getNews = () => {
    Fire.database()
      .ref('puskesmas/tambakaji/news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Informasi Terkini</Text>
        <Text style={styles.desc}>Seputar kesehatan</Text>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {news.map(item => {
            return (
              <NewsItem
                key={`news-${item.id}`}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          {news.map(item => {
            return (
              <NewsItem
                key={`news-${item.id}`}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          {news.map(item => {
            return (
              <NewsItem
                key={`news-${item.id}`}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Informasi;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -40,
    paddingTop: 14,
  },
});
