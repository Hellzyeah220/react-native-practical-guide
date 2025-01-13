import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions
} from 'expo-image-picker';

import OutlinedButton from '../UI/OutlinedButton';

import { Colors } from '../../constants/colors';

const ImagePicker = ({ onTakeImage }) => {
  const [permissionInformation, requestPermission] = useCameraPermissions();

  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    if (permissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions.',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const cameraResponse = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    if (cameraResponse?.assets) {
      console.log(cameraResponse.assets[0]);
      setPickedImage(cameraResponse.assets[0].uri);
      onTakeImage(cameraResponse.assets[0].uri);
    }
  };

  let imagePreview = <Text>No image taken yet...</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      {/* <Button title='Take Image' onPress={takeImageHandler} /> */}
      <OutlinedButton icon='camera' onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    justifyContent: 'center',
    alignItems: 'center',
    with: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
    // borderRadius: 4
  }
});

export default ImagePicker;
