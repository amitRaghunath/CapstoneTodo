package org.niit.todotracker.todoservice.repository;

import org.niit.todotracker.todoservice.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IUserRepository extends MongoRepository<User, String> {
}
