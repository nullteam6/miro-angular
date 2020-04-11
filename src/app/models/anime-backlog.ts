import { Anime } from './anime';

export class AnimeBacklog {
  id: number;
  backlist: Anime[];
  inProgList: Anime[];
  finishedList: Anime[];
  droppedList: Anime[];
}
