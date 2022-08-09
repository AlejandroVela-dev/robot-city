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
  // Prepare query for top scores (5 by default)
  const scoresRef = collection(dbFirestore, 'scores');
  const scoresQuery = query(
    scoresRef,
    orderBy('playerTime', 'asc'),
    limit(queryLimit)
  );

  // Fetch scores and handle errors
  const scoresSnapshot = await getDocs(scoresQuery).catch((error) => {
    console.error('Error reading documents from database: ', error);
  });
  if (!scoresSnapshot) return;

  // Process and return data as array of objects {id, playerName, playerTime}
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
  const scoresRef = collection(dbFirestore, 'scores');
  const scoreDoc = await addDoc(scoresRef, score).catch((error) => {
    console.error('Error adding document to database: ', error);
  });
  return scoreDoc; // Undefined if error was thrown from await;
};

export const getRobotCoords = async (robotId) => {
  const robotRef = doc(dbFirestore, 'robots', `${robotId}`);
  const robotSnapshot = await getDoc(robotRef).catch((error) => {
    console.error(
      `Error reading document with ID ${robotId} from database: `,
      error
    );
  });
  return robotSnapshot.data(); // Undefined if document (robotSnapshot) doesn't exist
};
