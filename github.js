class Github {

    constructor (){
        this.url = "https://api.github.com/users/";

    }

    async getGithubData(username){

        const responseUser = await fetch(this.url + username);
        const responseRepo = await fetch(this.url + username + "/repos");

        const dataUser = await responseUser.json();
        const dataRepo = await responseRepo.json();

        return {
            user: dataUser,
            repo: dataRepo
        }
    }

}