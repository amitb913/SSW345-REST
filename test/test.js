var chai   = require('chai');
var assert = chai.assert,
    expect = chai.expect;

process.env.NODE_ENV = 'test'
const github = require('../index');

// Turn off logging
console.log = function(){};

describe("GitHub EndPoint Tests", function() {

    this.timeout(5000);
    it("listAuthenicatedUserRepos returns repo objects", async function() {
        
        let repos = await github.listAuthenicatedUserRepos();
        expect(repos).to.be.an('array').that.have.nested.property('[1].owner.login');
    });

    it("listBranches returns list branches", async function() {
        
      let user  = await github.getUser();
      let repos = await github.listBranches(user, "parkaroo");
      expect(repos).to.be.an('array').that.have.nested.property("[2].name").equals("master");

    });

    it("createRepo successfully creates repo", async function() {
        
      let user  = await github.getUser();
      let status = await github.createRepo(user, "new_repo_test3");
      expect(status).to.equal(201 || 422);

    });


    it("createIssue successfully creates issue", async function() {
      
      let user  = await github.getUser();
      let status = await github.createIssue(user, "SSW345-hw1", "issue name", "issue body");
      expect(status).to.equal(201);

    });

    it("enableWikiSupport successfully enables wiki support", async function() {
      
      let user  = await github.getUser();
      let response = await github.enableWikiSupport(user, "new_repo_test2");

      expect(response).to.have.property('has_wiki');
      expect(response.has_wiki).to.equal(true);
    });
});


