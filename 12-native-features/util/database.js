import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place.model';

let database;

export const init = async () => {
  if (!database) {
    database = await SQLite.openDatabaseAsync('places.db');
  }

  if (database) {
    console.log(database);
    return await database.getAllAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`
    );
  }
};

export const insertPlace = async place => {
  if (database) {
    return await database.getAllAsync(
      `INSERT INTO places (title, imageUrl, address, lat, lng)
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        place.title,
        place.imageUrl,
        place.address,
        place.location.lat,
        place.location.lng
      ]
    );
  }
};

export const fetchPlaces = async () => {
  if (database) {
    const places = [];

    const resultData = await database.getAllAsync(`SELECT * FROM places`);
    for (const dp of resultData) {
      places.push(
        new Place(
          dp.title,
          dp.imageUrl,
          {
            address: dp.address,
            lat: dp.lat,
            lng: dp.lng
          },
          dp.Id
        )
      );
    }
    return places;
  }
};

export const fetchPlace = async id => {
  let place;
  if (database) {
    const results = await database.getAllAsync(
      'SELECT * FROM places WHERE Id = ?',
      [id]
    );
    if (results && results.length > 0) {
      // place = results[0];
      place = new Place(
        results[0].title,
        results[0].imageUrl,
        {
          address: results[0].address,
          lat: results[0].lat,
          lng: results[0].lng
        },
        results[0].Id
      );
    }
  }

  return place;
};
