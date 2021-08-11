import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ILCatUmum,
  ILCatGigi,
  ILCatBidan,
  ILCatPerawat,
  ILCatSanitarian,
  ILCatGizi,
  ILCatPromkes,
  ILCatEpidemiolog,
  ILCatFarmasi,
  ILCatCs,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DoctorCategory = ({category, onPress}) => {
  const Icon = () => {
    if (category === 'Dokter Umum') {
      return <ILCatUmum style={styles.illustration} />;
    }
    if (category === 'Dokter Gigi') {
      return <ILCatGigi style={styles.illustration} />;
    }
    if (category === 'Bidan') {
      return <ILCatBidan style={styles.illustration} />;
    }
    if (category === 'Perawat') {
      return <ILCatPerawat style={styles.illustration} />;
    }
    if (category === 'Sanitarian') {
      return <ILCatSanitarian style={styles.illustration} />;
    }
    if (category === 'Ahli Gizi') {
      return <ILCatGizi style={styles.illustration} />;
    }
    if (category === 'Promosi Kesehatan') {
      return <ILCatPromkes style={styles.illustration} />;
    }
    if (category === 'Epidemiolog') {
      return <ILCatEpidemiolog style={styles.illustration} />;
    }
    if (category === 'Farmasi') {
      return <ILCatFarmasi style={styles.illustration} />;
    }
    if (category === 'Customer Service') {
      return <ILCatCs style={styles.illustration} />;
    }
    return <ILCatUmum style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 150,
  },
  illustration: {marginBottom: 15},
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
