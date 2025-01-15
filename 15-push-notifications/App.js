import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async notification => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

export default App = () => {
  const scheduleNotificationHandler = async () => {
    const isAllowed = await allowsNotificationsAsync();
    if (!isAllowed) {
      const request = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true
        }
      });
      if (request.status !== Notifications.PermissionStatus.GRANTED) {
        return;
      }
    }

    try {
      const result = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'My first local notification',
          body: 'This is the body of the notification',
          data: { userName: 'Test' }
        },
        trigger: {
          seconds: 5,
          repeats: false
        }
      });
      console.log('NOTIFICATION RESULT: ', result);
    } catch (error) {
      console.log('ERROR IN NOTIFICATION.');
      console.log(error);
    }
  };

  const sendPushNotificationHandler = async () => {
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'ExponentPushToken[]',
          title: 'Test -- sent from a device !',
          body: 'This is a test !'
        })
      });

      const data = await response.json();
      console.log('PUSH DATA: ', data);
    } catch (error) {
      console.log('ERROR IN PUSH: ', error);
    }
  };

  useEffect(() => {
    const initAsync = async () => {
      const isAllowed = allowsNotificationsAsync();
      if (!isAllowed) {
        const request = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true
          }
        });
        if (request.status !== Notifications.PermissionStatus.GRANTED) {
          return;
        }
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        console.log('PROJECT ID: ', projectId);
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        console.log('PUSH TOKEN DATA: ', pushTokenData);

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT
          });
        }
      } catch (error) {
        console.log('TOKEN ERROR: ', error);
      }
    };
    initAsync();
  }, []);

  useEffect(() => {
    const recSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log('NOTIFICATION RECEIVED.');
        console.log(notification);
        console.log('DATA: ', notification.request.content.data);
      }
    );

    const respSubscription =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('NOTIFICATION RESPONSE RECEIVED');
        console.log(response);
        console.log('DATA: ', response.notification.request.content.data);
      });

    return () => {
      recSubscription.remove();
      respSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title='Send Push Notification'
        onPress={sendPushNotificationHandler}
      />
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
