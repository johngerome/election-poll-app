import { atom } from 'recoil';

type PollResultsStore = {
  updatedAt: Record<string, any>;
};

export const pollResultsStore = atom<PollResultsStore>({
  key: 'PollResultsStore',
  default: {
    updatedAt: {},
  },
});
