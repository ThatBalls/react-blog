import axios from "axios";
import { get } from "lodash";
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
    return (await api.get(`builds${stringifiedQuery}`)).data.docs;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export async function getBuild(slug) {
  const query = {
    and: [
      {
        slug: {
          equals: slug
        }
      },
      {
        status: {
          equals: "published"
        }
      }
    ]
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  try {
    // This should only have one response
    return (await api.get(`builds${stringifiedQuery}`)).data.docs[0] || null;
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

export async function getFeaturedBuilds() {
  
  const query = {
    and: [
      {
        "tags.name": {
          contains: "Featured Build",
        }
      },
      {
        status: {
          equals: "published"
        }
      }
    ]
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
 
  try {
    return (await api.get(`builds${stringifiedQuery}`)).data.docs;
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

export async function getPage(title) {
  const query = {
    title: {
      like: title,
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
 
  try {
    // Should only have one response
    return (await api.get(`pages${stringifiedQuery}`)).data.docs[0] || null;
  } catch (err) {
    console.log(err);
    return err;
  }
}

// TODO: When we add more tools, get them here instead of just the tools page
export async function getFeaturedTools() {
  try {
    return (await getPage("tools"));
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getBrews() {
  try {
    return (await api.get("brews")).data.docs;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getBrew(slug) {
  const query = {
    slug: {
      equals: slug
    }
  };
  const stringifiedQuery = qs.stringify({
    where: query
  }, { addQueryPrefix: true });
  try {
    // This should only have one response
    return (await api.get(`brews${stringifiedQuery}`)).data.docs[0] || null;
  } catch (err) {
    console.log(err);
    return err;
  }
}