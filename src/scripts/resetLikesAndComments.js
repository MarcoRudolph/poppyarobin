const { db } = require('../drizzle');
const {
  kommentare,
  userLikes,
  commentLikes,
  vorschlaege,
} = require('../drizzle/schema');

async function resetLikesAndComments() {
  await db.delete(commentLikes);
  await db.delete(userLikes);
  await db.delete(kommentare);
  await db.update(vorschlaege).set({ likes: 0, comments: 0 });
  console.log('Alle Likes und Kommentare wurden zurückgesetzt.');
}

resetLikesAndComments().then(() => process.exit(0));
