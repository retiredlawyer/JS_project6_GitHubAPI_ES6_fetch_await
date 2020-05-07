class Storage {

    static getSearchedUsersFromStorage(){   // Storage'dan tüm kullanıcıları alma

        let users;
        if (localStorage.getItem("searched") === null) {
            users = [];
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }

    static addSearchedUsersToStorage(newUser){  // Storage'a yeni kullanıcı ekleme

        let users = this.getSearchedUsersFromStorage();
        if (users.indexOf(newUser) === -1) {     // indexof methodu ile, aynı değerin array içerisinde birden fazla bulunmasını engelliyoruz
            users.push(newUser);    // sonucun -1 olması, newUser değerinin arrayde olmadığını gösterir.
        }                           // ve .push methodu ile ekleriz. else durumunu kontrol etmemize gerek yok.
        localStorage.setItem("searched",JSON.stringify(users));    // sonra oluşan yeni array'i aynı key ile storage'a göndererek güncelleriz.
    }

    static clearAllSearchedUsersFromStorage(){  // Storage'dan tüm kullanıcıları silme
                          
        localStorage.removeItem("searched");    // key'i silmemiz yeterlidir. tüm array silinir.
    }
}