const githubForm = document.getElementById("github-form");
const inputName = document.getElementById("githubname");
const clearLastSearchedButton = document.getElementById("clear-last-users");
const lastSearched = document.getElementById("lastSearch");

const github = new Github();
const ui = new UI();


eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastSearchedButton.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){
    const username = inputName.value.trim();    // olası boşluk durumlarının önüne geçmek için .trim kullandık   
    
    if (username === "") {
        // Hata
        ui.displayMessages("danger","Lütfen bir kullanıcı adı girin!");
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found"){
                // kullanıcı bulunamadı
                ui.displayMessages("secondary","Kullanıcı bulunamadı. Lütfen geçerli bir kullanıcı adı girin!");
            }
            else {  // başarılı
                ui.addSearchedUserToUI(username);           // BU FONKSİYONU STORAGE'A EKLEME FONKSİYONUNDAN ÖNCE KULLANMALIYIZ.
                Storage.addSearchedUsersToStorage(username); // ÇÜNKÜ, STORAGE'A EKLEDİKTEN SONRA, ARRAY İÇERİSİNDE BULUNACAĞINDAN ARAYÜZE EKLEME YAPMAYACAKTIR.
                ui.showUsersInfo(response.user);
                ui.showReposInfo(response.repo);
                ui.displayMessages("success","Kullanıcı bulundu ve eklendi!");
            }
        })
        .catch(err => ui.displayMessages("danger",err));
    }
    ui.clearInput();    // input temizleme
    e.preventDefault();     // sayfa yenilememe
}

function clearAllSearched(){    // tüm arananları temizleme
    if (confirm("Emin misiniz?")) {
    ui.clearAllSearchedFromUI();
    Storage.clearAllSearchedUsersFromStorage();
    }
}

function getAllSearched(){      // sayfa yenilendiğinde storage'dan son aramaları getirme
    ui.loadLastSearchedFromStorageToUI();
}