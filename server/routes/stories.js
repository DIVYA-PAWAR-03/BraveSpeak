import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET /api/stories - List stories with search and category filtering
router.get('/', (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = `
      SELECT s.*, 
        (SELECT COUNT(*) FROM comments c WHERE c.story_id = s.id) as comment_count 
      FROM stories s
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'All') {
      query += ` AND s.category = ?`;
      params.push(category);
    }

    if (search && search.trim() !== '') {
      query += ` AND (s.title LIKE ? OR s.description LIKE ? OR s.author LIKE ?)`;
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    if (sort === 'likes') {
      query += ` ORDER BY s.likes DESC, s.created_at DESC`;
    } else {
      query += ` ORDER BY s.created_at DESC, s.id DESC`;
    }

    const stories = db.prepare(query).all(...params);
    res.json({ success: true, count: stories.length, data: stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stories' });
  }
});

// GET /api/stories/:id - Get single story with its comments
router.get('/:id', (req, res) => {
  try {
    const storyId = Number(req.params.id);
    const story = db.prepare(`SELECT * FROM stories WHERE id = ?`).get(storyId);

    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const comments = db.prepare(`
      SELECT * FROM comments WHERE story_id = ? ORDER BY created_at DESC
    `).all(storyId);

    res.json({
      success: true,
      data: {
        ...story,
        comments
      }
    });
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch story' });
  }
});

// POST /api/stories - Share a new story
router.post('/', (req, res) => {
  try {
    const { title, category, description, author, is_anonymous } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const finalAuthor = is_anonymous ? 'Anonymous' : (author?.trim() || 'Anonymous Survivor');
    const wordCount = description.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

    const randomImages = [
      '/images/news_3.jpg',
      '/images/news_4.jpeg',
      '/images/news_6.png',
      '/images/news_7.png',
      '/images/news_8.png',
      '/images/news_9.png',
      '/images/news_10.webp',
      '/images/news_11.webp'
    ];
    const image_url = randomImages[Math.floor(Math.random() * randomImages.length)];

    const stmt = db.prepare(`
      INSERT INTO stories (title, category, description, author, is_anonymous, read_time, likes, image_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, datetime('now'))
    `);

    const info = stmt.run(
      title.trim(),
      category || 'Workplace Courage',
      description.trim(),
      finalAuthor,
      is_anonymous ? 1 : 0,
      readTime,
      image_url
    );

    const newStory = db.prepare(`SELECT * FROM stories WHERE id = ?`).get(info.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: 'Story published successfully to the safe space',
      data: newStory
    });
  } catch (error) {
    console.error('Error creating story:', error);
    res.status(500).json({ success: false, message: 'Failed to publish story' });
  }
});

// POST /api/stories/:id/like - Like or support a story
router.post('/:id/like', (req, res) => {
  try {
    const storyId = Number(req.params.id);
    const update = db.prepare(`UPDATE stories SET likes = likes + 1 WHERE id = ?`).run(storyId);

    if (update.changes === 0) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const story = db.prepare(`SELECT id, likes FROM stories WHERE id = ?`).get(storyId);
    res.json({ success: true, likes: story.likes });
  } catch (error) {
    console.error('Error liking story:', error);
    res.status(500).json({ success: false, message: 'Failed to update likes' });
  }
});

// GET /api/stories/:id/comments - Get comments for a story
router.get('/:id/comments', (req, res) => {
  try {
    const storyId = Number(req.params.id);
    const comments = db.prepare(`
      SELECT * FROM comments WHERE story_id = ? ORDER BY created_at DESC
    `).all(storyId);

    res.json({ success: true, data: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
});

// POST /api/stories/:id/comments - Add supportive comment to a story
router.post('/:id/comments', (req, res) => {
  try {
    const storyId = Number(req.params.id);
    const { author, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Comment content cannot be empty' });
    }

    const storyExists = db.prepare(`SELECT id FROM stories WHERE id = ?`).get(storyId);
    if (!storyExists) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    const stmt = db.prepare(`
      INSERT INTO comments (story_id, author, content, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `);

    const info = stmt.run(
      storyId,
      author?.trim() || 'Supporter',
      content.trim()
    );

    const comment = db.prepare(`SELECT * FROM comments WHERE id = ?`).get(info.lastInsertRowid);
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Failed to post comment' });
  }
});

export default router;
