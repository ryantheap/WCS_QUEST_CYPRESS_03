describe("Note API", () => {
  let userData = require("../fixtures/userData");
  let notesData = require("../fixtures/notesData");
  let noteId;
  it("Create note", () => {
    cy.request({
      url: "https://practice.expandtesting.com/notes/api/notes",
      method: "POST",
      headers: {
        "x-auth-token": userData.userToken,
      },
      body: {
        title: notesData.title,
        description: notesData.description,
        category: notesData.category,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.property("id");
      noteId = res.body.data.id;
    });
  });

  it("get note", () => {
    cy.getNote(noteId, userData.userToken).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("Change value completed note", () => {
    cy.request({
      url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      method: "PATCH",
      headers: {
        "x-auth-token": userData.userToken,
      },
      body: {
        completed: true,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it("Delete note", () => {
    cy.request({
      url: `https://practice.expandtesting.com/notes/api/notes/${noteId}`,
      method: "DELETE",
      headers: {
        "x-auth-token": userData.userToken,
      },
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
