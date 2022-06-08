export default async function handler(req, res) {
  if (process.env.NEXT_REVALIDATION_TOKEN) {
    if (
      req.query.secret !== process.env.NEXT_REVALIDATION_TOKEN &&
      req.query.path.length > 0
    ) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    try {
      await res.unstable_revalidate(req.query.path);
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  }
  return res.status(500).send('Revalidation unavailable');
}
