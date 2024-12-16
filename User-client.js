const urlBase = "http://localhost:3000";

async function addUser(user) {
    const response = await fetch(`${urlBase}/User`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response;

}
async function checkUserPassAndEmail(user) {
    const response = await fetch(`${urlBase}/User/${user["Email"]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response;

}
async function updateUser(user) {
    const response = await fetch(urlBase + "/User", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    return response;

}
// async function deleteNote(noteId) {
//     const response = await fetch(urlBase + "/notes/"+noteId, {
//         method : "DELETE",

//     });
//     return response;

// }
async function getPasswordByEmail(emailUser) {
    let url = `${urlBase}/User/${emailUser}`;
    let response = await fetch(url, {
        method: "GET"
    });
    return response.json();

}
async function getEmail(Email) {
    let url = `${urlBase}/User/${Email}`;
    let response = await fetch(url, {
        method: "GET"
    });
    return response.json();

}