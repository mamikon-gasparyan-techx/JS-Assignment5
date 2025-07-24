const url = "https://reqres.in/api/users?delay=1";
const uiText = document.getElementById("ui-text");

async function getUserData(includeHeader) {
  const options = includeHeader
    ? {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      }
    : {};

  const response = await fetch(url, options);
  const userData = await response.json();
  return userData;
}

let btn1 = document.getElementById("include_header");
let btn2 = document.getElementById("omit_header");

async function btn(includeHeader) {
  uiText.textContent = "Loading...";
  console.log("Fetching users...");
  try {
    const user = await getUserData(includeHeader);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(user.data);
    const userNames = user.data.map(
      (fullName) => `${fullName.first_name} ${fullName.last_name}`
    );
    uiText.textContent = "";

    userNames.forEach((name) => {
      const p = document.createElement("p");
      p.textContent = name;
      uiText.appendChild(p);
    });
    console.log("Done.");
  } catch (err) {
    uiText.textContent = "No Users";
  }
}

btn1.addEventListener("click", () => btn(true));
btn2.addEventListener("click", () => btn(false));
