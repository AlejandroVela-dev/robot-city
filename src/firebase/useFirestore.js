import dbFirestore from './config';
import {
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  doc,
} from 'firebase/firestore';

export const getScores = async (queryLimit = 5) => {
  // Prepare query
  const scoresRef = collection(dbFirestore, 'scores');
  const scoresQuery = query(
    scoresRef,
    orderBy('playerTime', 'asc'),
    limit(queryLimit)
  );

  // Fetch data and handle errors
  const scoresSnapshot = await getDocs(scoresQuery).catch((error) => {
    console.error('Error while reading document from database: ', error);
  });
  if (!scoresSnapshot) return;

  // Process and return data
  let scores = [];
  scoresSnapshot.forEach((score) => {
    scores.push({
      id: score.id,
      ...score.data(),
    });
  });
  return scores;
};

export const addScore = async (score) => {
  // Add data and handle errors
  const scoreDoc = await addDoc(collection(dbFirestore, 'scores'), score).catch(
    (error) => {
      console.error('Error while adding document to database: ', error);
    }
  );
  if (!scoreDoc) return;

  // Return data
  return scoreDoc;
};

export const getRobotCoords = async (robotId) => {
  // Prepare query
  const robotRef = doc(dbFirestore, 'robots', `${robotId}`);
  const robotSnapshot = await getDoc(robotRef).catch((error) => {
    console.error('Error while reading document from database: ', error);
  });
  if (!robotSnapshot) return;

  // Return data
  return robotSnapshot.data();
};
