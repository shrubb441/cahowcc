// API endpoint for single job

export async function onRequestGet(context) {
  try {
    const id = context.params.id;

    const { results } = await context.env.DB.prepare(
      'SELECT * FROM jobs WHERE id = ?'
    ).bind(id).all();

    if (results.length === 0) {
      return new Response(JSON.stringify({ error: 'Job not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(results[0]), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
