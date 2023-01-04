// Select where profile info will appear
const overview = document.querySelector('.overview');
// Select where the repos will go
const repoList = document.querySelector('.repo-list');
// select repos
const allRepoInfo = document.querySelector('.repos');
// select individual repo
const repoData = document.querySelector('.repo-data');

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
};

getInfo();


const getRepos = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const data = await res.json();
    displayRepos(data);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoLi = document.createElement('li');
        repoLi.classList.add('repo');
        repoLi.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoLi)
    }
};

repoList.addEventListener('click', function (e) {
    if (e.target.matches('h3')) {
        let repoName = e.target.innerText;
        singleRepoData(repoName);
    }
});

singleRepoData = async function (repoName) {
    const res = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await res.json();
    // console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
}

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = '';
    const repoDiv = document.createElement('div');
    repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(repoDiv)
    repoData.classList.remove('hide');
    allRepoInfo.classList.add('hide');
}