import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {Fire} from '../../config';
import {colors, fonts, showError, getData} from '../../utils';
import {ILNullPhoto} from '../../assets';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getTopRatedDoctors = () => {
    Fire.database()
      .ref('puskesmas/tambakaji/doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getCategoryDoctor = () => {
    Fire.database()
      .ref('puskesmas/tambakaji/category_doctor/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Fire.database()
      .ref('global/news/')
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

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.content}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperSection}>
              <Gap height={30} />
              <HomeProfile
                profile={profile}
                onPress={() => navigation.navigate('UserProfile', profile)}
              />
              <Text style={styles.welcome}>
                Mau konsultasi dengan siapa hari ini?
              </Text>
            </View>
            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.category}>
                  <Gap width={32} />
                  {categoryDoctor.map(item => {
                    return (
                      <DoctorCategory
                        key={`category-${item.id}`}
                        category={item.category}
                        onPress={() =>
                          navigation.navigate('ChooseDoctor', item)
                        }
                      />
                    );
                  })}
                  <Gap width={22} />
                </View>
              </ScrollView>
            </View>
            <View style={styles.wrapperSection}>
              <Text style={styles.sectionLabel}>Paling sering</Text>
              {doctors.map(doctor => {
                return (
                  <RatedDoctor
                    key={doctor.id}
                    name={doctor.data.fullName}
                    desc={doctor.data.profession}
                    str={doctor.data.hospital_address}
                    avatar={{uri: doctor.data.photo}}
                    onPress={() => navigation.navigate('DoctorProfile', doctor)}
                  />
                );
              })}
              <Text style={styles.sectionLabel}>Informasi</Text>
            </View>

            <Gap height={30} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {flexDirection: 'row'},
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
