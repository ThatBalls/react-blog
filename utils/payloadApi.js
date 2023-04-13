import axios from "axios";
import qs from "qs";

const api = axios.create({
    baseURL: "http://localhost:3001/api",
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