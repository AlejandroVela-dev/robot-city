import dbFirestore from './config';
import {
  addDoc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useFirestore = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Prepares query for top 5 scores
    const scoresQuery = query(
      collection(dbFirestore, 'scores'),
      orderBy('playerTime', 'asc'),
      limit(5)
    );
    // Subscribes to Scores and sets updated data when a new snapshot is available
    const scoresUnsubscribe = onSnapshot(
      scoresQuery,
      (snapshot) => {
        const scoresData = snapshot.docs.map((score) => {
          return {
            id: score.id,
            ...score.data(),
          };
        });
        setScores(scoresData);
      },
      (error) => {
        console.error('There was an error reading scores: ', error);
      }
    );
    // Removes listener when component unmounts
    return () => scoresUnsubscribe();
  }, []);

  return [scores];
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
