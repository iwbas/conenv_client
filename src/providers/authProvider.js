import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const authProvider = (httpClient = fetchUtils.fetchJson) => ({
  // authentication
  login: ({ username, password }) => {
    const request = new Request("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
      })
      .catch((err) => {
        throw new Error("Network error");
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      // localStorage.removeItem("auth");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") && cookies.get("token")
      ? Promise.resolve()
      : Promise.reject(),
  logout: () => {
    const request = new Request("/api/auth/signout", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    fetch(request).catch((err) => {
      throw new Error("Network error");
    });

    cookies.remove("token");
    cookies.remove("httpOnlyToken");
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, username } = JSON.parse(
        localStorage.getItem("auth")
      );
      return Promise.resolve({ id, fullName: username });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // authorization
  getPermissions: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log("auth", auth);
    return auth?.role ? Promise.resolve(auth.role) : Promise.reject();
  },
});

export default authProvider;
