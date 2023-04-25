import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: `${process.env.PAYLOAD_HOST}/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': '*'
  }
})

export default api;

export async function getBuilds() {
  const query = {
    status: {
      equals: "published"
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  try {
    return (await api.get(`builds${stringifiedQuery}`)).data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export async function getBuild(slug) {
  const query = {
    slug: {
      equals: slug
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  try {
    return (await api.get(`builds${stringifiedQuery}`)).data
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getMedia() {
  try {
    return (await api.get("media")).data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// TODO: Update to use stringified query instead of filtering
export async function getFeaturedPosts() {
  /*
  const query = {
    "tags.name": {
      contains: "Featured Build",
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  */
  try {
    //return (await api.get(`builds${stringifiedQuery}`)).data;
    return (await api.get("builds")).data.docs.filter(
      (build) => build.tags.map(
        tag => tag.name.toLowerCase()
      ).indexOf("featured build") > -1);
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getPages() {
  try {
    return (await api.get("pages")).data;
  } catch (err) {
    console.log(err);
    return err;
  }
}


// TODO: Update to use stringified query instead of filtering
export async function getPage(title) {
  /*
  const query = {
    id: {
      like: title,
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  */
  try {
    //return (await api.get(`pages${stringifiedQuery}`)).data;
    return (await getPages()).docs.find((page) => page.title.toLowerCase() === title.toLowerCase());
  } catch (err) {
    console.log(err);
    return err;
  }
}