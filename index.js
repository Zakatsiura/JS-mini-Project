// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
//
//
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)




fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const usersDiv = document.getElementById('users');

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-block');
            userDiv.innerHTML = `<h2>${user.name}</h2><p>ID: ${user.id}</p><button class="btn-more" onclick="goToDetails(${user.id})">get more details</button>`;
            usersDiv.appendChild(userDiv);
        });
    })
    .catch(error => console.error(error));


function goToDetails(userId) {
    window.location.href = `user-details.html?id=${userId}`;
}

const userDetails = document.getElementById("user-details");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

if (userId) {

    fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((user) => {
            const userTable = document.createElement("table");

            const tableRow = (key, value) => {
                const row = document.createElement("tr");
                const keyCell = document.createElement("td");
                keyCell.textContent = `${key} : `;
                row.appendChild(keyCell);
                const valueCell = document.createElement("td");
                    if (typeof value === "object" && value !== null) {
                        valueCell.appendChild(table(value));
                    } else {
                        valueCell.textContent = value;
                    }
                    row.appendChild(valueCell);
                    return row;
                };
                const table = (object) => {
                    const table = document.createElement("table");
                    Object.entries(object).forEach(([key, value]) => {
                        table.appendChild(tableRow(key, value));
                    });
                    return table;
                };
                Object.entries(user).forEach(([key, value]) => {
                    const row = tableRow(key, value);
                    userTable.appendChild(row);
                });
                userDetails.appendChild(userTable);
            })
        .catch((error) => console.error(error));
}



function showUserPosts() {
    const userPostsDiv = document.getElementById('user-posts');
    userPostsDiv.innerHTML = '';

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post-block');
                const postTitleDiv = document.createElement('div');
                const postDetailsBtn = document.createElement('button');
                postTitleDiv.innerHTML = `<p>${post.title.toUpperCase()}</p>`;
                postDetailsBtn.innerHTML = 'View post details';
                postDetailsBtn.classList.add('btn-post-details')
                postDetailsBtn.onclick = () => {
                    window.location.href = `post-details.html?id=${post.id}`;
                };
                postDiv.appendChild(postTitleDiv);
                postDiv.appendChild(postDetailsBtn);
                userPostsDiv.appendChild(postDiv);
            });
        });
}

const postId = urlParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        const postDiv = document.getElementById('post-details');
        postDiv.innerHTML = `<h2>${post.title.toUpperCase()}</h2><p>Post ID: ${post.id}</p><p>${post.body}</p>`;
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
        const commentsList = document.getElementById('comments-list');
        comments.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.innerHTML = `<p><strong>Title: ${comment.name}</strong></p><p><i>Comment ID: ${comment.id}</p><p>E-mail: ${comment.email}</i></p><p>${comment.body}</p>`;
            commentsList.appendChild(commentItem);
        });
    });