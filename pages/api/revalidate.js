export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
 
  try {
    const category = req.query.category;
    const slug = req.query.slug;
    await res.revalidate('/');
    await res.revalidate(`/${category}`);
    await res.revalidate(`/${category}/${slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}