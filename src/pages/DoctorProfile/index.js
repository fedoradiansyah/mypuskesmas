import React from 'react';
import {StyleSheet, View, ScrollView, RefreshControl} from 'react-native';
import {Button, Header, Profile, ProfileItem, Gap} from '../../components';
import {colors} from '../../utils';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const DoctorProfile = ({navigation, route}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dataDoctor = route.params;
  return (
    <View style={styles.page}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <Header title="Profile" onPress={() => navigation.goBack()} />

        <Profile
          name={dataDoctor.data.fullName}
          desc={dataDoctor.data.profession}
          photo={{uri: dataDoctor.data.photo}}
        />
        <Gap height={10} />
        <ProfileItem label="Alumnus" value={dataDoctor.data.university} />
        <ProfileItem
          label="Tempat Praktik"
          value={dataDoctor.data.hospital_address}
        />
        <ProfileItem label="No. STR" value={dataDoctor.data.str_number} />
        <View style={styles.action}>
          <Button
            title="Mulai Konsultasi"
            onPress={() => navigation.navigate('Chatting', dataDoctor)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  action: {paddingHorizontal: 40, paddingTop: 23},
});
