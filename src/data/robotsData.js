import MojoJojo from '../assets/images/robot-mojojojo.webp';
import MrPoopybutthole from '../assets/images/robot-mrpoppybutthole.webp';
import TheDoofWarrior from '../assets/images/robot-thedoofwarrior.webp';
import Bean from '../assets/images/robot-bean.webp';
import Bender from '../assets/images/robot-bender.webp';
import Goku from '../assets/images/robot-goku.webp';
import Meliodas from '../assets/images/robot-meliodas.webp';
import Raiden from '../assets/images/robot-raiden.webp';
import Sentinel from '../assets/images/robot-sentinel.webp';

const robotsData = [
  {
    id: 1,
    name: 'Mojo Jojo',
    origin: 'The Powerpuff Girls',
    picture: MojoJojo,
    hasBeenFound: false,
  },
  {
    id: 2,
    name: 'Mr. Poppybutthole',
    origin: 'Rick & Morty',
    picture: MrPoopybutthole,
    hasBeenFound: false,
  },
  {
    id: 3,
    name: 'The Doof Warrior',
    origin: 'Mad Max: Fury Road',
    picture: TheDoofWarrior,
    hasBeenFound: false,
  },
  {
    id: 4,
    name: 'Bean',
    origin: 'Disenchantment',
    picture: Bean,
    hasBeenFound: false,
  },
  {
    id: 5,
    name: 'Bender',
    origin: 'Futurama',
    picture: Bender,
    hasBeenFound: false,
  },
  {
    id: 6,
    name: 'Goku',
    origin: 'Dragon Ball',
    picture: Goku,
    hasBeenFound: false,
  },
  {
    id: 7,
    name: 'Meliodas',
    origin: 'Nanatsu no Taizai',
    picture: Meliodas,
    hasBeenFound: false,
  },
  {
    id: 8,
    name: 'Raiden',
    origin: 'Mortal Kombat',
    picture: Raiden,
    hasBeenFound: false,
  },
  {
    id: 9,
    name: 'Sentinel',
    origin: 'The Matrix',
    picture: Sentinel,
    hasBeenFound: false,
  },
];

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomRobots = () => {
  const robotIndexes = new Set();
  // Get 3 different random indexes
  while (robotIndexes.size < 3) {
    robotIndexes.add(getRandomNumber(0, robotsData.length - 1));
  }
  const robots = [];
  robotIndexes.forEach((index) => {
    robots.push(robotsData[index]);
  });
  return robots;
};

export default getRandomRobots;
