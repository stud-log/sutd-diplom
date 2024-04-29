import { UserReaction } from "@stud-log/news-types/models";

export const groupedReactions = (reactions: UserReaction[]) => reactions.reduce((groups, reaction) => {
  const { type } = reaction;
  if (!groups[type]) {
    groups[type] = [];
  }
  groups[type].push(reaction);
  return groups;
}, {} as { [type: string]: UserReaction[] });