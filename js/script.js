// Select where profile info will appear
const overview = document.querySelector('.overview');
// Select where the repos will go
const repoList = document.querySelector('.repo-list');

const username = 'goodman2814';

// collect user data from GitHub
const getInfo = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}`
    );
    const info = await res.json();
    displayInfo(info);
};

const displayInfo = function (info) {
    const div = document.createElement('div');
    div.classList.add("user-info")
    div.innerHTML = `<figure>
                        <img alt="user avatar" src=${info.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${info.name}</p>
                        <p><strong>Bio:</strong> ${info.bio}</p>
                        <p><strong>Location:</strong> ${info.location}</p>
                        <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
                    </div>`
    overview.append(div)
    getRepos();
}

getInfo();


const getRepos = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const data = await res.json();
    displayRepos(data);
}

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoLi = document.createElement('li');
        repoLi.classList.add('repo');
        repoLi.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoLi)
    }
}