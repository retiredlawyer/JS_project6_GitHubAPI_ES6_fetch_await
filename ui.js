class UI {

    constructor() {
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.input = document.getElementById("githubname");
        this.cardBody = document.querySelector(".card-body");
    }

    clearInput(){       // input temizleme
        this.input.value = "";
    }

    showUsersInfo(user){    // template literal ile HTML <div> ekleyip dinamik hale getireceğiz
        this.profileDiv.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                        <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                        <hr>
                        <div id="fullName"><strong>${user.name}</strong></div>
                        <hr>
                        <div id="bio">${user.bio}</div>
                    </div>
                    <div class="col-md-8">
                        <button class="btn btn-secondary">
                            Takipçi  <span class="badge badge-light">${user.followers}</span>
                        </button>
                        <button class="btn btn-info">
                            Takip Edilen  <span class="badge badge-light">${user.following}</span>
                        </button>
                        <button class="btn btn-danger">
                            Repolar  <span class="badge badge-light">${user.public_repos}</span>
                        </button>
                        <hr>
                        <li class="list-group">
                            <li class="list-group-item borderzero">
                                <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/mail.png" width="30px"> <span id="mail">${user.email}</span>
                            </li>
                            <li class="list-group-item borderzero">
                                <img src="images/blog.png" width="30px"> <span id="mail">${user.blog}</span>
                            </li>
                        </li>
                    </div>              
                </div>  
            </div>
        `;
    }

    showReposInfo(repos){
        this.repoDiv.innerHTML = "";
        repos.forEach(repo => {
            this.repoDiv.innerHTML +=  `
            <div class="mb-2 card-body">
                <div class="row">
                    <div class="col-md-2">
                        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-secondary">
                            Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                        </button>

                        <button class="btn btn-info">
                            Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks}</span>
                        </button>   
                    </div>
                </div>
            </div>
        `;
        });
    }

    displayMessages(messagetype,messagetext){
        const div = document.createElement("div");
        div.className = `alert alert-${messagetype}`;
        div.role = "alert";
        div.textContent = messagetext;
        this.cardBody.appendChild(div);

        setTimeout(() => {
           div.remove();
        }, 1500);
    }

    addSearchedUserToUI(newUser){
        let users = Storage.getSearchedUsersFromStorage();  // Storage'dan array'i aldık
        if (users.indexOf(newUser) === -1) {    // eğer array'in içerisinde yoksa, element ekleme işlemlerimizi yap dedik.
            //  <li class="list-group-item"></li>
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = newUser;
            this.lastUsers.appendChild(li);
        }   // olumsuz else durumunu kontrol etmeye gerek yok.
    }

    loadLastSearchedFromStorageToUI(){
        let lastSearched = Storage.getSearchedUsersFromStorage();
        /*
        lastSearched.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = user;

            this.lastUsers.appendChild(li);
        })  */

        // BAŞKA BİR YÖNTEMLE DE EKLEYEBİLİRİZ.

        let result = "";                    // boş bir string oluşturduk.
        lastSearched.forEach(user => {      // += ile her array elemanını ekleyecek.
            result += `<li class="list-group-item">${user}</li>`;
        });
        this.lastUsers.innerHTML = result;  // ve inner HTML'ini güncelledik.

    }

    clearAllSearchedFromUI(){
        while (this.lastUsers.firstElementChild !== null) {
            this.lastUsers.firstElementChild.remove();
        }
        while (this.profileDiv.firstElementChild !== null) {
            this.profileDiv.firstElementChild.remove();
        }
        while (this.repoDiv.firstElementChild !== null) {
            this.repoDiv.firstElementChild.remove();
        }
    }
}