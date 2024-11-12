import { faker } from "@faker-js/faker";
let bookList;
describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    bookList = {
        title: faker.company.catchPhraseAdjective(),
        author: faker.name.fullName(),
      };
  });
  
  it("Should add new book", () => {
    cy.addBook(bookList.title, bookList.author);
    cy.get(".card-title").should("contain.text", bookList.title);
  });
  
  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookList.title, bookList.author);
    cy.contains(bookList.title).should("be.visible");
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookList.title);
  });
  
  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBook(bookList.title, bookList.author);
    cy.contains(bookList.title).should("be.visible")
    .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookList.title).should("be.visible");
  });
  
  it("Should delete book from favorite", () => {
    cy.addFavoriteBook(bookList.title, bookList.author);
    cy.visit("/favorites");
    cy.contains(bookList.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookList.title).should("not.exist");
  });
});