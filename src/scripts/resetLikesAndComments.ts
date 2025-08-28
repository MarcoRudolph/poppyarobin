const { db } = require('../drizzle');
const {
  kommentare,
  userLikes,
  commentLikes,
  vorschlaege,
} = require('../drizzle/schema');

async function resetLikesAndComments() {
  // Lösche alle Kommentare
  await db.delete(commentLikes);
  await db.delete(userLikes);
  await db.delete(kommentare);

  // Setze alle Likes und Comments in vorschlaege auf 0
  await db.update(vorschlaege).set({ likes: 0, comments: 0 });

  console.log('Alle Likes und Kommentare wurden zurückgesetzt.');
}

resetLikesAndComments().then(() => process.exit(0));
