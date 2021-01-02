import { basePath } from "./config";

export function signUpApi(data) {
    const { name, lastname, email, password, repeatPassword } = data;
    const url = `${basePath}/users/sign-up`;//recorda siempre modificar el ip , a donde lo desplegue...
    const params = {
        method: "POST",
        body: JSON.stringify({ name, lastname, email, password, repeatPassword }),
        headers: {
            "Content-Type": "application/json"
        },
    };

    return fetch(url, params).then(response => {

        return response.json();
    })
        .then(result => {
            //console.log(result.user);
            if (result.user) {
                return { ok: true, message: "Usuario creado correctamente", user: result.user };
            }
            return { ok: false, message: result.message };
        })
        .catch(err => {
            return { ok: false, message: err.message };
        });
}

export function loginApi(data) {
    const { email, password } = data;
    const url = `${basePath}/users/login`;

    const params = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        },
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        }).then(result => {
            return result;
        })
        .catch(err => {
            return ({ message: err.message });
        });
}