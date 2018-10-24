## Notes

A programmer oriented note taking app for code snippets

- [ ] Project setup guide (automated?)
- [ ] Helm for container names
- [ ] CI/CD or test coverage thingy (Travis)
- [ ] Database
- [ ] Database seeds / factories / migrations ~> extract into library?
- [ ] Backend tests
- [ ] Frontend tests
- [ ] Authentication - Oauth via google or github or passport?
- [ ] Application logic: users, folders notes, search, CRUD

https://github.com/nestjs/nest/issues/409

factories = [UserFactory, NoteFactory]; // can be inferred from @Factory (?)

@Factory({model: User})
UserFactory = () => {
// inject faker, return the thing
}


const users = create(User, {userId: 10}, 5);

create(model, params, amount) {



}
