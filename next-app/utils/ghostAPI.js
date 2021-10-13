import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: 'https://dire-dice-ghost.herokuapp.com',
  key: 'ff248a91e1538cb754165b35be',
  version: "v3"
});

export default api;

export async function getSettings() {
  return await api.settings.browse()
    .catch(err => {
      console.error(err);
    });
};

export async function getPage( pageSlug ) {
  return await api.pages
    .read({
      slug: pageSlug
    });
};

export async function getBuilds() {
  return await api.posts
    .browse({
      filter: 'tag:Builds'
    })
    .catch(err => {
      console.error(err);
    });
};

export async function readBuild(slug) {
  return await api.posts
    .read({
      slug
    })
    .catch(err => {
      console.error(err);
    });
};

export async function getFeaturedPosts() {
  return await api.posts
    .browse({
      filter: 'featured:true',
      include: 'tags'
    })
    .catch(err => {
      console.error(err);
    });
};