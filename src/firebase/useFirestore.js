import dbFirestore from './config';
import {
  addDoc,
  getDoc,
  collection,
  query,
  orderBy,
  deleteDoc,
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
    // Subscribes to top 5 scores query
    const scoresUnsubscribe = onSnapshot(
      scoresQuery,
      (snapshot) => {
        // Updates scores everytime a new snapshot is available
        const scoresData = snapshot.docs.map((score) => {
          return {
            id: score.id,
            ...score.data(),
          };
        });
        setScores(scoresData);
        // Track score that got removed from top 5 and delete it
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'removed') {
            await deleteScoreById(change.doc.id);
          }
        });
      },
      (error) => {
        console.error('There was an error getting snapshots: ', error);
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

export const deleteScoreById = async (id) => {
  const scoresRef = collection(dbFirestore, 'scores');
  const docRef = doc(scoresRef, `${id}`);
  return await deleteDoc(docRef).catch((error) => {
    console.error('Error removing document from database: ', error);
  });
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
